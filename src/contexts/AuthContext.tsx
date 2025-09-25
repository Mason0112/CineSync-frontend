import { createContext, useState, useContext, type ReactNode, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 定義 Context 要存放的資料結構
interface AuthContextType {
  isLoggedIn: boolean;
  userName: string | null;
  login: (token: string, userName?: string) => void;
  logout: () => void;
}

// 建立 Context，並給予一個初始的 undefined 值
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 建立一個 Provider 元件，它將包含所有狀態管理的邏輯
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));
  const [userName, setUserName] = useState<string | null>(() => localStorage.getItem('userName'));

  // 登入函式
const login = useCallback((token: string, userName?: string) => {
  const nameToStore = userName || null; // 統一為 null
  localStorage.setItem('authToken', token);
  
  if (nameToStore) {
    localStorage.setItem('userName', nameToStore);
  } else {
    localStorage.removeItem('userName');
  }

  setIsLoggedIn(true);
  setUserName(nameToStore); // <-- 關鍵修正！
  navigate('/');
}, [navigate]);

  // 登出函式
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setUserName(null);
    setIsLoggedIn(false);
    navigate('/');
  }, [navigate]);


  // 使用 useMemo 來避免不必要的重新渲染
  const value = useMemo(() => ({
    isLoggedIn,
    userName,
    login,
    logout,
  }), [isLoggedIn, userName, login, logout]);

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