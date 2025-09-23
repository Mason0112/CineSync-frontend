import React from 'react';
import './TopBar.css';
import logo from '../images/logo.png';


const TopBar: React.FC = () => {
  return (
    <nav className="topbar">
      {/* Logo 區 */}
      <div className="topbar-logo">
        <a href="/">
          <img src={logo} alt="Website Logo" />
        </a>
      </div>

      {/* 導航連結區 */}
      <ul className="topbar-nav">
        <li><a href="/">首頁</a></li>
        <li><a href="/about">關於我們</a></li>
        <li><a href="/products">產品</a></li>
      </ul>

      {/* 使用者功能區 */}
      <div className="topbar-actions">
        <button className="login-button">登入</button>
      </div>
    </nav>
  );
};

export default TopBar;