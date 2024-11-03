const core = require('@actions/core');
const { EC2Client } = require('@aws-sdk/client-ec2');
const { Octokit } = require('@octokit/rest');

console.log('Hello from the Harrier GitHub Action!');

const auth = core.getInput('personal-access-token');
const org = core.getInput('org');
const repo = core.getInput('repo');

console.log({ auth, org, repo });

const octokit = new Octokit({ auth });

async function getRegistrationToken() {
  const options = {
    org,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  };

  console.table({ options });
  try {
    const response = await octokit.request(
      'POST /orgs/{org}/actions/runners/registration-token',
      options
    );
    console.log('Runner registration token:', response.data.token);
  } catch (error) {
    console.error('Error fetching registration token:', error);
  }
}

async function createWebhook() {
  const options = {
    org,
    repo,
    name: 'web',
    active: true,
    events: ['workflow_job'],
    config: {
      url: 'https://enmur9s9m9c5m.x.pipedream.net/test-webhook', // request bin url for testing purposes
      content_type: 'json',
      insecure_ssl: '0',
    },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  };

  console.table({ options });

  try {
    const response = await octokit.request(
      'POST /repos/{org}/{repo}/hooks',
      options
    );
    console.log('Webhook created:', response.data);
  } catch (error) {
    console.error('Error creating webhook:', error);
  }
}

getRegistrationToken();
createWebhook();

console.log(EC2Client);

setTimeout(() => console.log('index.js file finished running...'), 5000);
