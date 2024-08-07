import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Classes from "./components/Classes";
import EnrolledClasses from "./components/EnrolledClassses";
import WithdrawalRequestForm from "./components/withdrawRequest";
import Navbar from "./components/Navbar";
import "./App.css"; // Optional, for general app styling

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <NavbarWithConditionalRendering isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route
          path="/register"
          element={<Register onRegister={() => setIsLoggedIn(true)} />}
        />
        <Route path="/classes" element={<Classes />} />
        <Route path="/enrolled-classes" element={<EnrolledClasses />} />
        <Route path="/withdraw" element={<WithdrawalRequestForm />} />
      </Routes>
    </Router>
  );
};

// Component to handle conditional Navbar rendering
const NavbarWithConditionalRendering = ({ isLoggedIn }) => {
  const location = useLocation();

  // Determine if Navbar should be displayed based on the current path
  const shouldShowNavbar =
    isLoggedIn && !["/", "/register"].includes(location.pathname);

  return shouldShowNavbar ? <Navbar /> : null;
};

export default App;
