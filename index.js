const core = require('@actions/core');
const github = require('@actions/github');
const context = github.context;

// most @actions toolkit packages have async methods
async function run() {
  try {
    
    const githubToken = core.getInput('github-token');
    const octokit = github.getOctokit(myToken);
    
    const columns = core.getInput('columns');
    
    const createProject = await github.projects.createForRepo({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: core.getInput('name'),
    });

    columns.forEach((column) => {
      github.projects.createColumn({
        project_id: createProject.data.id,
        name: column,
      });
    });

    core.setOutput('project_id', 'TODO');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
