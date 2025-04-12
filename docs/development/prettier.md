# Prettier in Our Project

## What is Prettier?

[Prettier](https://prettier.io/) is an opinionated code formatter that enforces a consistent style by parsing your code and reprinting it with its own rules. It works with JavaScript, TypeScript, CSS, HTML, JSON, and many other file formats.

## Our Prettier Configuration

Our Prettier configuration can be found at:

- [config/prettier.config.ts](/config/prettier.config.ts)

## Why We Use Prettier

Prettier provides several key benefits for our project:

- **Consistency**: Ensures uniform code formatting across the entire codebase, regardless of who wrote it
- **Zero Debates**: Eliminates discussions about code style since Prettier's opinionated approach makes the decisions for us
- **Focus on Content**: Lets developers focus on writing code logic rather than spending time formatting their code
- **Integration with ESLint**: Works seamlessly alongside our ESLint configuration for comprehensive code quality
- **Improved Pull Requests**: Reduces noise in pull requests by standardizing formatting in all code changes
- **Developer Experience**: Saves time with automatic formatting, reducing manual reformatting effort

## Useful Prettier Resources

- [Prettier Documentation](https://prettier.io/docs/en/)
- [Prettier Playground](https://prettier.io/playground/)
- [Prettier Options Reference](https://prettier.io/docs/en/options.html)
- [Integrating Prettier with ESLint](https://prettier.io/docs/en/integrating-with-linters.html)

## Using Prettier in this Project

To format your code with Prettier in this project:

```bash
npm run format
```

To check if your code is formatted according to our Prettier configuration:

```bash
npm run format:check
```

Prettier is integrated into our development workflow through:

1. IDE integration for real-time formatting while you type or on save
2. Pre-commit hooks (optional) to ensure all committed code is properly formatted
3. CI/CD pipeline validation to verify proper formatting

For the best development experience, install the Prettier extension for your IDE:

- VS Code: [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

By using Prettier consistently, you help maintain a clean, readable codebase that's easier to review, understand, and maintain for all contributors.
