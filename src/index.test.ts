import { describe, it, expect } from 'vitest'
import * as index from './index'
import * as event from './event'

describe('index exports', () => {
  it('should export all items from event module', () => {
    // Get all keys from the event module
    const eventKeys = Object.keys(event)
    
    // Get all keys from the index module
    const indexKeys = Object.keys(index)
    
    // Check that every key in event module is also in index
    eventKeys.forEach(key => {
      expect(indexKeys).toContain(key)
      expect(index[key as keyof typeof index]).toBe(event[key as keyof typeof event])
    })
    
    // Check that index doesn't export anything extra
    expect(indexKeys.length).toBe(eventKeys.length)
  })

  it('should export the CreateEvent function', () => {
    expect(index.CreateEvent).toBeDefined()
    expect(typeof index.CreateEvent).toBe('function')
  })
})
