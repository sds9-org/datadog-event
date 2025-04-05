# gh-datadog-event

A lightweight TypeScript library for sending events to Datadog's Events API.

[![npm version](https://img.shields.io/npm/v/gh-datadog-event.svg?cache=bust)](https://www.npmjs.com/package/gh-datadog-event)

## Overview

`gh-datadog-event` makes it easy to send custom events to your Datadog dashboard from any Node.js application. Use it to track deployments, mark significant application events, or create custom alerts.

## Features

- 🚀 Simple, promise-based API
- 💪 Full TypeScript support with comprehensive type definitions
- 🔄 Support for all Datadog event properties
- 🌍 Configurable for US, EU and other Datadog sites
- ⚡ Lightweight with zero dependencies

## Installation

```bash
npm install gh-datadog-event
```

## Quick Start

```typescript
import { DatadogEvent, DatadogAlertType } from 'gh-datadog-event';

// Initialize the client with your API key
const client = new DatadogEvent({
  apiKey: 'your_datadog_api_key',
  // Optional: appKey: 'your_datadog_app_key',
  // Optional: apiUrl: 'https://api.datadoghq.eu/api/v1' // For EU region
});

// Send a simple event
async function sendEvent() {
  try {
    const response = await client.send({
      title: 'Test Event',
      text: 'This is a test event from the datadog-event library',
      alertType: DatadogAlertType.INFO,
      tags: ['env:test', 'service:my-service']
    });
    
    console.log('Event sent successfully', response);
  } catch (error) {
    console.error('Failed to send event:', error);
  }
}

sendEvent();
```

## Usage Examples

### Basic Event

```typescript
await client.send({
  title: 'Application Started',
  text: 'The application has started successfully'
});
```

### Error Event with Tags

```typescript
await client.send({
  title: 'Database Connection Failed',
  text: 'Unable to connect to the primary database',
  alertType: DatadogAlertType.ERROR,
  tags: ['service:database', 'env:production']
});
```

### Deployment Event with Host Information

```typescript
await client.send({
  title: 'New Version Deployed',
  text: `Version v2.1.0 has been deployed to production`,
  alertType: DatadogAlertType.SUCCESS,
  host: 'web-server-01',
  tags: ['service:web-api', 'team:backend', 'version:2.1.0']
});
```

### Aggregating Related Events

```typescript
// First event
await client.send({
  title: 'Batch Processing Started',
  text: 'Starting batch processing of 10,000 records',
  aggregationKey: 'batch-process-123'
});

// Later, send a related event with the same aggregation key
await client.send({
  title: 'Batch Processing Completed',
  text: 'Successfully processed 10,000 records',
  alertType: DatadogAlertType.SUCCESS,
  aggregationKey: 'batch-process-123'
});
```

### Low Priority Event

```typescript
await client.send({
  title: 'Cache Refresh',
  text: 'Periodic cache refresh completed',
  priority: DatadogPriority.LOW
});
```

## API Reference

### `DatadogEvent`

Main class for interacting with the Datadog Events API.

#### Constructor

```typescript
new DatadogEvent(options: DatadogEventOptions)
```

#### Options

- `apiKey`: (required) Your Datadog API key
- `appKey`: (optional) Your Datadog Application key
- `apiUrl`: (optional) Custom API URL if not using the default US region

#### Methods

##### `send(eventProps: DatadogEventProperties): Promise<any>`

Sends an event to Datadog and returns a promise that resolves to the API response.

#### Event Properties

- `title`: (required) The event title
- `text`: (required) The event text/body
- `priority`: (optional) Event priority (`DatadogPriority.NORMAL` or `DatadogPriority.LOW`)
- `host`: (optional) Host name to associate with the event
- `tags`: (optional) Array of tags to associate with the event
- `alertType`: (optional) Alert type (`DatadogAlertType.INFO`, `WARNING`, `ERROR`, or `SUCCESS`)
- `aggregationKey`: (optional) Key to aggregate related events
- `sourceTypeName`: (optional) Source type name
- `deviceName`: (optional) Device name

### Enums

#### `DatadogAlertType`

```typescript
enum DatadogAlertType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success'
}
```

#### `DatadogPriority`

```typescript
enum DatadogPriority {
  NORMAL = 'normal',
  LOW = 'low'
}
```

## Getting Your Datadog API Keys

To use this library, you need a Datadog API key:

1. Log in to your [Datadog account](https://app.datadoghq.com/)
2. Navigate to **Organization Settings** > **API Keys**
3. Create a new API key or use an existing one

For additional functionality, you may also want an Application key:

1. Navigate to **Organization Settings** > **Application Keys**
2. Create a new Application key

## Datadog Event Documentation

For more information about Datadog events, see the [official Datadog Events documentation](https://docs.datadoghq.com/events/).
