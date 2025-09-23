import React from 'react';
import './TopBar.css';
import logo from '../images/logo.png';

// 步驟 1: 定義 Props 的型別
// 我們定義 title 是一個可選的 (optional) string 型別，所以後面加上 '?'
interface TopBarProps {
  title?: string;
}

// 步驟 2: 將元件標註為 React.FC (Functional Component)，並傳入 Props 型別
// React.FC 是一個泛型，<TopBarProps> 就是它的型別參數
const TopBar: React.FC<TopBarProps> = ({ title }) => {
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
        {/* 在 TSX 中，建議使用 react-router-dom 的 <Link> 元件取代 <a> */}
        {/* 這裡暫時仍用 <a> 作為範例 */}
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