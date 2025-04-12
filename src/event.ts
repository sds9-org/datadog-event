import { client, v1 } from "@datadog/datadog-api-client"

/**
 * Optional parameters for creating an event
 * @property aggregationKey - An arbitrary string to use for aggregation. Limited to 100 characters.
 * If you specify a key, all events using that key are grouped together in the Event Stream.
 * @property alertType - If an alert event is enabled, set its type.
 * For example, `error`, `warning`, `info`, `success`, `user_update`,
 * `recommendation`, and `snapshot`.
 * @property dateHappened - POSIX timestamp of the event. Must be sent as an integer (that is no quotes).
 * Limited to events no older than 18 hours
 * @property deviceName - A device name.
 * @property host - Host name to associate with the event.
 * Any tags associated with the host are also applied to this event.
 * @property priority - The priority of the event. For example, `normal` or `low`.
 * @property relatedEventId - ID of the parent event. Must be sent as an integer (that is no quotes).
 * @property sourceTypeName - The type of event being posted. Option examples include nagios, hudson, jenkins, my_apps, chef, puppet, git, bitbucket, etc.
 * A complete list of source attribute values [available here](https://docs.datadoghq.com/integrations/faq/list-of-api-source-attribute-value).
 * @property tags - A list of tags to apply to the event.
 * @example
 * const optionalParams = {
 *   aggregationKey: 'my-key',
 *   alertType: 'error',
 *   dateHappened: Date.now(),
 *   deviceName: 'my-device',
 *   host: 'my-host',
 *   priority: 'normal',
 *   relatedEventId: 12345,
 *   sourceTypeName: 'my-source',
 *   tags: ['tag1', 'tag2']
 * }
 */
export interface OptionalParameterProps {
  aggregationKey?: string
  alertType?: v1.EventAlertType
  dateHappened?: number
  deviceName?: string
  host?: string
  priority?: v1.EventPriority
  relatedEventId?: number
  sourceTypeName?: string
  tags?: Array<string>
}

/**
 * Create an event in Datadog
 * @param title - The title of the event
 * @param text - The text of the event
 * @param optionalParams - Optional parameters for the event
 * @returns The created event
 * @throws ApiException if the request fails
 * @example
 * const event = await CreateEvent('title', 'text', {
 *   aggregationKey: 'my-key',
 *   alertType: 'error',
 *   dateHappened: Date.now()
 * })
 * console.log(event)
 */
export const CreateEvent = async (title: string, text: string, optionalParams?: OptionalParameterProps) => {
  const configuration = client.createConfiguration()
  const apiInstance = new v1.EventsApi(configuration)
  const params: v1.EventsApiCreateEventRequest = {
    body: {
      title: title,
      text: text,
    }
  }
  const event = await apiInstance.createEvent(params)
  return event
}

export default CreateEvent
