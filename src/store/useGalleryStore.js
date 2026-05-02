import { create } from 'zustand';
import axios from 'axios';

const API_URL = "https://kivu-back-end.onrender.com/api/gallery";

const useGalleryStore = create((set, get) => ({
  images: [],
  isLoading: false,
  error: null,

  // READ: Fetch all images
  loadGallery: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      const data = response.data.data || response.data;
      set({ images: data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to load gallery", isLoading: false });
    }
  },

  // CREATE: Add new image (handles FormData for file uploads)
  addImage: async (formData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      const newImage = response.data.data || response.data;
      
      // Update local state by adding the new image to the list
      set((state) => ({
        images: [newImage, ...state.images], 
        isLoading: false
      }));
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      console.error("Upload failed", error);
      return { success: false, error: error.message };
    }
  },
  // DELETE: Remove image
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
  // UPDATE: Update existing image
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
}));

export default useGalleryStore;
