const Sentry = require('@sentry/node');

module.exports = (sentryOptions) => ({
  onError(handler, next) {
    if (!handler.error.statusCode || handler.error.statusCode >= 500) {
      Sentry.init(sentryOptions);

      Sentry.configureScope((scope) => {
        scope.setExtra('event', handler.event);
      });

      Sentry.captureException(handler.error);

      console.error(handler.error);
    }

    return next();
  },
});
