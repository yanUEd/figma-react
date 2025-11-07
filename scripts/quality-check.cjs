#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    logError(`Failed to read JSON file ${filePath}: ${error.message}`);
    return null;
  }
}

function runCommand(command, description) {
  try {
    logInfo(`Running: ${description}`);
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    return { success: true, output: result };
  } catch (error) {
    logError(`Failed to run: ${description}`);
    return { success: false, error: error.message, output: error.stdout };
  }
}

function checkPackageJson() {
  logInfo('Checking package.json...');

  const packageJson = readJsonFile('package.json');
  if (!packageJson) return false;

  const requiredFields = ['name', 'version', 'description', 'main', 'types', 'exports'];
  const missingFields = requiredFields.filter(field => !packageJson[field]);

  if (missingFields.length > 0) {
    logError(`Missing required fields: ${missingFields.join(', ')}`);
    return false;
  }

  logSuccess('package.json is valid');
  return true;
}

function checkBuildOutput() {
  logInfo('Checking build output...');

  const distDir = 'dist';
  if (!checkFileExists(distDir)) {
    logError('dist directory not found');
    return false;
  }

  const requiredFiles = ['index.umd.js', 'index.d.ts'];
  const missingFiles = requiredFiles.filter(file => !checkFileExists(path.join(distDir, file)));

  if (missingFiles.length > 0) {
    logError(`Missing build files: ${missingFiles.join(', ')}`);
    return false;
  }

  // Check bundle size
  const umdFile = path.join(distDir, 'index.umd.js');
  const bundleSize = getFileSize(umdFile) / 1024; // KB

  if (bundleSize > 100) {
    logWarning(`Large bundle size: ${bundleSize.toFixed(2)} KB`);
  } else {
    logSuccess(`Bundle size is reasonable: ${bundleSize.toFixed(2)} KB`);
  }

  logSuccess('Build output is valid');
  return true;
}

function checkTestCoverage() {
  logInfo('Checking test coverage...');

  const result = runCommand('npm run test:coverage', 'Running tests with coverage');
  if (!result.success) {
    logError('Test coverage check failed');
    return false;
  }

  // Extract coverage from output
  const coverageMatch = result.output.match(/All files\s+\|\s+([\d.]+)/);
  if (!coverageMatch) {
    logWarning('Could not parse coverage percentage');
    return true; // Don't fail if we can't parse
  }

  const coverage = parseFloat(coverageMatch[1]);
  const threshold = 90;

  if (coverage >= threshold) {
    logSuccess(`Coverage is good: ${coverage}%`);
    return true;
  } else {
    logWarning(`Coverage is below threshold: ${coverage}% < ${threshold}%`);
    return false;
  }
}

function checkTypeScript() {
  logInfo('Checking TypeScript...');

  const result = runCommand('npm run type-check', 'TypeScript type checking');
  if (!result.success) {
    logError('TypeScript check failed');
    return false;
  }

  logSuccess('TypeScript check passed');
  return true;
}

function checkLinting() {
  logInfo('Checking code style...');

  const result = runCommand('npm run lint', 'ESLint check');
  if (!result.success) {
    logError('Linting failed');
    return false;
  }

  logSuccess('Linting passed');
  return true;
}

function checkGitStatus() {
  logInfo('Checking git status...');

  const result = runCommand('git status --porcelain', 'Git status check');
  if (!result.success) {
    logError('Git status check failed');
    return false;
  }

  const hasChanges = result.output.trim().length > 0;
  if (hasChanges) {
    logWarning('There are uncommitted changes');
    return false;
  }

  logSuccess('Git status is clean');
  return true;
}

function checkDependencies() {
  logInfo('Checking dependencies...');

  const packageJson = readJsonFile('package.json');
  if (!packageJson) return false;

  const hasDevDependencies = Object.keys(packageJson.devDependencies || {}).length > 0;
  const hasDependencies = Object.keys(packageJson.dependencies || {}).length > 0;

  if (!hasDependencies) {
    logWarning('No production dependencies found');
  }

  if (!hasDevDependencies) {
    logWarning('No development dependencies found');
  }

  logSuccess('Dependencies check passed');
  return true;
}

function main() {
  log('\n🔍 Quality Check Report', 'cyan');
  log('='.repeat(50), 'cyan');

  const checks = [
    { name: 'package.json', fn: checkPackageJson },
    { name: 'Dependencies', fn: checkDependencies },
    { name: 'Build Output', fn: checkBuildOutput },
    { name: 'TypeScript', fn: checkTypeScript },
    { name: 'Linting', fn: checkLinting },
    { name: 'Test Coverage', fn: checkTestCoverage },
    { name: 'Git Status', fn: checkGitStatus }
  ];

  let passed = 0;
  let failed = 0;

  for (const check of checks) {
    log(`\n📋 ${check.name}:`);
    const result = check.fn();
    if (result) {
      passed++;
    } else {
      failed++;
    }
  }

  log('\n' + '='.repeat(50), 'cyan');
  log(`📊 Results: ${passed} passed, ${failed} failed`, 'cyan');

  if (failed > 0) {
    log('\n❌ Quality check failed! Please fix the issues above.', 'red');
    process.exit(1);
  } else {
    log('\n🎉 All quality checks passed!', 'green');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}