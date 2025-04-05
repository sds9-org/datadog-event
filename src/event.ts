import { DatadogEventOptions, DatadogEventProperties } from './types';

/**
 * Class representing a Datadog event client
 * for sending events to Datadog's API
 */
export class DatadogEvent {
  private options: DatadogEventOptions;
  private baseUrl: string;

  /**
   * Create a new DatadogEvent client instance
   * @param options - Configuration options for the client
   */
  constructor(options: DatadogEventOptions) {
    this.options = options;
    this.baseUrl = options.apiUrl || 'https://api.datadoghq.com/api/v1';
  }

  /**
   * Send an event to Datadog
   * @param eventProps - Properties of the event to send
   * @returns Promise resolving to the API response
   */
  async send(eventProps: DatadogEventProperties): Promise<any> {
    const url = `${this.baseUrl}/events`;
    
    // Construct the request body
    const body = {
      title: eventProps.title,
      text: eventProps.text,
      priority: eventProps.priority,
      host: eventProps.host,
      tags: eventProps.tags,
      alert_type: eventProps.alertType,
      aggregation_key: eventProps.aggregationKey,
      source_type_name: eventProps.sourceTypeName,
      device_name: eventProps.deviceName,
    };

    // Clean up undefined values
    Object.keys(body).forEach((key) => {
      if (body[key as keyof typeof body] === undefined) {
        delete body[key as keyof typeof body];
      }
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'DD-API-KEY': this.options.apiKey,
          ...(this.options.appKey ? { 'DD-APPLICATION-KEY': this.options.appKey } : {}),
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Datadog API error: ${response.status} ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}