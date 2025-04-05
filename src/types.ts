/**
 * Types for datadog-event package
 */

/**
 * Datadog event priority levels
 */
export enum DatadogPriority {
  NORMAL = 'normal',
  LOW = 'low'
}

/**
 * Datadog event alert types
 */
export enum DatadogAlertType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success'
}

/**
 * Datadog event configuration options
 */
export interface DatadogEventOptions {
  /** API key for authentication with Datadog */
  apiKey: string;
  /** Application key for authentication with Datadog */
  appKey?: string;
  /** Base URL for Datadog API (defaults to US site) */
  apiUrl?: string;
}

/**
 * Datadog event properties
 */
export interface DatadogEventProperties {
  /** Event title (required) */
  title: string;
  /** Event text content (required) */
  text: string;
  /** Priority level of the event */
  priority?: DatadogPriority;
  /** Host name to associate with the event */
  host?: string;
  /** Tags to associate with the event */
  tags?: string[];
  /** Alert type classification */
  alertType?: DatadogAlertType;
  /** Aggregation key for grouping events */
  aggregationKey?: string;
  /** Source type name */
  sourceTypeName?: string;
  /** Device name */
  deviceName?: string;
}