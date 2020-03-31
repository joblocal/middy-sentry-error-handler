# Middy Sentry Error Middleware

This is a [middy](https://middy.js.org/) middleware, which is reporting errors to [Sentry](https://sentry.io/). Http errors are not reported.

## Installation

```sh
npm install @joblocal/middy-sentry-error-handler
```

## Usage

```js
# handler.js
const middy = require('middy');
const sentryErrorHandler = require('@joblocal/middy-sentry-error-handler');

const yourHandler = () => {
  throw new Error('this will be reported to sentry');
};

const handler = middy(yourHandler)
  .use(sentryErrorHandler({
    dsn: 'https://62f4e2311cea4c5da1e3e681b9014926@sentry.io/283203',
  }));

module.exports = { handler };
```

The options you are passing correspond the the [Sentry init options](https://docs.sentry.io/error-reporting/configuration/?platform=node).
