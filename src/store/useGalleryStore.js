import { create } from 'zustand';
import { fetchGalleryData } from '../services/galleryService';

const useGalleryStore = create((set) => ({
  images: [],
  isLoading: false,
  
  loadGallery: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchGalleryData();
      set({ images: data, isLoading: false });
    } catch (error) {
        set({ images: [], isLoading: false });
        console.error("Failed to load gallery data:", error);
    }
  },
}));

export default useGalleryStore;
