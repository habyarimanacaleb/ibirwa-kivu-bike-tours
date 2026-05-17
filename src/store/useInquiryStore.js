import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import axios from "../lib/axios"; // Assuming your axios is pre-configured with base URL
import { toast } from "react-toastify";

const useInquiryStore = create(
  devtools(
    persist(
      (set, get) => ({
        // --- STATE ---
        inquiries: [],
        selectedInquiry: null,
        responseMessage: "",
        isLoading: false,

        // --- Setters ---
        setSelectedInquiry: (inquiry) => set({ selectedInquiry: inquiry }),
        setResponseMessage: (msg) => set({ responseMessage: msg }),

        // --- Actions ---

        // Fetch all inquiries
        fetchInquiries: async () => {
          set({ isLoading: true });
          try {
            const res = await axios.get("/inquiries");
            set({ inquiries: res.data, isLoading: false });
          } catch (error) {
            console.error("Fetch failed:", error);
            set({ isLoading: false });
            if (error.response?.status === 404) alert("Inquiries endpoint not found.");
          }
        },

        // Create new inquiry
        createInquiry: async (formData) => {
          set({ isLoading: true });
          try {
            const res = await axios.post("/inquiries", formData);
            set((state) => ({
              inquiries: [...state.inquiries, res.data],
              isLoading: false,
            }));
            toast.success("Inquiry sent successfull")
            toast.info("You got Follow up email soon.")
            return { success: true };
          } catch (error) {
            set({ isLoading: false });
            return { success: false, message: error.message };
          }
        },

        // Respond to an inquiry
        handleRespond: async (id) => {
          const { responseMessage } = get();
          if (!responseMessage.trim()) return alert("Response message is required.");

          set({ isLoading: true });
          try {
            await axios.post(`/inquiries/respond/${id}`, { responseMessage });
              toast.done("Response sent successfully!");            
            // Reset fields
            set({ responseMessage: "", selectedInquiry: null });
            
            // Refresh list to update UI
            await get().fetchInquiries(); 
          } catch (error) {
            console.error("Error sending response:", error);
            alert("Failed to send response.");
          } finally {
            set({ isLoading: false });
          }
        },

        // Delete inquiry
        handleDelete: async (id) => {
          if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

          set({ isLoading: true });
          try {
            await axios.delete(`/inquiries/${id}`);
            toast.success("Inquiry deleted successfully!");
            
            // Remove from state without re-fetching
            set((state) => ({
              inquiries: state.inquiries.filter((item) => item._id !== id),
            }));
          } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete inquiry.");
          } finally {
            set({ isLoading: false });
          }
        },
      }),
      {
        name: "kivu-inquiry-storage",
        partialize: (state) => ({ inquiries: state.inquiries }),
      }
    )
  )
);

export default useInquiryStore;