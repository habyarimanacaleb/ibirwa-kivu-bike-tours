import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "../lib/axios"; // CRITICAL: Use the intercepted instance

const useContactStore = create(
  devtools(
    persist(
      (set, get) => ({
        contacts: [],
        isLoading: false,
        error: null,

        fetchContacts: async () => {
          if (get().isLoading) return;
          set({ isLoading: true, error: null }, false, "fetch_contacts_start");
          try {
            // Ensure this matches your backend route (e.g., /contacts)
            const res = await axios.get("/contacts");
            set(
              { contacts: res.data, isLoading: false },
              false,
              "fetch_contacts_success",
            );
          } catch (err) {
            set(
              { error: err.message, isLoading: false },
              false,
              "fetch_contacts_error",
            );
          }
        },

        respondToContact: async (contactId, responseMessage) => {
          set({ isLoading: true });
          try {
            await axios.post("/respond", { contactId, responseMessage });
            set((state) => ({
              contacts: state.contacts.map((c) =>
                c._id === contactId
                  ? { ...c, responded: true, responseMessage }
                  : c,
              ),
              isLoading: false,
            }));
            return { success: true };
          } catch (err) {
            set({ isLoading: false });
            return { success: false };
          }
        },

        deleteContact: async (id) => {
          try {
            // If you get a 404, check if the backend expects /contacts/id or /contact/id
            await axios.delete(`/contacts/${id}`);
            set(
              (state) => ({
                contacts: state.contacts.filter((c) => c._id !== id),
              }),
              false,
              "delete_contact_success",
            );
            return { success: true };
          } catch (err) {
            console.error("Delete failed:", err);
            return { success: false };
          }
        },
      }),
      {
        name: "kivu-contact-storage",
        partialize: (state) => ({ contacts: state.contacts }),
      },
    ),
  ),
);

export default useContactStore;
