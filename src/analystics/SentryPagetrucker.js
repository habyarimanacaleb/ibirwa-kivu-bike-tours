import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as Sentry from "@sentry/react";

export function useSentryPageTracking() {
  const location = useLocation();

  useEffect(() => {
    Sentry.addBreadcrumb({
      category: "navigation",
      message: location.pathname,
      level: "info",
    });

    Sentry.setContext("route", {
      path: location.pathname,
      search: location.search,
    });
  }, [location.pathname]);
}