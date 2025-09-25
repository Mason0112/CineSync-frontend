// TopBar.tsx

import "./TopBar.css";
import logo from "../images/BigLogo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const TopBar = () => {
  const { isLoggedIn, logout, userName } = useAuth();

  return (
    <nav className="topbar">
      {/* Logo 和導航連結 (維持不變) */}
      <div className="topbar-logo">
        <Link to="/">
          <img src={logo} alt="Website Logo" />
        </Link>
      </div>
      <div className="topbar-nav">
        <ul>
          <li>
            <Link to="/">首頁</Link>
          </li>
          <li>
            <Link to="/about">關於我們</Link>
          </li>
          <li>
            <Link to="/products">產品</Link>
          </li>
        </ul>
      </div>

      {/* 使用者功能區 - 套用新的 CSS class */}
      <div className="topbar-actions">
        {isLoggedIn ? (
          // 如果已登入，顯示登出按鈕
          <>
            <span>歡迎回來，{userName}！</span>
            <button
              className="button button-logout" // 套用登出按鈕樣式
              onClick={logout}
            >
              登出
            </button>
          </>
        ) : (
          // 如果未登入，顯示註冊和登入按鈕
          <>
            <Link
              to="/login"
              className="button button-secondary" // 次要按鈕 (描邊)
            >
              登入
            </Link>
            <Link
              to="/register"
              className="button button-primary" // 主要按鈕 (填滿)
            >
              註冊
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
