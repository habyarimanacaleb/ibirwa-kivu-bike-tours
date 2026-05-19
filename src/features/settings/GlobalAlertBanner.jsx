import React from "react";
import useAuthStore from "../../store/useAuthStore";

export default function GlobalAlertBanner() {
  //  ATOMIC SELECTORS: Component watches ONLY these two keys
  const activeAlert = useAuthStore((state) => state.activeAlert);
  const dismissActiveAlert = useAuthStore((state) => state.dismissActiveAlert);

  if (!activeAlert) return null;

  // Set color styling context dynamically based on scope target arrays
  const scopeColors = {
    all: "bg-amber-600 border-amber-700 text-white",
    clients: "bg-indigo-600 border-indigo-700 text-white",
    admins: "bg-rose-700 border-rose-800 text-white",
  };

  const selectedStyle = scopeColors[activeAlert.scope] || scopeColors.all;

  return (
    <div className={`w-full border-b px-4 py-3 shadow-md relative transition-all duration-300 ${selectedStyle}`}>
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white/20 rounded-lg shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-sm tracking-wide uppercase sm:inline-block mr-2">
              {activeAlert.title}:
            </h5>
            <span className="text-sm font-medium opacity-95">
              {activeAlert.text}
            </span>
          </div>
        </div>

        <button
          onClick={dismissActiveAlert}
          className="p-1 rounded-md hover:bg-white/10 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label="Dismiss alert"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}