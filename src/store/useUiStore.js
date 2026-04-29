import { create } from 'zustand';

const useUiStore = create((set) => ({
  isInquiryOpen: false,
  selectedInquiry: null, // For responding to a specific inquiry
  openInquiry: (inquiry = null) => set({ isInquiryOpen: true, selectedInquiry: inquiry }),
  closeInquiry: () => set({ isInquiryOpen: false, selectedInquiry: null }),
}));

export default useUiStore;
