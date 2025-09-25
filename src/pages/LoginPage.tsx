import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import apiClient from "../apiClient";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { type UserLoginRequest, type LoginResponse } from "../types/users";
import { useAuthStore } from '../stores/authStore';

export const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // 取得 navigate 函式
  const login = useAuthStore((state) => state.login);
  const handleLogin = async (formData: UserLoginRequest) => {
    setError(null);
    setLoading(true);

    try {
      const response = await apiClient.post<LoginResponse>(
        "/auth/login",
        formData
      );

      const token = response.data.token;
      console.log(response.data)
      const loginName = response.data.users.userName; // 假設後端回傳的欄位名稱是 userName
      if (token) {
        login(token, loginName);
        console.log("登入成功！Token 已儲存:", token);
        console.log("登入成功！userName 已儲存:", loginName);
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
        console.error(err);
        setError("發生未知錯誤，可能為網路問題");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <LoginForm onLogin={handleLogin} isLoading={loading} error={error} />
    </div>
  );
};
