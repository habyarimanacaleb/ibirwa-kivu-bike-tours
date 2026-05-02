import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import axios from 'axios';

const API_URL = "https://kivu-back-end.onrender.com/api/gallery";

const useGalleryStore = create(
  devtools(
    persist(
      (set, get) => ({
        // --- STATE ---
        images: [],
        isLoading: false,
        error: null,

        // --- ACTIONS ---
        
        // READ: Fetch all images
        loadGallery: async () => {
          // Loop Guard: Prevent multiple simultaneous requests
          if (get().isLoading) return;

          set({ isLoading: true, error: null }, false, "load_gallery_start");
          try {
            const response = await axios.get(API_URL);
            const data = response.data.data || response.data;
            set({ images: data, isLoading: false }, false, "load_gallery_success");
          } catch (error) {
            set({ error: "Failed to load gallery", isLoading: false }, false, "load_gallery_error");
          }
        },

        // CREATE: Add new image
        addImage: async (formData) => {
          set({ isLoading: true }, false, "add_image_start");
          try {
            const response = await axios.post(API_URL, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            
            const newImage = response.data.data || response.data;
            
            set((state) => ({
              images: [newImage, ...state.images], 
              isLoading: false
            }), false, "add_image_success");
            
            return { success: true };
          } catch (error) {
            set({ isLoading: false }, false, "add_image_error");
            return { success: false, error: error.message };
          }
        },

        // DELETE: Remove image
        removeImage: async (id) => {
          try {
            await axios.delete(`${API_URL}/${id}`);
            set((state) => ({
              images: state.images.filter((img) => img._id !== id),
            }), false, "remove_image_success");
          } catch (error) {
            console.error("Delete failed", error);
            throw error;
          }
        },

        // UPDATE: Update existing image
        updateImage: async (id, formData) => {
          set({ isLoading: true }, false, "update_image_start");
          try {
            const response = await axios.put(`${API_URL}/${id}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            const updatedData = response.data.data || response.data;
            
            set((state) => ({
              images: state.images.map((img) => (img._id === id ? updatedData : img)),
              isLoading: false
            }), false, "update_image_success");
            
            return { success: true };
          } catch (error) {
            set({ isLoading: false }, false, "update_image_error");
            return { success: false, error: error.message };
          }
        }
      }),
      {
        name: "kivu-gallery-storage",
        // Only persist the 'images' array.
        // We exclude 'isLoading' and 'error' so they reset on page refresh.
        partialize: (state) => ({ images: state.images }),
      }
    )
  )
);

export default useGalleryStore;