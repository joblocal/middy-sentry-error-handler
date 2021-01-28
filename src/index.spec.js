const Sentry = require('@sentry/node');
const sentryErrorHandler = require('./');

jest.mock('@sentry/node');
console.log = jest.fn();

beforeEach(() => {
  Sentry.init = jest.fn();
  Sentry.captureException = jest.fn();
  Sentry.configureScope = jest.fn();
});

const dsn = 'dsn';
const environment = 'production';

test('to capture exception on sentry', () => {
  const error = new Error();
  const event = {
    body: 'test',
  };
  const handler = {
    error,
    event,
  };
  const next = jest.fn();

  sentryErrorHandler({
    dsn,
    environment,
  }).onError(handler, next);

  expect(Sentry.init).toHaveBeenCalledWith({
    dsn,
    environment,
  });
  expect(Sentry.configureScope).toHaveBeenCalled();
  expect(Sentry.captureException).toHaveBeenCalledWith(error);
  expect(next).toHaveBeenCalled();
});

test('to not capture http errors', () => {
  const handler = {
    error: {
      statusCode: 401,
    },
  };
  const next = jest.fn();

  sentryErrorHandler({
    dsn,
    environment,
  }).onError(handler, next);

  expect(Sentry.init).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalled();
});
