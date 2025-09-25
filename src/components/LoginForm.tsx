import { useState, type FormEvent } from "react";
import { type UserLoginRequest } from "../types/users";
import styles from './LoginForm.module.css';

interface LoginFormProps {
  onLogin: (formData: UserLoginRequest) => void;
  isLoading: boolean;
  error?: string | null; 
}

export const LoginForm = ({ onLogin, isLoading, error }: LoginFormProps) => {
  const [formData, setFormData] = useState<UserLoginRequest>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>登入</h2>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>電子郵件:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="you@example.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>密碼:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
};