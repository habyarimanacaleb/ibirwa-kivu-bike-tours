import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import axios from '../lib/axios';

const API_BASE = "/services";

const useServiceStore = create(
  devtools(
    persist(
      (set, get) => ({
        services: [],
        currentService: null,
        isLoading: false,
        error: null,

        // FETCH SINGLE SERVICE WITH CACHE GUARD
        fetchServiceById: async (id) => {
          const state = get();
          
          // GUARD 1: If we are already loading, don't start a new request
          if (state.isLoading) return;

          // GUARD 2: If the currentService is already the one we need, don't fetch
          if (state.currentService && (state.currentService._id === id || state.currentService.id === id)) {
            return;
          }

          set({ isLoading: true, error: null });

          try {
            const response = await axios.get(`${API_BASE}/${id}`, {
              timeout: 3000 
            });

            set({ 
              currentService: response.data, 
              isLoading: false 
            });
          } catch (err) {
            let errorMessage = "Failed to reach the Kivu server.";
            if (err.code === 'ECONNABORTED') {
              errorMessage = "Server is waking up. Please wait or refresh.";
            }
            set({ 
              error: errorMessage, 
              isLoading: false 
            });
          }
        },

        // FETCH ALL SERVICES WITH CACHE GUARD
        fetchServices: async () => {
          // If we already have services in the cache, don't show loading spinner
          // just fetch in background or skip
          if (get().services.length > 0) return;

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
        },

        // Manual Clear if needed
        clearCurrentService: () => set({ currentService: null })
      }),
      {
        name: 'kivu-tour-storage', // name of the item in storage (must be unique)
        partialize: (state) => ({ services: state.services }), // ONLY persist the list, not loading/errors
      }
    )
  )
);

export default useServiceStore;