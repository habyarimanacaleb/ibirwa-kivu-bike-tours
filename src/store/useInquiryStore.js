import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import axios from '../lib/axios';

const API_URL = "/inquiries";

const useInquiryStore = create(
  devtools(
    persist(
      (set, get) => ({
        // --- STATE ---
        inquiries: [],
        isLoading: false,

        // --- ACTIONS ---
        
        // Fetch all inquiries
        fetchInquiries: async () => {
          // Loop Guard: Stop if already loading
          if (get().isLoading) return;

          set({ isLoading: true }, false, "fetch_inquiries_start");
          try {
            const res = await axios.get(API_URL);
            set({ inquiries: res.data, isLoading: false }, false, "fetch_inquiries_success");
          } catch (error) {
            console.error("Fetch failed:", error);
            set({ isLoading: false }, false, "fetch_inquiries_error");
          }
        },

        // Create new inquiry
        createInquiry: async (formData) => {
          set({ isLoading: true }, false, "create_inquiry_start");
          try {
            const res = await axios.post(API_URL, formData);
            set((state) => ({ 
              inquiries: [...state.inquiries, res.data],
              isLoading: false 
            }), false, "create_inquiry_success");
            return { success: true, message: res.data.message };
          } catch (error) {
            set({ isLoading: false }, false, "create_inquiry_error");
            return { success: false, message: error.message };
          }
        },

        // Delete inquiry
        deleteInquiry: async (id) => {
          try {
            await axios.delete(`${API_URL}/${id}`);
            set((state) => ({
              inquiries: state.inquiries.filter((item) => item._id !== id),
            }), false, "delete_inquiry_success");
          } catch (error) {
            console.error("Delete failed:", error);
          }
        },

        // Respond to inquiry
        respondToInquiry: async (id, responseMessage) => {
          set({ isLoading: true }, false, "respond_inquiry_start");
          try {
            await axios.post(`${API_URL}/respond/${id}`, { responseMessage });
            set({ isLoading: false }, false, "respond_inquiry_success");
            return true;
          } catch (error) {
            console.error("Response failed:", error);
            set({ isLoading: false }, false, "respond_inquiry_error");
            return false;
          }
        },
      }),
      {
        name: "kivu-inquiry-storage",
        // Only persist 'inquiries'. Do NOT persist 'isLoading'.
        partialize: (state) => ({ inquiries: state.inquiries }),
      }
    )
  )
);

export default useInquiryStore;