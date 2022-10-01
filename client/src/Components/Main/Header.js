import React from "react";
import "./main.css";

const Header = () => {
  return (
    <div className="header">
      <div id="menu-bar" className="fas fa-bars"></div>

      <a href="/" className="logo">
        <span>P</span>ACK <span>U</span>R <span>B</span>AGS
      </a>
      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#gallery">Gallery</a>
        <a href="#places">Places</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#review">Reviews</a>
        <a href="#footer">Footer</a>
      </nav>
      <div className="icons">
        <i className="fas fa-search" id="search-btn"></i>
        <a href="login">
          <i className="fa fa-user" aria-hidden="true" id="login-btn"></i>
        </a>
      </div>
      <form action="" className="search-bar-container">
        <input type="search" id="search-bar" placeholder="Search here.." />
        <label htmlFor="search-bar" className="fas fa-search"></label>
      </form>
    </div>
  );
};

export default Header;
