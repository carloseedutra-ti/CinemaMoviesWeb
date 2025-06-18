import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

// Interceptor para token (pode usar variável de ambiente)
//api.interceptors.request.use((config) => {
//  config.headers.Authorization = `Bearer ${import.meta.env.VITE_MDB_API_KEY}`;
//  return config;
//});

export default api;
