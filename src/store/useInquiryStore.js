import { create } from 'zustand';
import axios from 'axios';

const API_URL = "https://kivu-back-end.onrender.com/api/inquiries";

const useInquiryStore = create((set, get) => ({
  inquiries: [],
  isLoading: false,

  // Fetch all inquiries
  fetchInquiries: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(API_URL);
      set({ inquiries: res.data, isLoading: false });
    } catch (error) {
      console.error("Fetch ignored:", error);
      set({ isLoading: false }); // Keep current state on error
    }
  },

  // Create new inquiry
  createInquiry: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(API_URL, formData);
      // Add the new inquiry to the list without refetching everything
      set((state) => ({ 
        inquiries: [...state.inquiries, res.data],
        isLoading: false 
      }));
      return { success: true, message: res.data.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  // Delete inquiry
  deleteInquiry: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        inquiries: state.inquiries.filter((item) => item._id !== id),
      }));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  },

  // Respond to inquiry
  respondToInquiry: async (id, responseMessage) => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URL}/respond/${id}`, { responseMessage });
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error("Response failed:", error);
      set({ isLoading: false });
      return false;
    }
  },
}));

export default useInquiryStore;
