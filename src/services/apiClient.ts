import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const requestUrl = error.config?.url || '';
    const isAuthEndpoint = requestUrl.startsWith('/api/auth/');
    const isAlreadyOnLogin = window.location.pathname === '/login';
    const hadToken = !!localStorage.getItem('accessToken');

    if (error.response?.status === 401 && !isAuthEndpoint && !isAlreadyOnLogin && hadToken) {
      // Clear tokens and redirect to login only when session expires mid-session
      // (i.e., user had a token but the server rejected it — not for guest/public API calls)
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
