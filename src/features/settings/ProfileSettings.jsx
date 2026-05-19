import React, { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";

export default function ProfileSettings() {
  // 1. Atomic Zustand tracking to prevent unnecessary re-render hooks
  const currentUser = useAuthStore((state) => state.currentUser);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const loading = useAuthStore((state) => state.loading);
  const globalError = useAuthStore((state) => state.error);

  // 2. Local Form States
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "", // Optional update field
  });

  // Status monitors
  const [status, setStatus] = useState({ show: false, text: "", type: "success" });

  // 3. Hydrate state values safely matching backend user keys (id fallback)
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "", // Leave blank for security
      });
    }
  }, [currentUser]);

  const triggerToast = (text, type = "success") => {
    setStatus({ show: true, text, type });
    setTimeout(() => setStatus({ show: false, text: "", type: "success" }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fallback extraction matching backend id schema shape variants
    const targetId = currentUser?.id || currentUser?._id;
    
    if (!targetId) {
      triggerToast("User identity signature missing. Please re-authenticate.", "error");
      return;
    }

    // Filter updates payload to prevent shipping an empty password string
    const updatePayload = {
      username: formData.username,
      email: formData.email,
    };
    if (formData.password.trim() !== "") {
      updatePayload.password = formData.password;
    }

    const res = await updateProfile(targetId, updatePayload);

    if (res?.success) {
      triggerToast("Profile metrics committed successfully!");
      // Reset password input box after successful update
      setFormData((prev) => ({ ...prev, password: "" }));
    } else {
      triggerToast(globalError || "Profile processing error occurred.", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Element */}
      {status.show && (
        <div className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-xl border text-white transition-all transform duration-300 flex items-center gap-3 ${
          status.type === "error" ? "bg-rose-600 border-rose-700" : "bg-emerald-600 border-emerald-700"
        }`}>
          <span className="text-sm font-semibold">{status.text}</span>
        </div>
      )}

      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800">Profile Configuration</h3>
        <p className="text-xs text-slate-400 mt-0.5">Manage your user information records and security credentials access tokens.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            Username / Identity Name
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full text-sm border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50 p-2.5 border"
            placeholder="Enter your workspace signature name"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            Email Routing Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full text-sm border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50 p-2.5 border"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            Update Security Password <span className="text-slate-400 font-normal normal-case">(Leave blank to keep current)</span>
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full text-sm border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50 p-2.5 border font-mono"
            placeholder="••••••••••••"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 px-6 rounded-xl text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? "Saving Records..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}