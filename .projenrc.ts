import { cdk, javascript } from 'projen'

import { RootMonorepoTsProject } from './projenrc/root-monorepo-project'

const defaultReleaseBranch = 'main'
const repository = 'https://github.com/ajbell-uk/crd2pulumi-bins.git'

const crd2pulumiVersion = '1.5.4'

const awsEnv = {
  AWS_ACCESS_KEY_ID: '${{ secrets.AWS_ACCESS_KEY_ID }}',
  AWS_SECRET_ACCESS_KEY: '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
}

const buildWorkflowOptions: javascript.BuildWorkflowOptions = {
  workflowTriggers: {
    pullRequest: {},
    push: {
      branches: ['main'],
    },
  },
  env: {
    ...awsEnv,
  }
}

const biomeOptions: javascript.BiomeOptions = {
  biomeConfig: {
    files: {
      includes: ['.projenrc.ts', '**/src/**/*.ts'],
      ignoreUnknown: true,
    },
    vcs: {
      enabled: true,
      clientKind: javascript.biome_config.VcsClientKind.GIT,
      useIgnoreFile: true,
      defaultBranch: 'main',
    },
    // assist: { actions: { source: { organizeImports: 'on' } } },
    formatter: {
      enabled: true,
      lineWidth: 120,
      indentStyle: javascript.biome_config.IndentStyle.SPACE,
      indentWidth: 2,
    },
    javascript: {
      formatter: {
        quoteStyle: javascript.biome_config.QuoteStyle.SINGLE,
        semicolons: javascript.biome_config.Semicolons.AS_NEEDED,
      },
    },
    linter: {
      enabled: true,
      rules: {
        recommended: true,
        correctness: {
          noUnusedImports: 'error',
          noUnusedVariables: 'error',
          useExhaustiveDependencies: 'warn',
        },
        complexity: {
          noForEach: 'off',
          noStaticOnlyClass: 'off',
        },
        suspicious: {
          noExplicitAny: 'off',
        },
        style: {
          noParameterAssign: 'error',
          useAsConstAssertion: 'error',
          useDefaultParameterLast: 'error',
          useEnumInitializers: 'error',
          useSelfClosingElements: 'error',
          useSingleVarDeclarator: 'error',
          noUnusedTemplateLiteral: 'error',
          useNumberNamespace: 'error',
          noInferrableTypes: 'error',
          noUselessElse: 'error',
        },
      },
    },
  },
}

const projects = [
  {
    name: 'crd2pulumi-darwin-amd64',
    outdir: './packages/crd2pulumi-darwin-amd64',
    binUrl: `https://github.com/pulumi/crd2pulumi/releases/download/v${crd2pulumiVersion}/crd2pulumi-v${crd2pulumiVersion}-darwin-amd64.tar.gz`,
  },
  {
    name: 'crd2pulumi-linux-amd64',
    outdir: './packages/crd2pulumi-linux-amd64',
    binUrl: `https://github.com/pulumi/crd2pulumi/releases/download/v${crd2pulumiVersion}/crd2pulumi-v${crd2pulumiVersion}-linux-amd64.tar.gz`,
  },
  {
    name: 'crd2pulumi-windows-amd64',
    outdir: './packages/crd2pulumi-windows-amd64',
    binUrl: `https://github.com/pulumi/crd2pulumi/releases/download/v${crd2pulumiVersion}/crd2pulumi-v${crd2pulumiVersion}-windows-amd64.zip`,
    cmd: `wget -c "https://github.com/pulumi/crd2pulumi/releases/download/v${crd2pulumiVersion}/crd2pulumi-v${crd2pulumiVersion}-windows-amd64.zip" -O bin/crd2pulumi.zip && unzip -o bin/crd2pulumi.zip -d bin && rm bin/crd2pulumi.zip && mv bin/crd2pulumi.exe bin/crd2pulumi-windows-amd64.exe`,
  },
  {
    name: 'crd2pulumi-darwin-arm64',
    outdir: './packages/crd2pulumi-darwin-arm64',
    binUrl: `https://github.com/pulumi/crd2pulumi/releases/download/v${crd2pulumiVersion}/crd2pulumi-v${crd2pulumiVersion}-darwin-arm64.tar.gz`,
  },
  {
    name: 'crd2pulumi-linux-arm64',
    outdir: './packages/crd2pulumi-linux-arm64',
    binUrl: `https://github.com/pulumi/crd2pulumi/releases/download/v${crd2pulumiVersion}/crd2pulumi-v${crd2pulumiVersion}-linux-arm64.tar.gz`,
  },
]

const releaseWorkflows: Record<string, string[]> = {}
for (const project of projects) {
  releaseWorkflows[`release_${project.name}`] = ['release', 'release_npm']
}

const root = new RootMonorepoTsProject({
  defaultReleaseBranch,
  name: 'crd2pulumi-workspace',
  projenrcTs: true,
  eslint: false,
  jest: false,
  depsUpgrade: false,
  depsUpgradeOptions: { workflow: false },
  projenVersion: '~0.95.0',
  typescriptVersion: '~5.8.0',
  authorOrganization: true,
  authorName: 'AJ Bell',
  buildWorkflow: false,
  readme: { filename: 'README.md', contents: '# title' },
  release: false,
  package: false,
  repository,
  packageManager: javascript.NodePackageManager.PNPM,
  biome: true,
  prettier: false,
  sampleCode: false,
  github: true,
  githubOptions: {
    downloadLfs: true,
  },
  buildWorkflowOptions,
  biomeOptions,
  devDeps: ['@aws/pdk'],
  releaseWorkflows,
})

root.addTask('update-bin', {
  exec: 'yarn exec nx run-many --target=update-bin',
})

for (const project of projects) {
  const childProject = new cdk.JsiiProject({
    parent: root,
    name: project.name,
    packageName: `@ajbell/${project.name}`,
    outdir: project.outdir,
    defaultReleaseBranch,
    licensed: false,
    package: true,
    release: true,
    repositoryUrl: repository,
    authorOrganization: true,
    author: 'AJ Bell',
    authorAddress: '',
    depsUpgrade: false,
    packageManager: root.package.packageManager,
    npmRegistryUrl: 'https://main-873505026467.d.codeartifact.eu-west-2.amazonaws.com/npm/ajb-iac/',
    npmAccess: javascript.NpmAccess.PUBLIC,
    gitOptions: {
      lfsPatterns: ['bin/*'],
    },
    releaseTagPrefix: `${project.name}-`,
    releaseToNpm: true,
    githubOptions: {
      downloadLfs: true,
    },
    buildWorkflowOptions,
    sampleCode: false,
    typescriptVersion: '~5.8.0',
    jsiiVersion: '~5.8.0',
    eslint: false,
    yarnBerryOptions: {
      version: '4.9.2',
      yarnRcOptions: {
        nodeLinker: javascript.YarnNodeLinker.NODE_MODULES,
      },
    },
    codeArtifactOptions: {
      authProvider: javascript.CodeArtifactAuthProvider.GITHUB_OIDC,
      roleToAssume: 'arn:aws:iam::873505026467:role/Tooling-GitHubOidc-ActionsRole8CA2B68A-2UmaN8BWeDTz',
    },
  })

  childProject.addTask('update-bin', {
    description: 'Download external binaries',
    steps: [
      {
        exec: 'mkdir -p bin',
      },
      {
        exec:
          project.cmd || `wget -c "${project.binUrl}" -O -  | tar -xz -C bin && mv bin/crd2pulumi bin/${project.name}`,
      },
    ],
  })
  childProject.package.addField('targets', {
    'update-bin': {
      command: 'npx project update-bin',
    },
  })
  childProject.synth()
}

root.synth()

// for (const [workflow, jobs] of Object.entries(releaseWorkflows)) {
//   for (const job of jobs) {
//     const workflowFile = root.tryFindObjectFile(`.github/workflows/release_${workflow}.yml`)
//     updateGitHubJobsSteps(job, root.github?.tryFindWorkflow(workflow))
//     workflowFile?.synthesize()
//   }
// }

// function updateGitHubJobsSteps(name: string, workflow?: github.GithubWorkflow) {
//   const releaseJob = workflow?.getJob(name) as github.workflows.Job | undefined
//   if (!releaseJob) {
//     return
//   }
//   const newSteps = releaseJob.steps.map((step) => {
//     switch (step.name) {
//       case 'Checkout':
//         return {
//           ...(step as github.workflows.Step),
//           with: {
//             ...(step as github.workflows.Step).with,
//             lfs: true,
//           },
//         }
//       default:
//         return step
//     }
//   })

//   const newJob: github.workflows.Job = {
//     ...releaseJob,
//     steps: newSteps,
//   }

//   if (releaseJob) {
//     workflow?.updateJob(name, newJob)
//   }

//   workflow?.synthesize()
// }
