# TypeDoc in Our Project

## What is TypeDoc?

[TypeDoc](https://typedoc.org/) is a documentation generator for TypeScript projects that converts comments in TypeScript source code into rendered HTML documentation. It helps create comprehensive API documentation directly from your code.

## Our TypeDoc Configuration

Our TypeDoc configuration can be found at:

- [config/typedoc/typedoc.config.ts](/config/typedoc/typedoc.config.ts) (TypeScript configuration file)

## Why We Use TypeDoc

TypeDoc provides several key benefits for our project:

- **Auto-generated Documentation**: Automatically creates documentation from TypeScript source code and comments
- **Type Information**: Includes detailed type information from TypeScript interfaces, classes, and functions
- **JSDoc Integration**: Works with JSDoc comments for comprehensive documentation
- **Navigable Structure**: Creates a well-structured, searchable documentation site
- **API Reference**: Provides a clear reference for all public APIs in the project
- **GitHub Pages Integration**: Easily publishable to GitHub Pages for team access

## Current Configuration Details

Our TypeDoc setup includes:

- Main entry point at `src/index.ts`
- Output directed to the `docs/api` directory
- Project named "Datadog Event API Documentation"
- Exclusion of private and protected members
- Integration with project README
- GitHub Pages compatibility
- Version information included in documentation

## Useful TypeDoc Resources

- [TypeDoc Documentation](https://typedoc.org/guides/overview/)
- [JSDoc Comment Format](https://typedoc.org/guides/doccomments/)
- [TypeDoc Options](https://typedoc.org/options/)
- [Themes and Plugins](https://typedoc.org/guides/installation/#plugins)

## Using TypeDoc in this Project

To generate documentation with TypeDoc:

```bash
npm run docs
```

To view the generated documentation, open the `/docs/api/index.html` file in your browser.

TypeDoc is integrated into our development workflow through:

1. Documentation generation during build process
2. CI/CD pipeline integration to ensure documentation stays current
3. Hosting on GitHub Pages for easy team access to latest API documentation

By writing comprehensive JSDoc comments in your code, you help create valuable, up-to-date documentation that makes the codebase more accessible to all developers working on the project.