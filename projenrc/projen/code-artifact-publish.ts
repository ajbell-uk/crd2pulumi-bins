/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: github varaible replacement */
import { type github, JsonPatch, type javascript } from 'projen'
import { CodeArtifactScopes, type CodeArtifactScopesOptions } from './code-artifact-scopes'

export interface GitHubAwsSecrets {
  readonly awsAccessKeyId: string
  readonly awsSecretAccessKey: string
}

export interface CodeArtifactPublishOptions extends CodeArtifactScopesOptions {
  /**
   * GitHub secrets for AWS credentials.
   *
   * @default - Uses default secrets for AWS credentials {
   *   AWS_ACCESS_KEY_ID: '${{ secrets.AWS_ACCESS_KEY_ID }}',
   *   AWS_SECRET_ACCESS_KEY: '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
   * }.
   */
  readonly githubSecrets?: GitHubAwsSecrets

  readonly releaseWorkflows?: Record<string, string[]>
}

export class CodeArtifactPublish extends CodeArtifactScopes {
  protected readonly githubAwsSecrets?: GitHubAwsSecrets
  constructor(
    project: javascript.NodeProject,
    private options: CodeArtifactPublishOptions,
  ) {
    super(project, options)

    this.githubAwsSecrets = options.githubSecrets || {
      awsAccessKeyId: '${{ secrets.AWS_ACCESS_KEY_ID }}',
      awsSecretAccessKey: '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
    }
  }

  postSynthesize(): void {
    super.postSynthesize()
    const defaultReleaseJobs = ['release', 'release_npm']

    const releaseWorkflows = this.options.releaseWorkflows || { release: defaultReleaseJobs }

    const project = this.project as javascript.NodeProject

    for (const [releaseName, jobs] of Object.entries(releaseWorkflows)) {
      const releaseWorkflow = project.github?.tryFindWorkflow(releaseName)
      if (!releaseWorkflow) {
        throw new Error(
          `Release workflow not found name: ${releaseName}. Please ensure you have a release workflow defined.`,
        )
      }

      const releaseFile = project.tryFindObjectFile(`.github/workflows/${releaseName}.yml`)
      for (const job of [...jobs, ...defaultReleaseJobs]) {
        this.updateGitHubJobsSteps(job, releaseWorkflow)
      }
      releaseFile?.synthesize()
    }

    if (this.githubAwsSecrets) {
      const buildWorkflow = project.tryFindObjectFile('.github/workflows/build.yml')
      buildWorkflow?.patch(
        JsonPatch.add('/jobs/build/env/AWS_SECRET_ACCESS_KEY', this.githubAwsSecrets.awsSecretAccessKey),
      )
      buildWorkflow?.patch(JsonPatch.add('/jobs/build/env/AWS_ACCESS_KEY_ID', this.githubAwsSecrets.awsAccessKeyId))
      buildWorkflow?.synthesize()
    }
  }

  protected updateGitHubJobsSteps(name: string, workflow: github.GithubWorkflow) {
    const releaseJob = workflow.getJob(name) as github.workflows.Job | undefined
    if (!releaseJob) {
      return
    }
    const newSteps = releaseJob.steps.map((step) => {
      switch (step.name) {
        case 'Install dependencies':
          return {
            ...(step as github.workflows.Step),
            env: {
              ...(this.githubAwsSecrets
                ? {
                    AWS_SECRET_ACCESS_KEY: this.githubAwsSecrets.awsSecretAccessKey,
                    AWS_ACCESS_KEY_ID: this.githubAwsSecrets.awsAccessKeyId,
                  }
                : {}),
            },
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
        AWS_SECRET_ACCESS_KEY: this.githubAwsSecrets?.awsSecretAccessKey || '',
        AWS_ACCESS_KEY_ID: this.githubAwsSecrets?.awsAccessKeyId || '',
      },
    }

    if (releaseJob) {
      workflow.updateJob(name, newJob)
    }
  }
}
