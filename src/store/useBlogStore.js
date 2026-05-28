import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "../lib/axios";
import { toast } from "react-toastify";
// 1. Import your Auth Store to extract the unencrypted in-memory token safely
import useAuthStore from "./useAuthStore"; 

const API_URL = "/blogs";

const getOrInitializeClientId = () => {
  let clientId = localStorage.getItem("kivu_anonymous_client_id");
  if (!clientId) {
    clientId = `client_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
    localStorage.setItem("kivu_anonymous_client_id", clientId);
  }
  return clientId;
};

// 2. Updated to read the decrypted token instantly from Zustand memory space
const getAuthHeaders = (isMultipart = false) => {
  const token = useAuthStore.getState().token; 
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
    },
  };
};

const useBlogStore = create(
  devtools((set, get) => ({
    // --- STATE ---
    blogs: [],
    currentBlog: null,
    isLoading: false,
    error: null,

    // --- ACTIONS ---

    fetchBlogs: async () => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.get(API_URL);
        const data = res.data.data || res.data;
        const parsedBlogs = Array.isArray(data) ? data : data.blogs || [];
        
        const clientId = getOrInitializeClientId();

        const synchronizedBlogs = parsedBlogs.map((blog) => ({
          ...blog,
          likes: Array.isArray(blog.likes) ? blog.likes : [],
          isLiked: Array.isArray(blog.likes) ? blog.likes.includes(clientId) : false,
        }));

        set({ blogs: synchronizedBlogs, isLoading: false }, false, "fetch_all_success");
      } catch (err) {
        console.error("Error connecting to live blogs API endpoints:", err.message);
        set(
          {
            blogs: [],
            isLoading: false,
            error: "Failed to fetch articles from live network infrastructure.",
          },
          false,
          "fetch_all_failure"
        );
      }
    },

    fetchBlogById: async (id) => {
      const cached = get().blogs.find((b) => b._id === id);
      if (cached) {
        set({ currentBlog: cached, error: null }, false, "fetch_id_cache_hit");
        return;
      }

      set({ isLoading: true, error: null });
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        const data = res.data.data || res.data;
        
        const clientId = getOrInitializeClientId();
        const singleBlogData = {
          ...data,
          likes: Array.isArray(data.likes) ? data.likes : [],
          isLiked: Array.isArray(data.likes) ? data.likes.includes(clientId) : false,
        };

        set({ currentBlog: singleBlogData, isLoading: false }, false, "fetch_id_api_success");
      } catch (err) {
        set(
          {
            currentBlog: null,
            isLoading: false,
            error: "Requested article could not be resolved from cloud indexes.",
          },
          false,
          "fetch_id_error"
        );
      }
    },

    clearCurrentBlog: () => set({ currentBlog: null }),

    toggleLike: async (blogId) => {
      const previousBlogs = get().blogs;
      const previousCurrentBlog = get().currentBlog;
      const clientId = getOrInitializeClientId();

      const updatedBlogs = previousBlogs.map((b) => {
        if (b._id === blogId) {
          const currentLikesArray = Array.isArray(b.likes) ? b.likes : [];
          const isCurrentlyLiked = currentLikesArray.includes(clientId);
          return {
            ...b,
            isLiked: !isCurrentlyLiked,
            likes: isCurrentlyLiked
              ? currentLikesArray.filter((id) => id !== clientId)
              : [...currentLikesArray, clientId],
          };
        }
        return b;
      });

      set(
        {
          blogs: updatedBlogs,
          currentBlog: previousCurrentBlog?._id === blogId
            ? updatedBlogs.find((b) => b._id === blogId)
            : previousCurrentBlog,
        },
        false,
        "like_optimistic"
      );

      try {
        const res = await axios.post(`${API_URL}/${blogId}/toggle-like`, { clientId });
        const serverResponse = res.data; 

        set((state) => {
          const reconcileTargetBlog = (blog) => ({
            ...blog,
            likes: Array.isArray(serverResponse.likes) ? serverResponse.likes : blog.likes,
            isLiked: Array.isArray(serverResponse.likes) ? serverResponse.likes.includes(clientId) : false,
          });
          return {
            blogs: state.blogs.map((b) => (b._id === blogId ? reconcileTargetBlog(b) : b)),
            currentBlog: state.currentBlog?._id === blogId ? reconcileTargetBlog(state.currentBlog) : state.currentBlog,
          };
        }, false, "like_server_sync");

      } catch (err) {
        console.error(
          "❌ Backend Like Validation Error Response:",
          err.response?.data?.message || err.response?.data || err.message
        );
        toast.error(err.message);
        
        set(
          {
            blogs: previousBlogs,
            currentBlog: previousCurrentBlog,
          },
          false,
          "like_rollback"
        );
      }
    },

    addComment: async (blogId, commentPayload) => {
      const previousBlogs = get().blogs;
      const previousCurrentBlog = get().currentBlog;

      const tempComment = {
        _id: `temp_${Date.now()}`,
        user: commentPayload.user || "Anonymous Rider",
        text: commentPayload.text,
        createdAt: new Date().toISOString(),
      };

      const appendCommentLocal = (blog) => ({
        ...blog,
        comments: [...(blog.comments || []), tempComment],
      });

      set(
        {
          blogs: previousBlogs.map((b) => (b._id === blogId ? appendCommentLocal(b) : b)),
          currentBlog: previousCurrentBlog?._id === blogId ? appendCommentLocal(previousCurrentBlog) : previousCurrentBlog,
        },
        false,
        "comment_optimistic"
      );
      try {
        const res = await axios.post(`${API_URL}/${blogId}/comments`, commentPayload);
        const updatedBlogFromServer = res.data.data || res.data;
        
        const clientId = getOrInitializeClientId();
        const synchronizedBlog = {
          ...updatedBlogFromServer,
          isLiked: Array.isArray(updatedBlogFromServer.likes) ? updatedBlogFromServer.likes.includes(clientId) : false,
        };

        set((state) => ({
          blogs: state.blogs.map((b) => (b._id === blogId ? synchronizedBlog : b)),
          currentBlog: state.currentBlog?._id === blogId ? synchronizedBlog : state.currentBlog,
        }), false, "comment_server_sync");
      } catch (err) {
        console.error("Comment ingestion pipeline dropped on server cluster:", err.message);
        toast.error("Fail to add comment");
        set(
          {
            blogs: previousBlogs,
            currentBlog: previousCurrentBlog,
          },
          false,
          "comment_rollback"
        );
      }
    },

    createBlog: async (formData) => {
      set({ isLoading: true });
      try {
        const res = await axios.post(API_URL, formData, getAuthHeaders(true));
        const newBlog = res.data.data || res.data;

        set(
          (state) => ({
            blogs: [newBlog, ...state.blogs],
            isLoading: false,
          }),
          false,
          "create_blog_success"
        );
        toast.info("Blog created successfully");
        return { success: true };
      } catch (err) {
        set({ isLoading: false });
        return {
          success: false,
          error: err.response?.data?.message || err.message,
        };
      }
    },

    updateBlog: async (id, formData) => {
      set({ isLoading: true });
      try {
        const res = await axios.put(`${API_URL}/${id}`, formData, getAuthHeaders(true));
        const updatedBlog = res.data.data || res.data;

        set(
          (state) => ({
            blogs: state.blogs.map((b) => (b._id === id ? updatedBlog : b)),
            currentBlog: get().currentBlog?._id === id ? updatedBlog : get().currentBlog,
            isLoading: false,
          }),
          false,
          "update_blog_success"
        );
        toast.success("You have successfully Updated blog");
        return { success: true };
      } catch (err) {
        set({ isLoading: false });
        toast.error("You failed to Update blog");
        return {
          success: false,
          error: err.response?.data?.message || err.message,
        };
      }
    },

    deleteBlog: async (id) => {
      set({ isLoading: true });
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        set(
          (state) => ({
            blogs: state.blogs.filter((b) => b._id !== id),
            isLoading: false,
          }),
          false,
          "delete_blog_success"
        );
        toast.success("You have successfully deleted blog");
        return { success: true };
      } catch (err) {
        set({ isLoading: false });
        toast.error("Fails to delete blog");
        return {
          success: false,
          error: err.response?.data?.message || err.message,
        };
      }
    },
  }))
);

export default useBlogStore;