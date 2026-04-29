import { create } from "zustand";
import axios from "axios";

const API_BASE = "https://kivu-back-end.onrender.com/api/ibirwa-clients";

const useAuthStore = create((set, get) => ({
  // Auth State
  currentUser: JSON.parse(localStorage.getItem("admin_user")) || null,
  token: localStorage.getItem("admin_token") || null,

  // Management State
  users: [],
  loading: false,
  error: null,

  /* --- AUTH METHODS --- */
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_BASE}/login`, credentials);
      // Destructure based on your specific backend response structure
      const { user, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({ currentUser: user, token, loading: false });
      return { success: true };
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      set({ error: errMsg, loading: false });
      return { success: false };
    }
  },

  signup: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_BASE}/signup`, formData);
      set({ loading: false });
      // Backend returns success even if structured differently
      return { success: true, message: res.data.message };
    } catch (err) {
      const errMsg = err.response?.data?.message || "Signup failed";
      set({ error: errMsg, loading: false });
      return { success: false, message: errMsg };
    }
  },

  logout: () => {
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_token");
    set({ currentUser: null, token: null, users: [] });
  },

  /* --- USER CRUD METHODS --- */
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE}/users`);
      set({ users: res.data, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch users", loading: false });
    }
  },

  handleBlock: async (userId, shouldBlock) => {
    try {
      await axios.patch(`${API_BASE}/user/${userId}/block`, {
        blocked: shouldBlock,
      });
      // Optimistic Update
      set((state) => ({
        users: state.users.map((u) =>
          u._id === userId ? { ...u, blocked: shouldBlock } : u,
        ),
      }));
    } catch (err) {
      console.error("Action failed", err);
    }
  },

  deleteUser: async (userId) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await axios.delete(`${API_BASE}/user/${userId}`);
      set((state) => ({
        users: state.users.filter((u) => u._id !== userId),
      }));
    } catch (err) {
      console.error("Delete failed", err);
    }
  },
}));

export default useAuthStore;
