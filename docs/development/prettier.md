# Prettier

This project uses [Prettier](https://prettier.io/) for code formatting.

## Configuration

The Prettier configuration is located at `./config/prettier.config.ts`.

## Commands

The following npm scripts are available for prettier:

- `npm run format` - Format all files according to the Prettier configuration
- `npm run format:check` - Check if files are formatted according to the Prettier configuration

## IDE Integration

For the best development experience, it's recommended to install the Prettier extension for your IDE:

- VS Code: [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

You can configure your IDE to format code on save, which ensures your code is always properly formatted.

## Pre-commit Hook (Optional)

You may want to consider adding a pre-commit hook using tools like [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to automatically format files before committing.
