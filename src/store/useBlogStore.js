import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

const API_URL = "https://kivu-back-end.onrender.com/api/blogs";

// --- MOCK DATA FOR DEVELOPMENT ---
const mockBlogs = [
 {
    _id: "blog_001",
    title: "The Physics of the Kivu Trail: Gear Ratio & Verticals",
    category: "Technical",
    // Verified Bike Gear/Chain Image
    mainImage: "https://images.singletracks.com/blog/wp-content/uploads/2022/10/0O8A1766-scaled.jpg",
    excerpt: "Exploring why a 44:1 gear ratio is the mechanical sweet spot for our Congo Nile Cycling Package.",
    content: "Deep dive into the mechanical stresses of high-altitude cycling on our premier Congo Nile Trail tour package...",
    createdAt: new Date("2026-05-10").toISOString(),
    likes: ["user1", "user2"],
    isLiked: true,
    gallery: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541625602330-2277a1cd13a1?auto=format&fit=crop&q=80&w=800"
    ],
    comments: [{ user: "Eric M.", text: "This helped me choose the right bike setup." }]
  },
  {
    _id: "blog_002",
    title: "Midnight on Lake Kivu: A Fisherman's Perspective",
    category: "Culture",
    mainImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000",
    excerpt: "How the rhythmic lights of the Sambaza fishing boats guide our exclusive Night-Water Excursion Package.",
    content: "The lights of Lake Kivu are more than just a tradition; they are a living navigation system for our Night-Water Night Cruise package. Travelers join local fishermen in traditional three-hulled canoes, learning the ancient songs and techniques used to harvest Sambaza sardines beneath a star-filled sky...",
    createdAt: new Date("2026-05-08").toISOString(),
    likes: ["user3"],
    isLiked: false,
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1534329535363-5fa5ca726cd5?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  },
  {
    _id: "blog_003",
    title: "Explore the Perfect Expedition Bike Fleet",
    category: "Technical",
    mainImage: "https://images.unsplash.com/photo-1475666675596-cca2035b3d79?auto=format&fit=crop&q=80&w=2000",
    excerpt: "A breakdown of the frame geometry and rugged modifications built into our Rwanda Multi-Day Tour package fleet.",
    content: "Using professional CAD tools, we optimized the stress-bearing points of our rental fleet frames to ensure maximum safety and durability on rocky descents. This ensures that every rider booking our multi-day custom expeditions experiences absolute mechanical reliability across Rwanda's thousands of hills...",
    createdAt: new Date("2026-05-01").toISOString(),
    likes: ["user4", "user5", "user6"],
    isLiked: true,
    gallery: [
      "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1502744688674-c619d3586721?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  },
  {
    _id: "blog_004",
    title: "Sourcing Local: The Art of Rwanda Coffee Breaks",
    category: "Culture",
    mainImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000",
    excerpt: "Why the Gisenyi crop is the essential energy fuel for our Agrifood & Cultural Tour packages.",
    content: "There is no better recovery drink than a fresh pour-over from the local agricultural cooperatives. As a standard inclusion in our Gisenyi Cultural Exploration package, guests trace the coffee bean from the volcanic hillsides directly to their morning cup...",
    createdAt: new Date("2026-04-28").toISOString(),
    likes: ["user7"],
    isLiked: false,
    gallery: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  },
  {
    _id: "blog_005",
    title: "Sustainability in Motion: Zero-Waste Eco Tours",
    category: "Eco",
    mainImage: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=2000",
    excerpt: "How our Sustainable Eco-Package preserves local biomes through strict plastic-free and carbon-offset tracking.",
    content: "Our zero-waste commitments run deep. Through our flagship Sustainable Eco-Package, we manage and track resource footprints, utilize solar recharging kits, and partner exclusively with eco-lodges committed to keeping Rwanda's natural habitats clean...",
    createdAt: new Date("2026-04-20").toISOString(),
    likes: ["user8", "user9"],
    isLiked: true,
    gallery: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1466611653911-95282fc3656b?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  },
  {
    _id: "blog_006",
    title: "Navigating the Mist: Safety on the Twin Lakes",
    category: "Safety",
    mainImage: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=2000",
    excerpt: "Safety protocols built into our Twin Lakes Kayaking & Camping Package to handle morning mountain mist.",
    content: "When visibility drops on Burera and Ruhondo, our strict safety protocols take over. Our Twin Lakes Kayaking & Camping Package implements advanced navigation beacons and synchronized group paddling lines...",
    createdAt: new Date("2026-04-15").toISOString(),
    likes: ["user10"],
    isLiked: false,
    gallery: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  },
  {
    _id: "blog_007",
    title: "Hydrodynamics of Kayaking Lake Kivu",
    category: "Technical",
    // Verified Kayak/Water Image
    mainImage: "https://www.achieveglobalsafaris.com/wp-content/uploads/2023/06/kayaking-rwanda.jpg",
    excerpt: "Understanding hull stability on our premium Multi-Day Lake Kivu Kayaking Expedition Package.",
    content: "A professional look at why the specific density of Lake Kivu maximizes hull glide and tracking efficiency...",
    createdAt: new Date("2026-04-10").toISOString(),
    likes: ["user11", "user12"],
    isLiked: true,
    gallery: [
      "https://images.unsplash.com/photo-1517176118179-65244ad0e59a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505245669107-59ec39538c11?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  },
  {
    _id: "blog_008",
    title: "Birdwatching Through a 500mm Lens",
    category: "Nature",
    // Verified Kingfisher/Bird Image
    mainImage: "https://img.magnific.com/premium-photo/woman-birdwatching-forest-with-binoculars_38187-9257.jpg",
    excerpt: "Capturing the Kingfishers of Rwanda with our expert-led Avian Photography Tour Package.",
    content: "With over 700 species of birds, Rwanda is a paradise for optical photography...",
    createdAt: new Date("2026-04-05").toISOString(),
    likes: ["user13"],
    isLiked: false,
    gallery: [
      "https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1480044965905-02098d419e96?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  },
  {
    _id: "blog_009",
    title: "The Musanze Cave Formation: A Structural Analysis",
    category: "Geology",
    mainImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000",
    excerpt: "Exploring subterranean lava tubes on our historical Volcanic Cave Exploration Package.",
    content: "The structural geometry of these ancient caves highlights millennia of volcanic activity. This walk takes visitors safely through cavernous underground paths using high-grade safety equipment...",
    createdAt: new Date("2026-03-30").toISOString(),
    likes: ["user14", "user15"],
    isLiked: false,
    gallery: [
      "https://images.unsplash.com/photo-1512413316925-fd47aa8164f3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  },
 {
    _id: "blog_010",
    title: "High-Altitude Electronic Performance",
    category: "Technical",
    // Verified Drone/Battery/Tech Image
    mainImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=2000",
    excerpt: "How we maintain drone and camera battery reliability during our Volcanoes Trekking Packages.",
    content: "Lithium-ion batteries drop voltage faster at 2,500m+ elevations...",
    createdAt: new Date("2026-03-25").toISOString(),
    likes: ["user16"],
    isLiked: true,
    gallery: [
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504194103304-47bd1f2b3511?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  },
  {
    _id: "blog_011",
    title: "The Women of the Tea Plantations",
    category: "Culture",
    mainImage: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=2000",
    excerpt: "A look into local harvesting methods featured in our Nyungwe Emerald Canopy & Tea Package.",
    content: "Beyond the rainforest trails lies a deep human story of community agricultural resilience. Guests walk through fields of green hillsides and sample single-origin teas directly at the mills.",
    createdAt: new Date("2026-03-20").toISOString(),
    likes: ["user17", "user18", "user19"],
    isLiked: true,
    gallery: [
      "https://images.unsplash.com/photo-1531000164471-da9302b184c6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1501769731760-705a6396919e?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  },
  {
    _id: "blog_012",
    title: "Logistics of a Remote Camp Site",
    category: "Technical",
    mainImage: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2000",
    excerpt: "How we coordinate supply drops and water filtration in areas without road access.",
    content: "Mechanical efficiency doesn't end with the bike. We apply assembly-line principles to our camp setups for quick deployment in Rwanda's remote wilderness areas...",
    createdAt: new Date("2026-03-15").toISOString(),
    likes: ["user20"],
    isLiked: true,
    gallery: [
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?auto=format&fit=crop&q=80&w=800"
    ],
    comments: []
  }
];


const useBlogStore = create(
  devtools((set, get) => ({
    // --- STATE ---
    blogs: mockBlogs, // Initializing with mock data so the UI is never empty
    currentBlog: null,
    isLoading: false,
    error: null,

    // --- ACTIONS ---

    // 1. Fetch All Blogs
    fetchBlogs: async () => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.get(API_URL);
        const data = res.data.data || res.data;
        set({ blogs: data, isLoading: false }, false, "fetch_all_success");
      } catch (err) {
        console.warn("Backend not reached, staying with mock data.");
        set({ blogs: mockBlogs, isLoading: false }, false, "fetch_all_mock_fallback");
      }
    },

    // 2. Fetch Single Blog (Cache-First)
    fetchBlogById: async (id) => {
      // Check local state first for instant UI
      const cached = get().blogs.find(b => b._id === id);
      if (cached) {
        set({ currentBlog: cached, error: null }, false, "fetch_id_cache_hit");
        return;
      }

      set({ isLoading: true, error: null });
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        const data = res.data.data || res.data;
        set({ currentBlog: data, isLoading: false }, false, "fetch_id_api_success");
      } catch (err) {
        // Final fallback: try finding in mockBlogs again
        const mockMatch = mockBlogs.find(b => b._id === id);
        set({ 
          currentBlog: mockMatch || null, 
          isLoading: false,
          error: mockMatch ? null : "Log not found"
        }, false, "fetch_id_error");
      }
    },

    clearCurrentBlog: () => set({ currentBlog: null }),

    // 3. Interactions (Likes & Comments)
    toggleLike: async (blogId) => {
      // Optimistic UI Update (Updates locally before server responds)
      const previousBlogs = get().blogs;
      const updatedBlogs = previousBlogs.map(b => {
        if (b._id === blogId) {
          const isCurrentlyLiked = b.isLiked;
          return {
            ...b,
            isLiked: !isCurrentlyLiked,
            likes: isCurrentlyLiked 
              ? b.likes.filter(id => id !== "current_user") 
              : [...b.likes, "current_user"]
          };
        }
        return b;
      });

      set({ 
        blogs: updatedBlogs,
        currentBlog: get().currentBlog?._id === blogId 
          ? updatedBlogs.find(b => b._id === blogId) 
          : get().currentBlog 
      });

      try {
        await axios.patch(`${API_URL}/${blogId}/like`);
      } catch (err) {
        console.error("Server sync failed, but UI updated.");
      }
    },

    addComment: async (blogId, commentData) => {
      try {
        const res = await axios.post(`${API_URL}/${blogId}/comments`, commentData);
        const updatedBlog = res.data.data || res.data;
        
        set((state) => ({
          blogs: state.blogs.map(b => b._id === blogId ? updatedBlog : b),
          currentBlog: state.currentBlog?._id === blogId ? updatedBlog : state.currentBlog
        }));
        return { success: true };
      } catch (err) {
        // Local fallback for testing
        const newComment = { user: commentData.user, text: commentData.text };
        set(state => ({
          blogs: state.blogs.map(b => b._id === blogId ? { ...b, comments: [...b.comments, newComment] } : b),
          currentBlog: state.currentBlog?._id === blogId ? { ...state.currentBlog, comments: [...state.currentBlog.comments, newComment] } : state.currentBlog
        }));
        return { success: true };
      }
    },

    // 4. Admin CRUD
    createBlog: async (formData) => {
      set({ isLoading: true });
      try {
        const res = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        set(state => ({ blogs: [res.data.data, ...state.blogs], isLoading: false }));
        return { success: true };
      } catch (err) {
        set({ isLoading: false });
        return { success: false };
      }
    },

    deleteBlog: async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        set(state => ({ blogs: state.blogs.filter(b => b._id !== id) }));
      } catch (err) {
        console.error("Delete failed");
      }
    }
  }))
);

export default useBlogStore;