import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import apiClient from "../apiClient";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { type UserLoginRequest, type LoginResponse } from "../types/users";
import { useAuth } from '../contexts/AuthContext'; // 1. 匯入 useAuth

export const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // 取得 navigate 函式
  const { login } = useAuth(); // 2. 從 context 取得 login 函式

  const handleLogin = async (formData: UserLoginRequest) => {
    setError(null);
    setLoading(true);

    try {
      const response = await apiClient.post<LoginResponse>(
        "/auth/login",
        formData
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        login(token);
        console.log("登入成功！Token 已儲存:", token);
        navigate("/");
      } else {
        setError("登入失敗：未取得 token。");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || err.message || "發生未知錯誤";
        setError(`登入失敗：${errorMessage}`);
      } else {
        setError("發生未知錯誤，可能為網路問題");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <h1 className="page-title">使用者登入</h1>
      <LoginForm onLogin={handleLogin} isLoading={loading} error={error} />
    </div>
  );
};
