/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: github varaible replacement */
import { Component, JsonPatch, javascript, TestFailureBehavior } from 'projen'

export interface CodeArtifactRepositoryOptions {
  /**
   * The name of the CodeArtifact repository to publish to.
   */
  readonly repositoryName: string

  /**
   * The domain of the CodeArtifact repository.
   */
  readonly domain: string

  /**
   * The region of the CodeArtifact repository.
   */
  readonly region: string
  /**
   * The owner of the CodeArtifact domain.
   */
  readonly owner: string
}

export interface CodeArtifactRepositoryOptionalOptions {
  /**
   * The name of the CodeArtifact repository to publish to.
   */
  readonly repositoryName?: string

  /**
   * The domain of the CodeArtifact repository.
   */
  readonly domain?: string

  /**
   * The region of the CodeArtifact repository.
   */
  readonly region?: string
  /**
   * The owner of the CodeArtifact domain.
   */
  readonly owner?: string
}

export interface CodeArtifactScopesOptions extends CodeArtifactRepositoryOptions {
  /**
   * The version of the yarn plugin to use.
   *
   * @default '0.23.0'
   */
  readonly yarnCodeArtifactPluginVersion?: string

  readonly scopes?: Record<string, CodeArtifactRepositoryOptionalOptions>
}

export class CodeArtifactScopes extends Component {
  readonly resposityName: string
  readonly domain: string
  readonly region: string
  readonly owner: string

  protected readonly scopes?: Record<string, CodeArtifactRepositoryOptionalOptions>

  constructor(project: javascript.NodeProject, options: CodeArtifactScopesOptions) {
    super(project)
    this.resposityName = options.repositoryName
    this.domain = options.domain
    this.region = options.region
    this.owner = options.owner

    this.scopes = Object.fromEntries(
      Object.entries(options.scopes || {}).map(([scope, scopeOptions]) => {
        return [
          scope,
          {
            repositoryName: scopeOptions.repositoryName ?? options.repositoryName,
            domain: scopeOptions.domain ?? options.domain,
            region: scopeOptions.region ?? options.region,
            owner: scopeOptions.owner ?? options.owner,
          },
        ]
      }),
    )

    if (project.package.packageManager === javascript.NodePackageManager.YARN_BERRY) {
      project.tryFindObjectFile('.yarnrc.yml')?.addOverride('plugins', [
        {
          checksum:
            '6a0e73a228e285463bdd4527e01fc09fddf6485d3106a724b6a7b55c2ccfd606969e9d3156372afbd625eaa1d5a349d38649ceef37c68f74c294d8848a770d79',
          path: '.yarn/plugins/@yarnpkg/plugin-aws-codeartifact.cjs',
          spec: `https://raw.githubusercontent.com/mhassan1/yarn-plugin-aws-codeartifact/v${options.yarnCodeArtifactPluginVersion ?? '0.23.0'}/bundles/@yarnpkg/plugin-aws-codeartifact.js`,
        },
      ])

      if (this.scopes) {
        const yarnRc = project.tryFindObjectFile('.yarnrc.yml')
        yarnRc?.patch(
          JsonPatch.test('/npmRegistries', undefined, TestFailureBehavior.SKIP),
          JsonPatch.add('/npmRegistries', {}),
        )
        yarnRc?.patch(JsonPatch.test('/npmScopes', undefined, TestFailureBehavior.SKIP), JsonPatch.add('/npmScopes', {}))

        for (const [scope, scopeOptions] of Object.entries(this.scopes ?? {})) {
          const repositoryUri = `${scopeOptions.domain}-${scopeOptions.owner}.d.codeartifact.${scopeOptions.region}.amazonaws.com/npm/${scopeOptions.repositoryName}`
          yarnRc?.patch(
            JsonPatch.add(`/npmRegistries/${JsonPatch.escapePath(`//${repositoryUri}`)}`, {
              npmAuthToken: '${CODEARTIFACT_AUTH_TOKEN:-}',
              npmAlwaysAuth: true,
            }),
            JsonPatch.add(`/npmScopes/${scope}`, {
              npmRegistryServer: `https://${repositoryUri}`,
              npmAlwaysAuth: true,
              npmAuthToken: '${CODEARTIFACT_AUTH_TOKEN:-}',
            }),
          )
        }
      }
    }

  }
}
