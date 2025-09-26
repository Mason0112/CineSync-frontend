// src/api/apiClient.ts

import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
import { useAuthStore } from './stores/authStore';

// 接下來的程式碼保持不變
const apiClient: AxiosInstance = axios.create({
  // baseURL: '/api',
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');

    // **Solution:** Check if headers exist before trying to modify them
    if (token && config.headers) {
      // Add the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('發送請求：', config.url);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('接收到回應：', response.status);
    return response;
  },
  (error: AxiosError) => {
      if (error.response && [401, 403].includes(error.response.status)) {
      console.log('Authentication error, logging out...');
      
      // 取得 Zustand store 的 logout action
      // 注意：在 React 元件之外，要用 .getState() 來取得 state 和 actions
      const { logout } = useAuthStore.getState();

      // 執行登出邏輯 (清除 token, 更新 state)
      logout();
      
      // 跳轉到登入頁面
      // 使用 window.location.href 會觸發頁面刷新，可以清除所有殘留的狀態
      // 這通常是在這種情境下最安全的做法
      window.location.href = '/login'; 
    }
    
    // 將錯誤繼續拋出，以便呼叫 API 的地方可以進行自己的錯誤處理
    return Promise.reject(error);
  }
);

export default apiClient;