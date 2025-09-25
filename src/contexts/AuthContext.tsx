import { createContext, useState, useContext, type ReactNode, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 定義 Context 要存放的資料結構
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// 建立 Context，並給予一個初始的 undefined 值
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 建立一個 Provider 元件，它將包含所有狀態管理的邏輯
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));

  // 登入函式
  const login = useCallback((token: string) => {
    // 1. 將 token 存入 localStorage
    localStorage.setItem('authToken', token);
    // 2. 更新 state，這將會觸發所有使用此 context 的元件重新渲染
    setIsLoggedIn(true);
    // 3. 導航到首頁或其他登入後頁面
    navigate('/');
  }, [navigate]);

  // 登出函式
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  }, [navigate]);

  // 使用 useMemo 來避免不必要的重新渲染
  const value = useMemo(() => ({
    isLoggedIn,
    login,
    logout,
  }), [isLoggedIn, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 建立一個自訂的 Hook，讓其他元件可以方便地使用這個 context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};