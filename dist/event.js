"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEvent = void 0;
const datadog_api_client_1 = require("@datadog/datadog-api-client");
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
const CreateEvent = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // https://docs.datadoghq.com/api/latest/#post-an-event
    // https://datadoghq.dev/datadog-api-client-typescript/classes/v1.EventsApi.html#createEvent
    const apiKey = process.env.DATADOG_API_KEY;
    const appKey = process.env.DATADOG_APP_KEY;
    if (!apiKey)
        throw new Error('DATADOG_API_KEY is not set');
    if (!appKey)
        throw new Error('DATADOG_APP_KEY is not set');
    const configuration = datadog_api_client_1.client.createConfiguration({
        authMethods: {
            apiKeyAuth: apiKey,
            appKeyAuth: appKey,
        },
    });
    const apiInstance = new datadog_api_client_1.v1.EventsApi(configuration);
    const { requests, aggregationKey } = params;
    const results = yield Promise.all(requests.map((request) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
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
        const response = yield apiInstance.createEvent({ body: eventRequest });
        const eventUrl = (_a = response === null || response === void 0 ? void 0 : response.event) === null || _a === void 0 ? void 0 : _a.url;
        return {
            request,
            response,
            eventUrl,
        };
    })));
    return results;
});
exports.CreateEvent = CreateEvent;
