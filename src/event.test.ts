import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateEvent } from './event';
import { client, v1 } from '@datadog/datadog-api-client';

describe('CreateEvent', () => {
  beforeEach(() => {
    vi.mock('@datadog/datadog-api-client', () => ({
      client: {
        createConfiguration: vi.fn().mockReturnValue({}),
      },
      v1: {
        EventsApi: vi.fn().mockImplementation(() => ({
          createEvent: vi.fn().mockResolvedValue({}),
        })),
      },
    }));
  });

  it('should call createEvent with the correct parameters', async () => {
    process.env.DATADOG_API_KEY = 'test-api-key';
    process.env.DATADOG_APP_KEY = 'test-app-key';
    const event = await CreateEvent({
      requests: [
        {
          text: 'Test event',
          title: 'Test title',
          tags: ['tag1', 'tag2'],
        },
      ],
    });

    expect(event).toBeDefined();
    expect(client.createConfiguration).toHaveBeenCalled();
    expect(v1.EventsApi).toHaveBeenCalled();
  });
});
