import { client, v1 } from '@datadog/datadog-api-client'

/**
 * @typedef {Object} RequestEventParams
 * @property {string} [aggregationKey] - Optional aggregation key to group events together
 * @property {string} [alertType] - Type of alert (e.g., "error", "warning", "info")
 * @property {number} [dateHappened] - Timestamp of the event
 * @property {string} [deviceName] - Name of the device associated with the event
 * @property {string} [host] - Host associated with the event
 * @property {string} [priority] - Priority of the event (e.g., "normal", "low")
 * @property {string} [relatedEventId] - ID of a related event
 * @property {string} [sourceTypeName] - Source type name for the event
 * @property {string[]} [tags] - Tags associated with the event
 * @property {string} text - Text description of the event
 * @property {string} title - Title of the event
 * @property {string} [additionalProperties] - Additional properties for the event in JSON format
 */
export interface RequestEventParams {
  aggregationKey?: string
  alertType?: string
  dateHappened?: number
  deviceName?: string
  host?: string
  priority?: string
  relatedEventId?: string
  sourceTypeName?: string
  tags?: string[]
  text: string
  title: string
  additionalProperties?: string
}

/**
 * @typedef {Object} CreateEventParams
 * @property {RequestEventParams[]} requests - Array of event requests to send to Datadog
 * @property {string} [aggregationKey] - Optional aggregation key to group events together
 */
export interface CreateEventParams {
  requests: RequestEventParams[]
  aggregationKey?: string
}

/**
 * @typedef {Object} CreateEventResult
 * @property {RequestEventParams} request - The original request parameters for the event
 * @property {v1.EventResponse} response - The response from the Datadog API
 * @property {string} [eventUrl] - URL of the created event in Datadog
 */
export interface CreateEventResult {
  request: RequestEventParams
  response: v1.EventResponse
  eventUrl: string | undefined
}
/**
 * Creates one or more events in Datadog using the Events API.
 * 
 * This function sends the provided event requests to the Datadog API and returns
 * the results. It requires the DATADOG_API_KEY and DATADOG_APP_KEY environment
 * variables to be set.
 * 
 * @param params - Parameters for creating events
 * @param params.requests - Array of event requests to send to Datadog
 * @param params.aggregationKey - Optional aggregation key to group events together
 * 
 * @returns Promise resolving to an array of results, one for each event request
 * 
 * @throws Error if DATADOG_API_KEY or DATADOG_APP_KEY environment variables are not set
 * 
 * @example
 * ```typescript
 * // Create multiple events
 * const results = await CreateEvent({
 *   requests: [
 *     {
 *       title: "Deployment started",
 *       text: "Starting deployment of service XYZ to production",
 *       tags: ["environment:production", "service:xyz"],
 *       alertType: "info",
 *       priority: "normal"
 *     },
 *     {
 *       title: "High CPU Usage Alert",
 *       text: "CPU usage exceeded 90% for 5 minutes",
 *       tags: ["environment:production", "resource:cpu"],
 *       alertType: "warning",
 *       priority: "normal"
 *     }
 *   ],
 *   aggregationKey: "deployment-123"
 * })
 * 
 * // Access event URLs from the results
 * results.forEach(result => {
 *   console.log(`Event created: ${result.eventUrl}`)
 * })
 * ```
 */
export const CreateEvent = async (params: CreateEventParams): Promise<CreateEventResult[]> => {
  // https://docs.datadoghq.com/api/latest/#post-an-event
  // https://datadoghq.dev/datadog-api-client-typescript/classes/v1.EventsApi.html#createEvent
  const apiKey: string | undefined = process.env.DATADOG_API_KEY
  const appKey: string | undefined = process.env.DATADOG_APP_KEY
  if (!apiKey) throw new Error('DATADOG_API_KEY is not set')
  if (!appKey) throw new Error('DATADOG_APP_KEY is not set')
  
  const configuration: client.Configuration = client.createConfiguration({
    authMethods: {
      apiKeyAuth: apiKey,
      appKeyAuth: appKey,
    },
  })
  const apiInstance: v1.EventsApi = new v1.EventsApi(configuration)
  
  const { requests, aggregationKey } = params
  const results: CreateEventResult[] = await Promise.all(requests.map(async (request) => {
    const parsedAlertType: v1.EventAlertType | undefined = request.alertType ? request.alertType as v1.EventAlertType : undefined
    const parsedPriority: v1.EventPriority | undefined = request.priority ? request.priority as v1.EventPriority : undefined
    const parsedAdditionalProperties: { [key: string]: string } | undefined = request.additionalProperties ? JSON.parse(request.additionalProperties) : undefined

      const eventRequest: v1.EventCreateRequest = {
        aggregationKey: aggregationKey,
        alertType: parsedAlertType,
        dateHappened: request.dateHappened,
        deviceName: request.deviceName,
        host: request.host,
        priority: parsedPriority,
        relatedEventId: request.relatedEventId ? parseInt(request.relatedEventId) : undefined,
        sourceTypeName: request.sourceTypeName,
        tags: request.tags,
        text: `&&& ${request.text}\n&&&`,
        title: request.title,
        additionalProperties: parsedAdditionalProperties,
      }
      const response = await apiInstance.createEvent({body: eventRequest})
      const eventUrl = response?.event?.url
      return {
        request,
        response,
        eventUrl,
      }
    }
  ))
  return results
}