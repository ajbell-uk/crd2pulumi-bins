import { MonorepoTsProject, type MonorepoTsProjectOptions } from './monorepo'
import type { github } from 'projen'

export interface RootMonorepoTsProjectOptions extends MonorepoTsProjectOptions {
  readonly releaseWorkflows?: Record<string, string[]>
}

export class RootMonorepoTsProject extends MonorepoTsProject {
  protected releaseWorkflows: Record<string, string[]> | undefined
  constructor(options: RootMonorepoTsProjectOptions) {
    super(options)
    this.releaseWorkflows = options.releaseWorkflows
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
          if(name.endsWith('_npm')){
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
    }

    if (releaseJob) {
      workflow?.updateJob(name, newJob)
    }

    workflow?.synthesize()
  }

}
