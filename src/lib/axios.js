import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const API_BASE = "https://kivu-back-end.onrender.com/api";

const axiosInstance = axios.create({ baseURL: API_BASE });

// Request Interceptor: Automatically attaches the clean token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Zustand's middleware has already decrypted this into memory for us!
    const token = useAuthStore.getState().token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Automatically logs out users if their token expires
axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    // Catch token expiration (401) errors from the backend
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Wiping secure local state storage...");
      
      // Clears the state in memory, which automatically encrypts and saves an empty state to disk
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
