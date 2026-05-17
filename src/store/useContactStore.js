import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "../lib/axios";
import { toast } from "react-toastify";

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
            await axios.post("/contact/respond", { contactId, responseMessage });
            set((state) => ({
              contacts: state.contacts.map((c) =>
                c._id === contactId
                  ? { ...c, responded: true, responseMessage }
                  : c,
              ),
              isLoading: false,
            }));
            toast.success("Your response sent")
            return { success: true };
          } catch (err) {
            set({ isLoading: false });
            toast.error(err.message)
            return { success: false };
          }
        },

        deleteContact: async (id) => {
          try {
            await axios.delete(`/contact/${id}`);
            set(
              (state) => ({
                contacts: state.contacts.filter((c) => c._id !== id),
              }),
              false,
              "delete_contact_success",
            );
            toast.success("Delete contact success")
            return { success: true };
          } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Fail to delete contacts infor",err.message)
            return { success: false };
          }
        },
        deleteAllContact: async () => {
          try {
            await axios.delete(`/contact`);
            set(
              (state) => ({
                contacts: state.contacts.filter((c) => {}),
              }),
              false,
              "delete_contacts_success",
            );
            toast.success("Delete all contact success")
            return { success: true };
          } catch (err) {
            console.error("Delete failed:", err);
            toast.error(err.message)
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
