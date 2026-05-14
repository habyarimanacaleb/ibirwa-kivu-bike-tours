import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import axios from 'axios';

const API_URL = "https://kivu-back-end.onrender.com/api/gallery";

const useGalleryStore = create(
  devtools(
    persist(
      (set, get) => ({
        images: [],
        isLoading: false,
        error: null,

        // READ: Fetch images with "Instant UI" logic
        loadGallery: async () => {
          const existingImages = get().images;

          // If we have images, don't show the loading spinner (prevent white screen)
          // Just refresh them in the background
          if (existingImages.length > 0) {
            get().refreshGallerySilently();
            return;
          }

          set({ isLoading: true, error: null }, false, "load_gallery_start");
          try {
            const response = await axios.get(API_URL, { timeout: 30000 });
            const data = response.data.data || response.data;
            set({ images: data, isLoading: false }, false, "load_gallery_success");
          } catch (error) {
            set({ error: "Connect to Kivu Server failed", isLoading: false }, false, "load_gallery_error");
          }
        },

        // Background Refresh (Zero-spinner update)
        refreshGallerySilently: async () => {
          try {
            const response = await axios.get(API_URL);
            const data = response.data.data || response.data;
            set({ images: data }, false, "gallery_silent_refresh_success");
          } catch (e) {
            console.warn("Background update failed, using persisted data.");
          }
        },

        addImage: async (formData) => {
          set({ isLoading: true });
          try {
            const response = await axios.post(API_URL, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            const newImage = response.data.data || response.data;
            set((state) => ({
              images: [newImage, ...state.images], 
              isLoading: false
            }));
            return { success: true };
          } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
          }
        },

        removeImage: async (id) => {
          try {
            await axios.delete(`${API_URL}/${id}`);
            set((state) => ({
              images: state.images.filter((img) => img._id !== id),
            }));
          } catch (error) {
            console.error("Delete failed", error);
            throw error;
          }
        },

        updateImage: async (id, formData) => {
          set({ isLoading: true });
          try {
            const response = await axios.put(`${API_URL}/${id}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            const updatedData = response.data.data || response.data;
            set((state) => ({
              images: state.images.map((img) => (img._id === id ? updatedData : img)),
              isLoading: false
            }));
            return { success: true };
          } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
          }
        }
      }),
      {
        name: "kivu-gallery-storage",
        partialize: (state) => ({ images: state.images }), 
      }
    )
  )
);

export default useGalleryStore;