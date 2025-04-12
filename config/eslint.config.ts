import { Linter } from 'eslint';
import path from 'path';

const config: Linter.FlatConfig[] = [
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: path.resolve(__dirname, '../tsconfig.json'),
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
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
      'max-len': ['warn', { code: 100, ignoreComments: true, ignoreStrings: true }],
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

export default config;