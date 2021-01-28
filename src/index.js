const Sentry = require('@sentry/node');

module.exports = (sentryOptions) => ({
  onError(handler, next) {
    if (!handler.error.statusCode || handler.error.statusCode >= 500) {
      Sentry.init(sentryOptions);

      Sentry.configureScope((scope) => {
        scope.setExtra('event', handler.event);
      });

      Sentry.captureException(handler.error);

      console.log(handler.error);

      handler.error.statusCode = 500;
      handler.error.message = 'Internal server error.';
    }

    return next();
  },
});
