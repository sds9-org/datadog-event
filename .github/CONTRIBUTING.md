# Contributing to Datadog Event

Thank you for considering contributing to the Datadog Event project! This document provides guidelines and instructions to help you contribute effectively.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct, which promotes a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Issues

- Before submitting an issue, please check if a similar issue already exists
- Use the issue template to provide all necessary information
- Include clear steps to reproduce the issue
- Specify the version of the project you're using

### Pull Requests

1. Fork the repository
2. Create a new branch from `main` with a descriptive name

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes
4. Ensure code passes linting (see ESLint documentation in `docs/development/eslint.md`)

   ```bash
   npm run lint
   ```

5. Run tests to ensure they pass

   ```bash
   npm test
   ```

6. Commit your changes with a clear commit message

   ```bash
   git commit -m "feat: add your feature description"
   ```

7. Push to your branch

   ```bash
   git push origin feature/your-feature-name
   ```

8. Open a pull request against the `main` branch

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding or modifying tests
- `chore:` for maintenance tasks

### Development Setup

1. Clone the repository

   ```bash
   git clone https://github.com/sds9-org/datadog-event.git
   cd datadog-event
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Make your changes

4. Test your changes

   ```bash
   npm test
   ```

## Style Guides

### Code Style

We use ESLint to enforce code style. See our [ESLint documentation](../docs/development/eslint.md) for more details.

### TypeScript

- Use TypeScript's strict mode
- Prefer interfaces over types when appropriate
- Document public APIs with JSDoc comments
- Write unit tests for your code

### Testing

- Write unit tests for new features
- Ensure existing tests pass with your changes
- Aim for high test coverage

## Questions?

If you have any questions about contributing, feel free to open an issue for clarification.

Thank you for your contributions!
