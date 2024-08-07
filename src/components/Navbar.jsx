import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/classes">
            Classes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/enrolled-classes">
            Enrolled Classes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/withdraw">
            Withdraw Request
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
