import { client, v1 } from '@datadog/datadog-api-client'

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

export interface CreateEventParams {
  requests: RequestEventParams[]
  aggregationKey?: string
}

export interface CreateEventResult {
  request: RequestEventParams
  response: v1.EventResponse
  eventUrl: string | undefined
}

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