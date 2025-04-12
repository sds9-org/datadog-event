import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'config/**',
        '**/*.d.ts',
        '**/*.test.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src')
    }
  }
})