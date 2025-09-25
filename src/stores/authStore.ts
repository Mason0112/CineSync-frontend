// src/stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 1. 定義 Store 的狀態和 Actions 的 TypeScript interface
interface AuthState {
  isLoggedIn: boolean;
  userName: string | null;
  // 注意：這裡的 actions 不再需要 navigate 作為參數
  login: (token: string, userName?: string) => void;
  logout: () => void;
}

// 2. 建立 Store
export const useAuthStore = create<AuthState>()(
  // 3. 使用 persist middleware 來自動處理 localStorage
  persist(
    // `set` 函式用來更新狀態
    (set) => ({
      // 初始狀態
      isLoggedIn: !!localStorage.getItem('authToken'), // 仍然可以從 localStorage 讀取初始值
      userName: localStorage.getItem('userName'),

      // 登入 Action
      login: (token: string, userName?: string) => {
        const nameToStore = userName || null;

        // 手動操作 authToken，因為我們不想把 token 本身存在 Zustand state 中
        localStorage.setItem('authToken', token);
        
        // 使用 set 來更新 Zustand 的狀態
        // persist middleware 會自動將更新後的 state (isLoggedIn, userName) 保存到 localStorage
        set({
          isLoggedIn: true,
          userName: nameToStore,
        });
      },

      // 登出 Action
      logout: () => {
        // 手動清除 authToken
        localStorage.removeItem('authToken');
        
        // 更新狀態，persist middleware 會自動清除 localStorage 中對應的資料
        set({
          isLoggedIn: false,
          userName: null,
        });
      },
    }),
    {
      // persist 的設定
      name: 'auth-storage', // localStorage 中的 key
      storage: createJSONStorage(() => localStorage), // 指定使用 localStorage
      // partialize 讓我們可以選擇只保存部份 state 到 localStorage
      // 在這個例子中，我們只需要保存 isLoggedIn 和 userName
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userName: state.userName,
      }),
    }
  )
);