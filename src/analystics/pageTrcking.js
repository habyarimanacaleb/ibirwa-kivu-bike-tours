import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import posthog from "posthog-js";

const getPageType = (pathname) => {
  if (pathname.startsWith("/blogs")) return "blog";
  if (pathname.startsWith("/services")) return "pricing";
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/join")) return "join";
  return "other";
};

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (!location?.pathname) return;

    const pathname = location.pathname;

    const pageType = getPageType(pathname);

    posthog.capture("page_view", {
      path: pathname,
      search: location.search,
      hash: location.hash,
      page_type: pageType,
    });
  }, [location.pathname, location.search, location.hash]);
}
