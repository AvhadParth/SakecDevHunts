import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5050/api'
});

API.interceptors.request.use((config) => {
  const raw = localStorage.getItem('sakec_token');
  if (raw) config.headers.Authorization = 'Bearer ' + raw;
  return config;
});

export default API;
