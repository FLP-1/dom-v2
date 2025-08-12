const fs = require('fs');
const path = require('path');

const resultsPath = path.resolve(__dirname, '..', 'jest-results.json');

if (!fs.existsSync(resultsPath)) {
  console.log('jest-results.json não encontrado. Rode: npx jest --ci --runInBand --json --outputFile=jest-results.json');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
const all = Array.isArray(data.testResults) ? data.testResults : [];
const failed = all.filter(t => t.status !== 'passed');

console.log('FAILED_SUITES=' + failed.length);
failed.forEach(t => {
  console.log('— ' + t.name);
  if (t.message && typeof t.message === 'string') {
    const lines = t.message.split('\n').slice(0, 6).join('\n');
    console.log(lines);
  }
});


