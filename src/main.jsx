import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { InitSentry } from "./analystics/sentry.js";
import SentryErrorBoundary from "./components/common/SentryErrorBoundary.jsx";

// 1. Initialize monitoring BEFORE React
InitSentry();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SentryErrorBoundary>
      <App />
    </SentryErrorBoundary>
  </StrictMode>
);