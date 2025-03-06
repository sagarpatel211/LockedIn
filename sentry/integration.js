import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'your_dsn_here',
  integrations: [new Integrations.Breadcrumbs({ console: false })],
});

export function captureError(error) {
  Sentry.captureException(error);
}
