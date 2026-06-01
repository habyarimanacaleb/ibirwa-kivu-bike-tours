import * as Sentry from "@sentry/react";

export function InitSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    console.warn("Sentry DSN missing");
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,

    sendDefaultPii: true,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],

    tracesSampleRate: import.meta.env.MODE === "production" ? 0.2 : 1.0,

    replaysSessionSampleRate:
      import.meta.env.MODE === "production" ? 0.05 : 1.0,

    replaysOnErrorSampleRate: 1.0,

    tracePropagationTargets: [
      "localhost",
      /^https:\/\/localhost:5173/,
      /^https:\/\/ibirwakivubiketours\.com/,
      /^https:\/\/ibirwa-kivu-bike-tours\.netlify\.app/,
    ],

    enableLogs: true,
  });
}

export default Sentry;