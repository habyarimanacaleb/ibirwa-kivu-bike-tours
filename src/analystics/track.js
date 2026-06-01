export const track = {
  event: (name, props = {}) => {
    posthog.capture(name, props);
  },

  page: (path) => {
    posthog.capture("page_view", { path });
  },

  click: (name, props = {}) => {
    posthog.capture("click", { name, ...props });
  },
};