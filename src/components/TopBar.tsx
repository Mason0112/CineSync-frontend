import { useState } from 'react'; // 1. 匯入 useState
import './TopBar.css';
import logo from '../images/logo.png';
// 2. 匯入 Link 和 useNavigate
import { Link, useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  // 3. 使用 useState 管理登入狀態
  //    - 這裡使用一個函式來初始化 state，這能確保檢查 localStorage 的行為只在元件首次渲染時執行一次。
  //    - !!localStorage.getItem('authToken') 是一個技巧：
  //      - getItem 如果找不到會回傳 null。
  //      - 第一個 ! 將 null 轉成 true。
  //      - 第二個 ! 將 true 轉成 false。
  //      - 如果找到 token (一個字串)，第一個 ! 將字串轉成 false，第二個 ! 再轉成 true。
  //      - 最終效果：有 token 就是 true，沒有就是 false。
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));

  // 登出處理函式
  const handleLogout = () => {
    // 1. 從 localStorage 移除 token
    localStorage.removeItem('authToken');
    // 2. 更新元件的 state，觸發重新渲染
    setIsLoggedIn(false);
    // 3. 導航回首頁
    navigate('/');
    // 4. (可選) 重新載入頁面以確保所有狀態被清除
    // window.location.reload(); 
  };

  // 登入/註冊按鈕的導航函式
  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/register');

  return (
    <nav className="topbar">
      {/* Logo 區 - 已修正為 Link */}
      <div className="topbar-logo">
        <Link to="/">
          <img src={logo} alt="Website Logo" />
        </Link>
      </div>

      <ul className="topbar-nav">
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/about">關於我們</Link></li>
        <li><Link to="/products">產品</Link></li>
      </ul>

      {/* 使用者功能區 - 根據 isLoggedIn 狀態顯示不同內容 */}
      <div className="topbar-actions">
        {isLoggedIn ? (
          // 如果已登入，顯示登出按鈕
          <button className="login-button" onClick={handleLogout}>
            登出
          </button>
        ) : (
          // 如果未登入，顯示註冊和登入按鈕
          // 使用 <> </> (Fragment) 來包裹多個元素
          <>
            <button className="login-button" onClick={handleRegisterClick}>
              註冊
            </button>
            <button className="login-button" onClick={handleLoginClick}>
              登入
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopBar;