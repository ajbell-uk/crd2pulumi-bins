import { Component, JsonFile, type typescript } from 'projen'

/**
 * Custom projen component that configures nx.
 */
export class Nx extends Component {
  constructor(rootProject: typescript.TypeScriptProject) {
    super(rootProject)

    // Add nx library dependencies
    rootProject.addDevDeps('nx@^15', '@nrwl/devkit@^15', '@nrwl/workspace@^15')

    // Add nx.json file
    new JsonFile(rootProject, 'nx.json', {
      obj: {
        extends: 'nx/presets/npm.json',
        targetDefaults: {
          'update-bin': {
            dependsOn: ['^update-bin'],
          },
          build: {
            dependsOn: ['^build'],
          },
          release: {
            dependsOn: ['^update-bin'],
          },
        },
        defaultBase: 'main',
        release: {
          projects: ['packages/*'],
          version: {
            conventionalCommits: true,
          },
          changelog: {
            projectChangelogs: {
              createRelease: 'github',
            },
          },
        },
      },
    })
  }
}
