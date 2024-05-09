import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main/main";
import Header from "./components/header/header";
function App() {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import
