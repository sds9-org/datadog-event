# gh-datadog-event

A lightweight TypeScript library for sending events to Datadog's Events API.

[![npm version](https://img.shields.io/npm/v/gh-datadog-event.svg?cache=bust)](https://www.npmjs.com/package/gh-datadog-event)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](docs/development/eslint.md)
[![Prettier](https://img.shields.io/badge/Prettier-ff0faf?logo=prettier&logoColor=white)](docs/development/prettier.md)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)](docs/development/vitest.md)
[![TypeDoc](https://img.shields.io/badge/TypeDoc-9600ff?logo=typescript&logoColor=white)](docs/development/typedoc.md)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?logo=github&logoColor=white)](https://sds9-org.github.io/datadog-event/)
[![CI](https://github.com/sds9-org/datadog-event/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/sds9-org/datadog-event/actions/workflows/ci.yml)

## Overview

`gh-datadog-event` makes it easy to send custom events to your Datadog dashboard from any Node.js application. Use it to track deployments, mark significant application events, or create custom alerts.

## Installation

```bash
npm install gh-datadog-event
```

## API Reference

### `DatadogEvent`

Main class for interacting with the Datadog Events API.

#### Options

- `apiKey`: (required) Your Datadog API key
- `appKey`: (optional) Your Datadog Application key
- `apiUrl`: (optional) Custom API URL if not using the default US region

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
