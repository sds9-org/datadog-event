# gh-datadog-event

A lightweight TypeScript library for sending events to Datadog's Events API. Can be used both as an npm package in your code and as a GitHub Action in your workflows.

[![npm version](https://img.shields.io/npm/v/gh-datadog-event.svg?cache=bust)](https://www.npmjs.com/package/gh-datadog-event)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](docs/development/eslint.md)
[![Prettier](https://img.shields.io/badge/Prettier-ff0faf?logo=prettier&logoColor=white)](docs/development/prettier.md)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)](docs/development/vitest.md)
[![TypeDoc](https://img.shields.io/badge/TypeDoc-9600ff?logo=typescript&logoColor=white)](docs/development/typedoc.md)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?logo=github&logoColor=white)](https://sds9-org.github.io/datadog-event/)
[![GitHub Marketplace](https://img.shields.io/badge/GitHub%20Marketplace-blue?logo=github)](https://github.com/marketplace/actions/gh-datadog-event)
[![CI](https://github.com/sds9-org/datadog-event/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/sds9-org/datadog-event/actions/workflows/ci.yml)

## Overview

`gh-datadog-event` makes it easy to send custom events to your Datadog dashboard from any Node.js application or GitHub workflow. Use it to track deployments, mark significant application events, or create custom alerts.

## Usage as an npm package

### Installation

```bash
npm install gh-datadog-event
```

### Example Usage

```typescript
import { CreateEvent } from 'gh-datadog-event';

// Set your Datadog API and APP keys as environment variables
// process.env.DATADOG_API_KEY = 'your-api-key';
// process.env.DATADOG_APP_KEY = 'your-app-key';

async function sendDeploymentEvent() {
  const results = await CreateEvent({
    requests: [
      {
        title: 'Deployment Completed',
        text: 'Service successfully deployed to production',
        alertType: 'info',
        priority: 'normal',
        tags: ['environment:production', 'service:api', 'team:backend']
      }
    ]
  });

  console.log(`Event created: ${results[0].eventUrl}`);
}

sendDeploymentEvent();
```

## Usage as a GitHub Action

You can also use this package as a GitHub Action in your workflows to send events to Datadog.

### Example Workflow

```yaml
name: Deploy and Notify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      # Your deployment steps here...
      
      - name: Notify Datadog of deployment
        uses: sds9-org/datadog-event@v2
        with:
          title: 'Deployment to Production'
          text: 'New version deployed to production environment'
          alertType: 'info'
          priority: 'normal'
          tags: 'environment:production,service:api'
          includeGitHubContext: 'true'
        env:
          DATADOG_API_KEY: ${{ secrets.DATADOG_API_KEY }}
          DATADOG_APP_KEY: ${{ secrets.DATADOG_APP_KEY }}
```

### Action Inputs

| Input | Description | Required | Default |
| ----- | ----------- | -------- | ------- |
| `title` | Title of the event | Yes | |
| `text` | Text description of the event | Yes | |
| `alertType` | Type of alert (e.g., "error", "warning", "info") | No | `info` |
| `priority` | Priority of the event (e.g., "normal", "low") | No | `normal` |
| `host` | Host associated with the event | No | |
| `tags` | Comma-separated list of tags | No | |
| `aggregationKey` | Key to group events together | No | |
| `sourceTypeName` | Source type name for the event | No | |
| `includeGitHubContext` | Whether to include GitHub context in tags | No | `true` |

### Action Outputs

| Output | Description |
| ------ | ----------- |
| `eventUrl` | URL of the created event in Datadog |
| `eventId` | ID of the created event |

## API Reference

### `CreateEvent`

Main function for creating events in Datadog.

#### Parameters

See the [API documentation](https://sds9-org.github.io/datadog-event/) for detailed information about the function parameters and return types.

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

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Write your code and tests
4. Submit a pull request with a detailed description of your changes
