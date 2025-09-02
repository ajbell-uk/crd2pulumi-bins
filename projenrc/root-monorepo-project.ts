import { MonorepoTsProject, type MonorepoTsProjectOptions } from './monorepo'
import { JsonPatch, type github } from 'projen'

export interface RootMonorepoTsProjectOptions extends MonorepoTsProjectOptions {
  readonly releaseWorkflows?: Record<string, string[]>
  /**
   * GitHub secrets for AWS credentials.
   *
   * @default - Uses default secrets for AWS credentials {
   *   AWS_ACCESS_KEY_ID: '${{ secrets.AWS_ACCESS_KEY_ID }}',
   *   AWS_SECRET_ACCESS_KEY: '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
   * }.
   */
  readonly githubSecrets?: GitHubAwsSecrets
}

export interface GitHubAwsSecrets {
  readonly awsAccessKeyId: string
  readonly awsSecretAccessKey: string
}

export class RootMonorepoTsProject extends MonorepoTsProject {
  protected releaseWorkflows: Record<string, string[]> | undefined
  protected readonly githubAwsSecrets?: GitHubAwsSecrets

  constructor(options: RootMonorepoTsProjectOptions) {
    super(options)
    this.releaseWorkflows = options.releaseWorkflows

    this.githubAwsSecrets = options.githubSecrets || {
      awsAccessKeyId: '${{ secrets.AWS_ACCESS_KEY_ID }}',
      awsSecretAccessKey: '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
    }
  }

  postSynthesize (): void {
    super.postSynthesize()
    const defaultReleaseJobs = ['release', 'release_npm']

    const releaseWorkflows = this.releaseWorkflows || { release: defaultReleaseJobs }

    for (const [releaseName, jobs] of Object.entries(releaseWorkflows)) {
      const releaseWorkflow = this.github?.tryFindWorkflow(releaseName)
      if (!releaseWorkflow) {
        throw new Error(
          `Release workflow not found name: ${releaseName}. Please ensure you have a release workflow defined.`,
        )
      }

      const releaseFile = this.tryFindObjectFile(`.github/workflows/${releaseName}.yml`)
      for (const job of [...jobs, ...defaultReleaseJobs]) {
        this.updateGitHubJobsSteps(job, releaseWorkflow)
      }
      releaseFile?.synthesize()
    }

    if (this.githubAwsSecrets) {
      const buildWorkflow = this.tryFindObjectFile('.github/workflows/build.yml')
      buildWorkflow?.patch(
        JsonPatch.add('/jobs/build/env/AWS_SECRET_ACCESS_KEY', this.githubAwsSecrets.awsSecretAccessKey),
      )
      buildWorkflow?.patch(JsonPatch.add('/jobs/build/env/AWS_ACCESS_KEY_ID', this.githubAwsSecrets.awsAccessKeyId))
      buildWorkflow?.synthesize()
    }

  }



  protected updateGitHubJobsSteps (name: string, workflow?: github.GithubWorkflow) {
    const releaseJob = workflow?.getJob(name) as github.workflows.Job | undefined
    if (!releaseJob) {
      return
    }
    const newSteps = releaseJob.steps.map((step) => {
      const subProjectDirectory = `packages/${workflow?.name.replace('release_', '')}`
      switch (step.name) {
        case 'Checkout': {
          let sparseCheckout: string | undefined
          if (name.endsWith('_npm')) {
            sparseCheckout = `packages/${workflow?.name.replace('release_', '')}`
          }

          return {
            ...(step as github.workflows.Step),
            with: {
              ...(step as github.workflows.Step).with,
              lfs: true,
              ...sparseCheckout ? { 'sparse-checkout': sparseCheckout } : {},
            },
          }
        }
        case 'Create js artifact': {
          return {
            ...(step as github.workflows.Step),
            ...{
              run: `cd .repo/${subProjectDirectory} && npx projen package:js && mv -f dist ../..`
            }
          }
        }
        case 'Extract build artifact': {
          return {
            ...(step as github.workflows.Step),
            ...{
              run: `tar --strip-components=1 -xzvf dist/js/*.tgz -C .repo/${subProjectDirectory}`
            }
          }
        }
        default:
          return step
      }
    })

    const newJob: github.workflows.Job = {
      ...releaseJob,
      steps: newSteps,
      env: {
        ...releaseJob.env,
        ... this.githubAwsSecrets ? {
          AWS_SECRET_ACCESS_KEY: this.githubAwsSecrets?.awsSecretAccessKey || '',
          AWS_ACCESS_KEY_ID: this.githubAwsSecrets?.awsAccessKeyId || '',
        } : {}
      },
    }

    if (releaseJob) {
      workflow?.updateJob(name, newJob)
    }

    workflow?.synthesize()
  }

}
