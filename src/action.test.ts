import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as core from '@actions/core';
import * as github from '@actions/github';
import { CreateEvent } from './event';

// Mock dependencies
vi.mock('@actions/core');
vi.mock('@actions/github', () => ({
  context: {
    repo: {
      owner: 'test-owner',
      repo: 'test-repo',
    },
    workflow: 'test-workflow',
    ref: 'refs/heads/main',
    sha: '0123456789abcdef',
  },
}));
vi.mock('./event');

// Import the function after mocking dependencies
const actionModule = await import('./action');

describe('GitHub Action', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Setup default mock returns for core inputs
    vi.mocked(core.getInput).mockImplementation((name) => {
      switch (name) {
        case 'title': return 'Test Event Title';
        case 'text': return 'Test Event Text';
        case 'alertType': return 'info';
        case 'priority': return 'normal';
        case 'host': return 'test-host';
        case 'tags': return 'tag1,tag2';
        case 'aggregationKey': return 'test-key';
        case 'sourceTypeName': return 'test-source';
        default: return '';
      }
    });
    
    vi.mocked(core.getBooleanInput).mockReturnValue(true);
    
    // Mock CreateEvent to return a successful result
    vi.mocked(CreateEvent).mockResolvedValue([{
      request: {
        title: 'Test Event Title',
        text: 'Test Event Text',
      },
      response: {
        event: {
          id: 12345,
          url: 'https://app.datadoghq.com/event/12345',
        }
      },
      eventUrl: 'https://app.datadoghq.com/event/12345'
    }]);
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });
  
  it('should call CreateEvent with correct parameters', async () => {
    // Import resets the module, so we need to call run() explicitly
    await actionModule.run();
    
    expect(CreateEvent).toHaveBeenCalledWith({
      requests: [{
        title: 'Test Event Title',
        text: 'Test Event Text',
        alertType: 'info',
        priority: 'normal',
        host: 'test-host',
        tags: [
          'tag1', 
          'tag2', 
          'repo:test-repo',
          'owner:test-owner',
          'workflow:test-workflow',
          'ref:refs/heads/main',
          'sha:0123456789abcdef'
        ],
        sourceTypeName: 'test-source'
      }],
      aggregationKey: 'test-key'
    });
  });
  
  it('should set outputs correctly when event is created', async () => {
    await actionModule.run();
    
    expect(core.setOutput).toHaveBeenCalledWith('eventUrl', 'https://app.datadoghq.com/event/12345');
    expect(core.setOutput).toHaveBeenCalledWith('eventId', '12345');
  });
  
  it('should handle errors and fail the action', async () => {
    // Mock CreateEvent to throw an error
    vi.mocked(CreateEvent).mockRejectedValue(new Error('API Error'));
    
    await actionModule.run();
    
    expect(core.setFailed).toHaveBeenCalledWith('API Error');
  });
});