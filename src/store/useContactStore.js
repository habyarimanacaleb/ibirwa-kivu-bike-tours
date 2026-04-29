import { create } from 'zustand';
import axios from 'axios';

const API_BASE = "https://kivu-back-end.onrender.com/api";

const useContactStore = create((set, get) => ({
  contacts: [],
  isLoading: false,
  error: null,

  // 1. Submit a Public Contact Form
  submitInquiry: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_BASE}/contact`, formData);
      set({ isLoading: false });
      return { success: true, message: res.data.message };
    } catch (err) {
      set({ isLoading: false });
      return { success: false, message: err.response?.data?.message || "Submission failed" };
    }
  },

  // 2. Fetch all contacts (Admin)
  fetchContacts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`${API_BASE}/contacts`);
      set({ contacts: res.data, isLoading: false ,error: null});
    } catch (err) {
      set({ error: err.message || "Failed to load inbox", isLoading: false });
    }
  },

  // 3. Respond to a contact (Admin)
  respondToContact: async (contactId, responseMessage) => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_BASE}/respond`, { contactId, responseMessage });
      
      // Update local state instantly (Optimistic Update)
      set((state) => ({
        contacts: state.contacts.map((c) =>
          c._id === contactId ? { ...c, responded: true, responseMessage } : c
        ),
        isLoading: false
      }));
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return { success: false };
    }
  },

  // 4. Delete a contact (Admin)
  deleteContact: async (id) => {
    try {
      await axios.delete(`${API_BASE}/contact/${id}`);
      set((state) => ({
        contacts: state.contacts.filter((c) => c._id !== id)
      }));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }
}));

export default useContactStore;
