import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";

export default function GovernanceSettings() {
  //  ATOMIC ACTIONS & STATE SLICES
  const broadcastSystemMessage = useAuthStore((state) => state.broadcastSystemMessage);
  const updateLegalFramework = useAuthStore((state) => state.updateLegalFramework);
  const triggerSecurityAction = useAuthStore((state) => state.triggerSecurityAction);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  
  // Notice form local states
  const [broadcastForm, setBroadcastForm] = useState({ title: "", text: "", scope: "all" });
  const [legalForm, setLegalForm] = useState({ terms: "", privacy: "" });
  
  // Status reporting monitors
  const [notif, setNotif] = useState({ show: false, text: "", type: "success" });

  const triggerToast = (text, type = "success") => {
    setNotif({ show: true, text, type });
    setTimeout(() => setNotif({ show: false, text: "", type: "success" }), 4000);
  };

  const handleBroadcastSubmit = async (e) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.text) return;

    const res = await broadcastSystemMessage(broadcastForm);
    if (res.success) {
      triggerToast("Real-time global broadcast message successfully dispatched!");
      setBroadcastForm({ title: "", text: "", scope: "all" });
    } else {
      triggerToast(res.message || "Broadcast pipeline execution error", "error");
    }
  };

  const handleLegalSubmit = async (e) => {
    e.preventDefault();
    const res = await updateLegalFramework(legalForm);
    if (res.success) {
      triggerToast("System policy contract agreements successfully updated.");
    } else {
      triggerToast(res.message || "Failed to save privacy arrangements.", "error");
    }
  };

  const executeSecurityAction = async (actionType) => {
    const res = await triggerSecurityAction(actionType);
    if (res.success) {
      triggerToast(res.message);
    } else {
      triggerToast(res.message || "Action executed with structural failure.", "error");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-2">
      {/* Toast Banner */}
      {notif.show && (
        <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-xl border text-white transition-all transform duration-300 flex items-center gap-3 ${
          notif.type === "error" ? "bg-rose-600 border-rose-700" : "bg-emerald-600 border-emerald-700"
        }`}>
          <span className="text-sm font-semibold">{notif.text}</span>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Governance Console</h1>
        <p className="text-sm text-slate-500 mt-1">Manage global user alert parameters, document matrices, and operational parameters.</p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PANEL A: LIVE WEBSOCKET SYSTEM BROADCASTS */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Dispatch Mass Alert</h3>
              <p className="text-xs text-slate-400">Emits live websocket view interruptions across client panels</p>
            </div>
          </div>

          <form onSubmit={handleBroadcastSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Target Viewport Scope</label>
              <select
                value={broadcastForm.scope}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, scope: e.target.value })}
                className="w-full text-sm border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50 p-2.5 border"
              >
                <option value="all">Everyone (All Sessions)</option>
                <option value="clients">Clients Only</option>
                <option value="admins">Administrators Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Alert Title Header</label>
              <input
                type="text"
                placeholder="e.g., Scheduled Maintenance"
                value={broadcastForm.title}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                className="w-full text-sm border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50 p-2.5 border"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Alert Message Text</label>
              <textarea
                rows={3}
                placeholder="Enter alert content text here..."
                value={broadcastForm.text}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, text: e.target.value })}
                className="w-full text-sm border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50 p-2.5 border resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 px-4 rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Emitting Stream..." : "Fire System Notification"}
            </button>
          </form>
        </div>

        {/* PANEL B: OPERATIONAL INFRASTRUCTURE RIGS */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Infrastructure Controls</h3>
                <p className="text-xs text-slate-400">Execute dynamic operational updates directly on the server app</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Dynamic Multi-Factor Authentication</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Toggle global security enforcement policies across user profile endpoints.</p>
                </div>
                <button
                  onClick={() => executeSecurityAction("toggle-mfa")}
                  disabled={loading}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-sm whitespace-nowrap transition-colors"
                >
                  Toggle Policy
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Flush Memory Buffers</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Clears application query caches, forcing models to read directly from database logs.</p>
                </div>
                <button
                  onClick={() => executeSecurityAction("flush-cache")}
                  disabled={loading}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-sm whitespace-nowrap transition-colors"
                >
                  Flush Cache
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-xs flex gap-2 items-start">
            <span>⚠️</span>
            <p><strong>Security Warning:</strong> Action triggers apply across the runtime environment context immediately. Verify configuration inputs before running scripts.</p>
          </div>
        </div>

      </div>

      {/* PANEL C: LEGAL FRAMEWORK AND POLICIES SECTION */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">Modify Legal Policies</h3>
            <p className="text-xs text-slate-400">Updates system Terms of Service and Privacy Policy markdown text</p>
          </div>
        </div>

        <form onSubmit={handleLegalSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Terms of Service (Markdown Layout)</label>
            <textarea
              rows={6}
              placeholder="# Global Terms of Service..."
              value={legalForm.terms}
              onChange={(e) => setLegalForm({ ...legalForm, terms: e.target.value })}
              className="w-full text-sm border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500 bg-slate-50 p-2.5 border font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Privacy Policy (Markdown Layout)</label>
            <textarea
              rows={6}
              placeholder="# Privacy Policy Framework..."
              value={legalForm.privacy}
              onChange={(e) => setLegalForm({ ...legalForm, privacy: e.target.value })}
              className="w-full text-sm border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500 bg-slate-50 p-2.5 border font-mono"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-2 px-6 rounded-xl text-sm shadow-sm transition-all"
            >
              {loading ? "Saving Files..." : "Commit Framework Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}