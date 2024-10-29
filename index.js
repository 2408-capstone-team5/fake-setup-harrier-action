const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");
console.log("Hello from my first GitHub Action!");

const MY_SECRET = core.getInput('my-secret');
const YOUR_SECRET = core.getInput('your-secret');
const RUNNER_OS = core.getInput('runner-os');
const JOEL_PAT = core.getInput('joel-pat');
const ORG = core.getInput('org')

// Initialize Octokit with your PAT
const octokit = new Octokit({
  auth: JOEL_PAT,
});

async function getRegistrationToken() {
  try {
    const response = await octokit.request("POST /orgs/{org}/actions/runners/registration-token", {
      org: ORG,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    console.log("Runner registration token:", response.data.token);
  } catch (error) {
    console.error("Error fetching registration token:", error);
  }
}

getRegistrationToken();

console.log({MY_SECRET, YOUR_SECRET, RUNNER_OS});
setTimeout(() => console.log('index.js file finished running...'), 5000);
