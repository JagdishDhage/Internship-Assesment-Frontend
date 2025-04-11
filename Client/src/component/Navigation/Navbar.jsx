import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IoBookSharp } from "react-icons/io5";
import Cookies from "js-cookie"; // Import the js-cookie library

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if user is logged in
  useEffect(() => {
    // Check for token in cookies
    const token = Cookies.get('auth');
    
    
    
    setIsLoggedIn(!!token);
  }, []);

  // This useEffect will log the updated state after it changes


  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-text">LearnNotes <IoBookSharp /></span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          <div className={`menu-icon ${menuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Navigation links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/subjects"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Subjects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/university"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              University
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/upload"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Upload
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
        </ul>

        {/* Action buttons - only show if not logged in */}
        {!isLoggedIn ? (
          <div className="navbar-actions">
            <button className="btn-login">
              <Link to="/login">Login</Link>
            </button>
            <button className="btn-signup">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        ) : (
          <div className="navbar-actions">
            <button className="btn-profile">
              <Link to="/profile">My Profile</Link>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;