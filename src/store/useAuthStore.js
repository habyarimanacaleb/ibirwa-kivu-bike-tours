import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "../lib/axios";
const API_BASE = "/ibirwa-clients";

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
          set({ loading: true, error: null });
          try {
            await axios.post(`${API_BASE}/signup`, formData);
            set({ loading: false });
            return { success: true };
          } catch (err) {
            const errMsg = err.response?.data?.message || "Signup failed";
            set({ error: errMsg, loading: false });
            return { success: false, message: errMsg };
          }
        },

        logout: () => {
          set({ currentUser: null, token: null, users: [] }, false, "logout");
        },

        // --- USER MANAGEMENT METHODS ---
        fetchUsers: async () => {
          // 1. THE GUARD: Stop if already loading
          if (get().isLoading) return;

          // 2. Set loading
          set({ isLoading: true });

          try {
            const res = await axios.get(`${API_BASE}/users`);
            set({ users: res.data, isLoading: false });
          } catch (error) {
            set({ isLoading: false, error: error.message });
          }
        },

        adminRegisterUser: async (userData) => {
          set({ loading: true, error: null }, false, "admin_register_start");
          try {
            // Make sure this endpoint matches your backend route
            await axios.post(`${API_BASE}/admin/register`, userData);

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

        updateProfile: async (userId, updateData) => {
          set({ loading: true });
          try {
            const res = await axios.put(
              `${API_BASE}/user/${userId}`,
              updateData,
            );
            // Update currentUser if they edited their own profile
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
              "update_profile",
            );
            return { success: true };
          } catch (err) {
            set({ loading: false, error: "Update failed" });
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
            set((state) => ({
              users: state.users.map((u) =>
                u._id === userId ? { ...u, blocked: shouldBlock } : u,
              ),
            }));
          } catch (err) {
            console.error("Block action failed", err);
          }
        },
        deleteUser: async (userId) => {
          set({ loading: true, error: null });
          try {
            // Just use axios normally now! The interceptor adds the token.
            await axios.delete(`${API_BASE}/user/${userId}`);

            set((state) => ({
              users: state.users.filter((u) => u._id !== userId),
              loading: false,
            }));
            return { success: true };
          } catch (err) {
            console.error("Delete failed:", err);
            set({ error: "Failed to delete user", loading: false });
            return { success: false };
          }
        },
      }),
      {
        name: "kivu-auth-storage", // Unique name for localStorage
        partialize: (state) => ({
          currentUser: state.currentUser,
          token: state.token,
        }), // Only persist these
      },
    ),
  ),
);

export default useAuthStore;
