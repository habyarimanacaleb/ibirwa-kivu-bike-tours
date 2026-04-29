export const fetchGalleryData = async () => {
  try {
    const res = await fetch("https://kivu-back-end.onrender.com/api/gallery");
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Gallery fetch failed, ignoring error:", error);
    return []; // Return empty array to avoid UI crashes
  }
};
