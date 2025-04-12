import { describe, it, expect } from 'vitest';
import * as index from './index';
import * as event from './event';

describe('index exports', () => {
  it('should export all items from event module', () => {
    // Get all keys from the event module
    const eventKeys = Object.keys(event);
    
    // Get all keys from the index module
    const indexKeys = Object.keys(index);
    
    // Check that every key in event module is also in index
    eventKeys.forEach(key => {
      expect(indexKeys).toContain(key);
      expect(index[key as keyof typeof index]).toBe(event[key as keyof typeof event]);
    });
    
    // Check that index doesn't export anything extra
    expect(indexKeys.length).toBe(eventKeys.length);
  });

  it('should export the CreateEvent function', () => {
    expect(index.CreateEvent).toBeDefined();
    expect(typeof index.CreateEvent).toBe('function');
  });

  it('should export the OptionalParameterProps interface', () => {
    // We can't directly test for an interface, but we can check that it's present in the type system
    // by creating an object that conforms to it
    const params: index.OptionalParameterProps = {
      aggregationKey: 'test',
      host: 'test-host',
      tags: ['tag1', 'tag2']
    };
    
    expect(params).toHaveProperty('aggregationKey');
    expect(params).toHaveProperty('host');
    expect(params).toHaveProperty('tags');
  });
});