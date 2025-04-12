import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: [
          './tsconfig.json',
          './tsconfig.test.json',
        ],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
    },
    rules: {
      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-duplicate-imports': 'error',
      
      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      
      // Keeping code clean
      'max-len': ['warn', { code: 200, ignoreComments: true, ignoreStrings: true }],
      'arrow-body-style': ['warn', 'as-needed'],
    },
    ignores: ['dist', 'node_modules', '**/*.js'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        node: true,
        jest: true,
      },
    },
  }
];