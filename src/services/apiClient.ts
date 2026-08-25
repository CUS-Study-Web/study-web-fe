import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import { FILE_SIZE_ERROR_MESSAGE } from '../utils/fileUtils';

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

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 413) {
      if (!error.response.data || typeof error.response.data !== 'object') {
        error.response.data = { message: FILE_SIZE_ERROR_MESSAGE };
      } else {
        error.response.data.message = FILE_SIZE_ERROR_MESSAGE;
      }
      error.message = FILE_SIZE_ERROR_MESSAGE;
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || '';
    const isAuthEndpoint = requestUrl.startsWith('/api/auth/');
    const isAlreadyOnLogin = window.location.pathname === '/login';
    const refreshToken = localStorage.getItem('refreshToken');

    // Nếu lỗi 401, không phải endpoint auth, có refreshToken, và request chưa được retry
    if (error.response?.status === 401 && !isAuthEndpoint && !isAlreadyOnLogin && refreshToken && !originalRequest._retry) {
      if (isRefreshing) {
        // Đang refresh thì đưa request này vào queue chờ
        try {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Sử dụng axios mặc định để không bị loop interceptor của apiClient
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}/api/auth/refresh-token`,
          null,
          {
            headers: {
              'X-Refresh-Token': refreshToken,
            },
          }
        );
        
        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;
        
        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        processQueue(null, newAccessToken);
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Refresh token failed -> clear all and logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Nếu không thoả mãn điều kiện tự refresh hoặc không có refresh token -> logout
    const hadToken = !!localStorage.getItem('accessToken');
    if (error.response?.status === 401 && !isAuthEndpoint && !isAlreadyOnLogin && hadToken) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default apiClient;
