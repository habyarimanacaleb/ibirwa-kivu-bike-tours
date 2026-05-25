import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware"; // Added createJSONStorage
import axios from "../lib/axios";
const API_BASE = "/ibirwa-clients";
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET_KEY;

const secureStorage = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const bytes = CryptoJS.AES.decrypt(str, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
  setItem: (name, value) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
    localStorage.setItem(name, encrypted);
  },
  removeItem: (name) => localStorage.removeItem(name),
};

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        // --- STATE ---
        currentUser: null,
        token: null,
        users: [],
        loading: false,
        error: null,
        activeAlert: null,

        // --- AUTH METHODS ---
        login: async (credentials) => {
          set({ loading: true, error: null }, false, "login_start");
          try {
            const res = await axios.post(`${API_BASE}/login`, credentials);
            const { user, token } = res.data;
            set(
              { currentUser: user, token, loading: false },
              false,
              "login_success",
            );
            return { success: true };
          } catch (err) {
            const errMsg = err.response?.data?.message || "Login failed";
            set({ error: errMsg, loading: false }, false, "login_error");
            return { success: false, message: errMsg };
          }
        },

        signup: async (formData) => {
          set({ loading: true, error: null }, false, "signup_start");
          try {
            await axios.post(`${API_BASE}/signup`, formData);
            set({ loading: false }, false, "signup_success");
            return { success: true };
          } catch (err) {
            const errMsg = err.response?.data?.message || "Signup failed";
            set({ error: errMsg, loading: false }, false, "signup_error");
            return { success: false, message: errMsg };
          }
        },

        logout: () => {
          set(
            { currentUser: null, token: null, users: [], activeAlert: null },
            false,
            "logout",
          );
        },

        // --- USER MANAGEMENT METHODS ---
        fetchUsers: async () => {
          if (get().loading) return;
          set({ loading: true }, false, "fetch_users_start");
          try {
            const res = await axios.get(`${API_BASE}/users`);
            set(
              { users: res.data, loading: false },
              false,
              "fetch_users_success",
            );
          } catch (error) {
            set(
              { loading: false, error: error.message },
              false,
              "fetch_users_error",
            );
          }
        },

        adminRegisterUser: async (userData) => {
          set({ loading: true, error: null }, false, "admin_register_start");
          try {
            await axios.post(`${API_BASE}/signup`, userData);
            set({ loading: false }, false, "admin_register_success");
            return { success: true };
          } catch (err) {
            const errMsg = err.response?.data?.message || "Registration failed";
            set(
              { error: errMsg, loading: false },
              false,
              "admin_register_error",
            );
            return { success: false, message: errMsg };
          }
        },

        // --- GOVERNANCE & LIVE ALERT METHODS ---
        fetchActiveAlert: async () => {
          // 1. Exit immediately if an alert fetch is already in flight
          if (get().loading) return;

          try {
            const res = await axios.get(`${API_BASE}/admin/active-alert`);

            if (res.data?.success && res.data.data) {
              const alertData = res.data.data;
              const userRole = get().currentUser?.role;

              // Verify scope rules
              const matchesScope =
                alertData.scope === "all" ||
                alertData.scope === `${userRole}s` ||
                (alertData.scope === "admins" && userRole === "admin");

              if (matchesScope) {
                // 2. Only update state if the new alert content is actually different
                const currentAlertStr = JSON.stringify(get().activeAlert);
                const newAlertStr = JSON.stringify(alertData);

                if (currentAlertStr !== newAlertStr) {
                  set(
                    { activeAlert: alertData },
                    false,
                    "fetch_active_alert_sync",
                  );
                }
              } else {
                // If it doesn't match our scope, treat it as empty
                if (get().activeAlert !== null) {
                  set({ activeAlert: null }, false, "fetch_active_alert_empty");
                }
              }
            } else {
              // 3. ONLY call set() if the state isn't already null! This breaks the loop completely.
              if (get().activeAlert !== null) {
                set({ activeAlert: null }, false, "fetch_active_alert_empty");
              }
            }
          } catch (err) {
            console.error("Error pulling active alert cache registry:", err);
          }
        },

        setActiveAlert: (alertData) => {
          set({ activeAlert: alertData }, false, "set_active_alert_socket");
        },

        dismissActiveAlert: () => {
          set({ activeAlert: null }, false, "dismiss_active_alert");
        },

        broadcastSystemMessage: async (broadcastData) => {
          set({ loading: true, error: null }, false, "broadcast_start");
          try {
            const res = await axios.post(
              `${API_BASE}/admin/broadcast`,
              broadcastData,
            );
            set({ loading: false }, false, "broadcast_success");
            return { success: true, data: res.data };
          } catch (err) {
            const errMsg =
              err.response?.data?.message ||
              "Failed to route global broadcast directive.";
            set({ loading: false, error: errMsg }, false, "broadcast_error");
            return { success: false, message: errMsg };
          }
        },

        updateLegalFramework: async (legalData) => {
          set({ loading: true, error: null }, false, "update_legal_start");
          try {
            const res = await axios.put(
              `${API_BASE}/admin/legal-policies`,
              legalData,
            );
            set({ loading: false }, false, "update_legal_success");
            return { success: true, data: res.data };
          } catch (err) {
            const errMsg =
              err.response?.data?.message ||
              "Failed to commit legal framework changes.";
            set({ loading: false, error: errMsg }, false, "update_legal_error");
            return { success: false, message: errMsg };
          }
        },

        triggerSecurityAction: async (actionType, payload = {}) => {
          set({ loading: true, error: null }, false, "security_action_start");
          try {
            const res = await axios.post(
              `${API_BASE}/admin/security/${actionType}`,
              payload,
            );
            set({ loading: false }, false, "security_action_success");
            return {
              success: true,
              message: res.data?.message || "Security directive processed.",
            };
          } catch (err) {
            const errMsg =
              err.response?.data?.message ||
              "Security operational command rejected.";
            set(
              { loading: false, error: errMsg },
              false,
              "security_action_error",
            );
            return { success: false, message: errMsg };
          }
        },

        // --- PROFILE & SOCIAL ACTIONS ---
        updateProfile: async (userId, updateData) => {
          set({ loading: true }, false, "update_profile_start");
          try {
            const res = await axios.put(
              `${API_BASE}/user/${userId}`,
              updateData,
            );
            const isSelf = get().currentUser?._id === userId;
            set(
              (state) => ({
                currentUser: isSelf
                  ? { ...state.currentUser, ...res.data }
                  : state.currentUser,
                users: state.users.map((u) =>
                  u._id === userId ? res.data : u,
                ),
                loading: false,
              }),
              false,
              "update_profile_success",
            );
            return { success: true };
          } catch (err) {
            set(
              { loading: false, error: "Update failed" },
              false,
              "update_profile_error",
            );
            return { success: false };
          }
        },

        banUser: async (userId, isBanned) => {
          try {
            await axios.patch(`${API_BASE}/user/${userId}/ban`, { isBanned });
            set(
              (state) => ({
                users: state.users.map((u) =>
                  u._id === userId ? { ...u, isBanned } : u,
                ),
              }),
              false,
              "ban_user",
            );
          } catch (err) {
            console.error("Ban action failed", err);
          }
        },

        handleBlock: async (userId, shouldBlock) => {
          try {
            await axios.patch(`${API_BASE}/user/${userId}/block`, {
              blocked: shouldBlock,
            });
            set(
              (state) => ({
                users: state.users.map((u) =>
                  u._id === userId ? { ...u, blocked: shouldBlock } : u,
                ),
              }),
              false,
              "block_user",
            );
          } catch (err) {
            console.error("Block action failed", err);
          }
        },

        deleteUser: async (userId) => {
          set({ loading: true, error: null }, false, "delete_user_start");
          try {
            await axios.delete(`${API_BASE}/user/${userId}`);
            set(
              (state) => ({
                users: state.users.filter((u) => u._id !== userId),
                loading: false,
              }),
              false,
              "delete_user_success",
            );
            return { success: true };
          } catch (err) {
            console.error("Delete failed:", err);
            set(
              { error: "Failed to delete user", loading: false },
              false,
              "delete_user_error",
            );
            return { success: false };
          }
        },

        clearAuth: async () => {
          localStorage.removeItem("kivu-auth-storage");
        },
      }),
      {
        name: "kivu-auth-storage",
        storage: createJSONStorage(() => secureStorage),
        partialize: (state) => ({
          currentUser: state.currentUser,
          token: state.token,
        }),
      },
    ),
  ),
);

export default useAuthStore;
