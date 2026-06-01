import * as Sentry from "@sentry/react";

export default function SafeTest() {
  return (
    <button
    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      onClick={async () => {
        Sentry.captureMessage("SAFE TEST EVENT");

        const err = new Error("FORCED TEST ERROR");
        Sentry.captureException(err);

        // 🔥 FORCE SEND (important for debugging)
        await Sentry.flush(2000);

        console.log("Sentry flushed");
      }}
    >
      Safe Test
    </button>
  );
}