import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "axios";

const API_BASE = "https://kivu-back-end.onrender.com/api";

const useContactStore = create(
  devtools(
    persist(
      (set, get) => ({
        // --- STATE ---
        contacts: [],
        isLoading: false,
        error: null,

        // --- ACTIONS ---
        submitInquiry: async (formData) => {
          set({ isLoading: true }, false, "submit_inquiry_start");
          try {
            const res = await axios.post(`${API_BASE}/contact`, formData);
            set({ isLoading: false }, false, "submit_inquiry_success");
            return { success: true, message: res.data.message };
          } catch (err) {
            set({ isLoading: false }, false, "submit_inquiry_error");
            return { success: false, message: err.response?.data?.message || "Submission failed" };
          }
        },

        fetchContacts: async () => {
          // Loop Guard: If already loading, exit to prevent redundant requests
          if (get().isLoading) return;

          set({ isLoading: true, error: null }, false, "fetch_contacts_start");
          try {
            const res = await axios.get(`${API_BASE}/contacts`);
            set({ contacts: res.data, isLoading: false, error: null }, false, "fetch_contacts_success");
          } catch (err) {
            set({ error: err.message || "Failed to load inbox", isLoading: false }, false, "fetch_contacts_error");
          }
        },

        respondToContact: async (contactId, responseMessage) => {
          set({ isLoading: true }, false, "respond_contact_start");
          try {
            await axios.post(`${API_BASE}/respond`, { contactId, responseMessage });
            
            set((state) => ({
              contacts: state.contacts.map((c) =>
                c._id === contactId ? { ...c, responded: true, responseMessage } : c
              ),
              isLoading: false
            }), false, "respond_contact_success");
            return { success: true };
          } catch (err) {
            set({ isLoading: false }, false, "respond_contact_error");
            return { success: false };
          }
        },

        deleteContact: async (id) => {
          try {
            await axios.delete(`${API_BASE}/contact/${id}`);
            set((state) => ({
              contacts: state.contacts.filter((c) => c._id !== id)
            }), false, "delete_contact_success");
          } catch (err) {
            console.error("Delete failed:", err);
          }
        }
      }),
      {
        name: "kivu-contact-storage",
        // Only persist the 'contacts' array. 
        partialize: (state) => ({ contacts: state.contacts }),
      }
    )
  )
);

export default useContactStore;