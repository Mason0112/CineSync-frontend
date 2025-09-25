import { useState, type FormEvent } from "react";
import { type UserRegisterRequest } from "../types/users";
import styles from './RegisterForm.module.css'; 

// 從 props 接收 isLoading 狀態
interface RegisterFormProps {
  onRegister: (formData: UserRegisterRequest) => void;
  isLoading: boolean;
}

export const RegisterForm = ({ onRegister, isLoading }: RegisterFormProps) => {
  const [formData, setFormData] = useState<UserRegisterRequest>({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onRegister(formData); // 直接呼叫 props 傳來的函式
  };

  return (
    // 套用 form 樣式
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* --- 使用者名稱 --- */}
      <div className={styles.formGroup}>
        <label htmlFor="userName" className={styles.label}>
          使用者名稱
        </label>
        <input
          id="userName"
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="請輸入您的名稱"
          required
          className={styles.input}
        />
      </div>

      {/* --- Email --- */}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          電子郵件
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          required
          className={styles.input}
        />
      </div>

      {/* --- 密碼 --- */}
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          密碼
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="請輸入您的密碼"
          required
          className={styles.input}
        />
      </div>

      {/* --- 按鈕 --- */}
      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading} // 當 isLoading 為 true 時禁用按鈕
      >
        {isLoading ? '處理中...' : '註冊'}
      </button>
    </form>
  );
};