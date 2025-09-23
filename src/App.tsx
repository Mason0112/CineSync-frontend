import { Routes, Route} from "react-router-dom"; // 匯入路由元件
import "./App.css";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <div className="App">
       <Routes>
        {/* 當 URL 為 "/" 時，渲染 TodoListPage */}
        <Route path="/" element={<HomePage />} />
  
      </Routes>
    </div>
  );
}

export default App;