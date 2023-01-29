import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import QuizQuestions from "./components/QuizQuestions";
import Quiz from "./components/Quiz";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("user") && user !== null) {
      setUser(localStorage.getItem("user"));
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [localStorage.getItem("user")]);
  console.log(user);
  if (loading) {
    return "loading";
  }
  return (
    <div className="App max-h-screen overflow-auto bg-cyan-300">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/quiz" /> : <Login />}
          />

          <Route
            path="/create-quiz"
            element={user ? <QuizQuestions /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
