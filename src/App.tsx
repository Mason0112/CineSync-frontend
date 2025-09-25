import { Routes, Route} from "react-router-dom"; // 匯入路由元件
import "./App.css";
import { HomePage } from "./pages/HomePage";
import TopBar from "./components/TopBar";
import { RegisterPage } from "./pages/RegisterPage";


function App() {
  return (
    <div className="App">
      <TopBar/>
       <Routes>

        {/* 當 URL 為 "/" 時，渲染 TodoListPage */}
        <Route path="/" element={<HomePage />} />
        {/* 當 URL 為 "/register" 時，渲染 RegisterPage */}
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
    </div>
  );
}

export default App;