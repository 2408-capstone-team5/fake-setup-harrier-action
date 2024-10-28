const core = require('@actions/core');
console.log("Hello from my first GitHub Action!");

const MY_SECRET = core.getInput('my-secret');
const YOUR_SECRET = core.getInput('your-secret');
const RUNNER_OS = core.getInput('runner-os');

console.log({MY_SECRET, YOUR_SECRET, RUNNER_OS});
setTimeout(() => console.log('index.js file finished running...'), 5000);
