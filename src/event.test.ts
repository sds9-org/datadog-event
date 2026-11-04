import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CreateEvent } from './event.js';
import { client, v1 } from '@datadog/datadog-api-client';

const createEvent = vi.hoisted(() => vi.fn());
vi.mock('@datadog/datadog-api-client', () => ({
  client: { createConfiguration: vi.fn().mockReturnValue({}) },
  v1: {
    EventsApi: vi.fn(function () {
      return { createEvent };
    }),
  },
}));

describe('CreateEvent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('DATADOG_API_KEY', 'test-api-key');
    vi.stubEnv('DATADOG_APP_KEY', 'test-app-key');
    createEvent.mockReset().mockResolvedValue({ event: { url: 'https://example.test/event/1' } });
  });
  afterEach(() => vi.unstubAllEnvs());

  it('maps request fields, credentials and response without mutating the request', async () => {
    const request = {
      text: 'Test event',
      title: 'Test title',
      tags: ['tag1'],
      alertType: 'warning',
      priority: 'low',
      dateHappened: 123,
      deviceName: 'device',
      host: 'host',
      relatedEventId: '42',
      sourceTypeName: 'source',
      additionalProperties: '{"custom":"value"}',
    };
    const original = structuredClone(request);
    const result = await CreateEvent({ requests: [request], aggregationKey: 'group' });
    expect(client.createConfiguration).toHaveBeenCalledWith({
      authMethods: { apiKeyAuth: 'test-api-key', appKeyAuth: 'test-app-key' },
    });
    expect(v1.EventsApi).toHaveBeenCalledOnce();
    expect(createEvent).toHaveBeenCalledWith({
      body: {
        ...request,
        text: '&&& Test event\n&&&',
        aggregationKey: 'group',
        relatedEventId: 42,
        additionalProperties: { custom: 'value' },
      },
    });
    expect(result).toEqual([
      {
        request,
        response: { event: { url: 'https://example.test/event/1' } },
        eventUrl: 'https://example.test/event/1',
      },
    ]);
    expect(request).toEqual(original);
  });

  it.each(['DATADOG_API_KEY', 'DATADOG_APP_KEY'])(
    'rejects missing %s before creating a client',
    async key => {
      vi.stubEnv(key, '');
      await expect(CreateEvent({ requests: [] })).rejects.toThrow(`${key} is not set`);
      expect(client.createConfiguration).not.toHaveBeenCalled();
      expect(createEvent).not.toHaveBeenCalled();
    },
  );

  it('keeps results in request order and tolerates absent event URLs', async () => {
    const requests = [
      { title: 'first', text: 'one' },
      { title: 'second', text: 'two' },
    ];
    createEvent.mockResolvedValueOnce({}).mockResolvedValueOnce({ event: {} });
    expect(await CreateEvent({ requests })).toEqual([
      { request: requests[0], response: {}, eventUrl: undefined },
      { request: requests[1], response: { event: {} }, eventUrl: undefined },
    ]);
    expect(createEvent).toHaveBeenCalledTimes(2);
    expect(createEvent.mock.calls[0][0].body).toMatchObject({
      alertType: undefined,
      priority: undefined,
      relatedEventId: undefined,
      additionalProperties: undefined,
    });
  });

  it('does not send an event when additional properties are invalid JSON', async () => {
    await expect(
      CreateEvent({ requests: [{ title: 'bad', text: 'bad', additionalProperties: '{' }] }),
    ).rejects.toThrow(SyntaxError);
    expect(createEvent).not.toHaveBeenCalled();
  });

  it('propagates API failures and accepts an empty batch', async () => {
    expect(await CreateEvent({ requests: [] })).toEqual([]);
    const error = new Error('rate limited');
    createEvent.mockRejectedValueOnce(error);
    await expect(CreateEvent({ requests: [{ title: 'retry', text: 'later' }] })).rejects.toBe(
      error,
    );
  });
});
