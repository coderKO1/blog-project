import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import "../styles/Navbar.css";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onDashboard = location.pathname === "/dashboard";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
     <div className="nav-left">
  <img src="/assets/my-logo.png" alt="Logo" className="logo" />
  <h1>The Blog</h1>
</div>

      {/* Hamburger Menu}
      <button className="hamburger-btn" onClick={toggleMenu}>
        ☰
      </button>

      {/* Navigation */}
      {user ? (
        <div className={`nav-right ${isMenuOpen ? "open" : ""}`}>
          {!onDashboard && (
            <Link to="/dashboard" className="home-btn">
              Dashboard
            </Link>
          )}
          <div className="profile-section">
            <p className="user-name">Welcome {user.firstName}</p>
            {onDashboard && (
              <Link to="/" className="home-btn black-btn">
                Home
              </Link>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
