import * as Sentry from "@sentry/react";

export default function SentryTestButton() {
  return (
    <button
    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      onClick={() => {
        throw new Error("🔥 Sentry test error");
      }}
    >
      Trigger Error
    </button>
  );
}