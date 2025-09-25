import { Routes, Route } from "react-router-dom"; // 匯入路由元件
import "./App.css";
import { HomePage } from "./pages/HomePage";
import TopBar from "./components/TopBar";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <TopBar />
        <Routes>
          {/* 當 URL 為 "/" 時，渲染 TodoListPage */}
          <Route path="/" element={<HomePage />} />
          {/* 當 URL 為 "/register" 時，渲染 RegisterPage */}
          <Route path="/register" element={<RegisterPage />} />
          {/* 當 URL 為 "/login" 時，渲染 LoginPage */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
