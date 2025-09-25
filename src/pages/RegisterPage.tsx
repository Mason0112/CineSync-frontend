import { useState } from "react";
import { RegisterForm } from "../components/RegisterFrom";
import apiClient from "../apiClient";
import axios from "axios";
import { type UserRegisterRequest } from "../types/users";
import { useNavigate } from "react-router-dom";
// 匯入 CSS 檔案，styles 是一個物件
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (formData: UserRegisterRequest) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await apiClient.post("/auth/register", formData);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("登入成功！Token 已儲存:", token);
      } else {
        setError("登入失敗：未取得 token。");
      }

      setSuccess("註冊成功！頁面將在 3 秒後跳轉...");
      console.log("註冊成功:", response.data);

      // 延遲 3 秒後跳轉，讓使用者有時間看到成功訊息
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || err.message || "發生未知錯誤";
        setError(`註冊失敗：${errorMessage}`);
        console.error("註冊錯誤:", err);
      } else {
        setError("發生未知錯誤，可能為網路問題");
        console.error("非 Axios 錯誤:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // 使用 styles 物件來對應 CSS class
    <div className={styles.pageWrapper}>
      <div className={styles.registerPageContainer}>
        <h1 className={styles.pageTitle}>加入我們</h1>

        {/* 傳遞 onRegister 處理函式給子元件 */}
        <RegisterForm onRegister={handleRegister} isLoading={loading} />

        {/* 根據狀態顯示訊息 */}
        {loading && <p className={styles.loadingMessage}>註冊中...</p>}
        {success && <p className={styles.successMessage}>{success}</p>}
        {error && <p className={styles.errorMessagePage}>{error}</p>}
      </div>
    </div>
  );
}
