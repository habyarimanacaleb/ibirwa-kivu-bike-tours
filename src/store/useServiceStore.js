import { create } from 'zustand';
import axios from 'axios';

const API_BASE = "https://kivu-back-end.onrender.com/api/services";

const useServiceStore = create((set, get) => ({
  services: [],
  currentService: null,
  isLoading: false,
  error: null,

  // 1. Fetch All Services
  fetchServices: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(API_BASE);
      const sorted = (res.data.services || []).sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      set({ services: sorted, isLoading: false });
    } catch (err) {
      set({ error: "Failed to fetch services", isLoading: false });
    }
  },

  // 2. Fetch Single Service (for Details or Update Page)
  fetchServiceById: async (id) => {
    set({ isLoading: true, currentService: null });
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      set({ currentService: res.data, isLoading: false });
      return res.data;
    } catch (err) {
      set({ error: "Service not found", isLoading: false });
    }
  },

  // 3. Create Service
  createService: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(API_BASE, formData);
      set((state) => ({
        services: [res.data, ...state.services],
        isLoading: false
      }));
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return { success: false, message: err.response?.data?.message };
    }
  },

  // 4. Update Service
  updateService: async (id, formData) => {
    set({ isLoading: true });
    try {
      const res = await axios.put(`${API_BASE}/${id}`, formData);
      set((state) => ({
        services: state.services.map((s) => (s._id === id ? res.data : s)),
        isLoading: false
      }));
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return { success: false, message: err.response?.data?.message };
    }
  },

  // 5. Delete Service
  deleteService: async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      set((state) => ({
        services: state.services.filter((s) => s._id !== id)
      }));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }
}));

export default useServiceStore;
