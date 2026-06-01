import posthog from "posthog-js";

let initialized = false;

export const InitPostHog = () => {
  if (typeof window === "undefined") return;
  if (initialized) return;

  const key = import.meta.env.VITE_POSTHOG_KEY;

  if (!key) {
    console.warn("PostHog key missing");
    return;
  }

  posthog.init(key, {
    api_host: "https://app.posthog.com",
    capture_pageview: true,
    autocapture: true,
    persistence: "localStorage",
    loaded: (ph) => {
      window.posthog = ph;
    },
  });

  initialized = true;
};

export default posthog;