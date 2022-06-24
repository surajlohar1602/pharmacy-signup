import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
