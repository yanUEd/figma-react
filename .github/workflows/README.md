# GitHub Actions CI/CD Workflows

This directory contains GitHub Actions workflows for automated testing, building, and deployment.

## Workflows

### 1. CI/CD Pipeline (`ci.yml`)

**Trigger**: Push to `main`/`develop`, Pull Requests, Releases

**Jobs**:
- **Code Quality**: ESLint and Prettier checks
- **TypeScript Check**: Type safety verification
- **Unit & Integration Tests**: Jest with coverage reporting
- **E2E Tests**: Playwright cross-browser testing
- **Build Test**: Verify build process
- **Performance Tests**: Bundle size analysis
- **Publish**: NPM package publishing (releases only)
- **Deploy Docs**: GitHub Pages deployment (optional)
- **Notify**: Status notifications

### 2. Dependency Updates (`dependency-updates.yml`)

**Trigger**: Daily schedule, Manual dispatch

**Jobs**:
- **Update Dependencies**: Automated dependency updates with PR creation
- **Security Audit**: Security vulnerability scanning

### 3. Release (`release.yml`)

**Trigger**: Git tags starting with `v*`

**Jobs**:
- **Create Release**: GitHub release with changelog and artifacts
- **Version Management**: Automatic version updates

## Required Secrets

### For NPM Publishing
- `NPM_TOKEN`: NPM automation token with publish permissions

### For Optional Features
- `DOCS_ENABLED`: Set to 'true' to enable documentation deployment
- `CODECOV_TOKEN`: For enhanced coverage reporting (optional)

## Environment Variables

The workflows use these environment variables:
- `NODE_VERSION: '18'`: Node.js version for all jobs
- `npm_config_cache: ~/.npm`: NPM cache location

## Coverage Requirements

- **Minimum Coverage**: 90% for statements, branches, functions, lines
- **Bundle Size Warning**: 100KB for UMD build
- **Test Framework**: Jest + Testing Library + Playwright

## Browser Support

E2E tests run on:
- Chromium (Desktop)
- Firefox (Desktop)
- WebKit (Desktop Safari)
- Chrome (Mobile)
- Safari (Mobile)

## Quality Gates

The pipeline includes these quality checks:
1. ✅ Code passes linting and formatting
2. ✅ TypeScript compilation succeeds
3. ✅ All tests pass with 90%+ coverage
4. ✅ E2E tests pass on all browsers
5. ✅ Bundle size is reasonable
6. ✅ No security vulnerabilities
7. ✅ Build process works correctly

## Manual Triggers

You can manually trigger workflows:
- **Dependency Updates**: Go to Actions → Dependency Updates → "Run workflow"
- **Quality Check**: Run `npm run quality-check` locally
- **Full CI**: Run `npm run ci:all` locally

## Troubleshooting

### Common Issues

1. **Test Failures**: Check test output logs and update failing tests
2. **Build Failures**: Verify TypeScript configuration and dependencies
3. **E2E Failures**: Check browser compatibility and test server
4. **Coverage Drops**: Add tests for uncovered code paths

### Debug Commands

```bash
# Run quality checks locally
npm run quality-check

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Check code formatting
npm run format:check

# TypeScript check
npm run type-check
```

### Viewing Results

- **Test Results**: GitHub Actions tab → Workflow runs
- **Coverage Reports**: Uploaded as artifacts and optionally to Codecov
- **E2E Reports**: Playwright HTML report in artifacts
- **Build Artifacts**: Downloadable dist/ files

## Release Process

1. Update version in `package.json`
2. Create git tag: `git tag v1.0.0`
3. Push tag: `git push origin v1.0.0`
4. GitHub Actions will:
   - Run all tests
   - Create GitHub release
   - Publish to NPM
   - Update package.json version