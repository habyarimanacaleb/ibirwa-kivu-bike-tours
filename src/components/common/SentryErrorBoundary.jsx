import React from "react";
import * as Sentry from "@sentry/react";

function Fallback({ error, resetError }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Something went wrong</h2>

      <p style={{ color: "red" }}>
        {error?.message}
      </p>

      <button onClick={resetError}>
        Try again
      </button>
    </div>
  );
}

const SentryErrorBoundary = Sentry.withErrorBoundary(
  ({ children }) => children,
  {
    fallback: ({ error, resetError }) => (
      <Fallback error={error} resetError={resetError} />
    ),

    beforeCapture: (scope, error, info) => {
      scope.setTag("error_boundary", "global");
      scope.setContext("react_error_info", info);
    },
  }
);

export default SentryErrorBoundary;