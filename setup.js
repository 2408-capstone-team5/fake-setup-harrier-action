const { execSync } = require('child_process');

try {
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
} catch (error) {
    console.error('Failed to install dependencies:', error);
    process.exit(1);
}
