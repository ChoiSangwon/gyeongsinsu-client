import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main/main";
import ArticleDetail from "./pages/article/article";
import Board from "./pages/board/board";
import Header from "./components/header/header";
import "./fonts/uhbeese.css";
import MobileMain from "./pages/main/mainMobile";
import MobileBoard from "./pages/board/boardMobile";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={isMobile ? <MobileMain /> : <Main />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route
            path="/board"
            element={isMobile ? <MobileBoard /> : <Board />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import
