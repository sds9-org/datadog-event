import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Test File Coverage', () => {
  it('should have a corresponding test file for every source file', () => {
    const sourceDir = path.resolve(__dirname)
    let missingTestFiles: string[] = []

    // Helper function to recursively find all TypeScript files
    const findTsFiles = (dir: string): string[] => {
      let results: string[] = []
      const list = fs.readdirSync(dir)
      
      list.forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory()) {
          // Recursively search directories
          results = results.concat(findTsFiles(filePath))
        } else if (filePath.endsWith('.ts') && !filePath.endsWith('.test.ts') && !filePath.includes('test-coverage.test.ts')) {
          // Only include .ts files that aren't test files
          results.push(filePath)
        }
      })
      
      return results
    }

    // Find all TypeScript source files
    const tsFiles = findTsFiles(sourceDir)
    
    // Check if each source file has a corresponding test file
    tsFiles.forEach(file => {
      const dirname = path.dirname(file)
      const basename = path.basename(file, '.ts')
      const testFilePath = path.join(dirname, `${basename}.test.ts`)
      
      if (!fs.existsSync(testFilePath)) {
        missingTestFiles.push(path.relative(sourceDir, file))
      }
    })
    
    // Expect no missing test files
    if (missingTestFiles.length > 0) {
      throw new Error(`Missing test files for: ${missingTestFiles.join(', ')}`)
    }
    
    expect(missingTestFiles.length).toBe(0)
  })
})