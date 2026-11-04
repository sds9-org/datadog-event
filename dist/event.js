import { client, v1 } from '@datadog/datadog-api-client';
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
export const CreateEvent = async (params) => {
    // https://docs.datadoghq.com/api/latest/#post-an-event
    // https://datadoghq.dev/datadog-api-client-typescript/classes/v1.EventsApi.html#createEvent
    const apiKey = process.env.DATADOG_API_KEY;
    const appKey = process.env.DATADOG_APP_KEY;
    if (!apiKey)
        throw new Error('DATADOG_API_KEY is not set');
    if (!appKey)
        throw new Error('DATADOG_APP_KEY is not set');
    const configuration = client.createConfiguration({
        authMethods: {
            apiKeyAuth: apiKey,
            appKeyAuth: appKey,
        },
    });
    const apiInstance = new v1.EventsApi(configuration);
    const { requests, aggregationKey } = params;
    const results = await Promise.all(requests.map(async (request) => {
        const parsedAlertType = request.alertType
            ? request.alertType
            : undefined;
        const parsedPriority = request.priority
            ? request.priority
            : undefined;
        const parsedAdditionalProperties = request.additionalProperties ? JSON.parse(request.additionalProperties) : undefined;
        const eventRequest = {
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
        };
        const response = await apiInstance.createEvent({ body: eventRequest });
        const eventUrl = response?.event?.url;
        return {
            request,
            response,
            eventUrl,
        };
    }));
    return results;
};
