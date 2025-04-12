# Vitest in Our Project

## What is Vitest?

[Vitest](https://vitest.dev/) is a next-generation testing framework designed for Vite. It provides a fast, modern, and feature-rich testing environment for JavaScript and TypeScript projects.

## Our Vitest Configuration

Our Vitest configuration can be found at:

- [config/vitest.config.ts](/config/vitest.config.ts) (Main configuration file)

## Why We Use Vitest

Vitest provides several key benefits for our project:

- **Speed**: Extremely fast test execution powered by Vite and esbuild
- **Developer Experience**: Watch mode, smart test file detection, and instant feedback
- **TypeScript Support**: First-class TypeScript support with no additional setup
- **Code Coverage**: Integrated code coverage reporting via v8
- **Compatibility**: API design similar to Jest for easy migration and familiar usage
- **Modern Features**: ESM support, React testing capabilities, and snapshot testing

## Current Configuration Details

Our Vitest setup includes:

- Node.js test environment
- Tests located in `src/**/*.test.ts` files
- Code coverage reporting (text, HTML, JSON, and LCOV formats)
- Path aliasing for cleaner imports using `@` to reference the src directory

## Useful Vitest Resources

- [Vitest Documentation](https://vitest.dev/guide/)
- [API Reference](https://vitest.dev/api/)
- [Configuration Options](https://vitest.dev/config/)
- [Comparison with Jest](https://vitest.dev/guide/comparisons.html)

## Using Vitest in this Project

To run tests in this project:

```bash
npm test
```

For watch mode during development:

```bash
npm run test:watch
```

To generate a code coverage report:

```bash
npm run test:coverage
```

Vitest is integrated into our development workflow through:

1. Pre-merge test validation
2. CI/CD pipeline testing
3. Local development with watch mode for fast feedback

By writing comprehensive tests with Vitest, you help ensure code quality, prevent regressions, and document expected behavior for other developers working on the project.
