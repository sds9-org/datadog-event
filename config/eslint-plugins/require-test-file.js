/**
 * @fileoverview ESLint rule to ensure every TypeScript file has a corresponding test file
 */

const fs = require('fs');
const path = require('path');

module.exports = {
  rules: {
    'require-test-file': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Ensure every TypeScript file has a corresponding test file',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: null,
      },
      create(context) {
        return {
          Program(node) {
            const filename = context.getFilename();

            // Skip test files themselves
            if (filename.endsWith('.test.ts')) {
              return;
            }

            // Skip non-source files
            if (!filename.startsWith(path.resolve('src')) || !filename.endsWith('.ts')) {
              return;
            }

            // Construct the expected test filename
            const dirname = path.dirname(filename);
            const basename = path.basename(filename, '.ts');
            const testFilePath = path.join(dirname, `${basename}.test.ts`);

            // Check if the test file exists
            if (!fs.existsSync(testFilePath)) {
              context.report({
                node,
                message: `Missing test file for ${basename}.ts. Expected: ${basename}.test.ts`,
              });
            }
          },
        };
      },
    },
  },
};
