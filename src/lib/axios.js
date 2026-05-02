import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const API_BASE = "https://kivu-back-end.onrender.com/api";

const axiosInstance = axios.create({ baseURL: API_BASE });

// Automatically attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;