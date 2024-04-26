import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main/main";
import ArticleDetail from "./pages/article/article";
function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/article/:id" element={<ArticleDetail />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

// import
