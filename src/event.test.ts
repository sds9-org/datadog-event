import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CreateEvent } from './event'
import { client, v1 } from "@datadog/datadog-api-client"

describe('CreateEvent', () => {
  beforeEach(() => {
    vi.mock("@datadog/datadog-api-client", () => {
      return {
        client: {
          createConfiguration: vi.fn().mockReturnValue({})
        },
        v1: {
          EventsApi: vi.fn().mockImplementation(() => ({
            createEvent: vi.fn().mockResolvedValue({})
          }))
        }
      }
    })
  })

  it('should call createEvent with the correct parameters', async () => {
    const event = await CreateEvent('title', 'text')

    expect(event).toBeDefined()
    expect(client.createConfiguration).toHaveBeenCalled()
    expect(v1.EventsApi).toHaveBeenCalled()
  })
})

