import React from "react";
import "./main.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="header">
      <div id="menu-bar" className="fas fa-bars"></div>

      <a href="#home" className="logo">
        <span>P</span>ACK <span>U</span>R <span>B</span>AGS
      </a>
      <nav className="navbar">
        {props.user ? <Link to="/index">Home</Link> : <Link to="/">Home</Link>}
        {/* <a href="#home">Home</a> */}
        <a href="#gallery">Gallery</a>
        <a href="#places">Places</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#review">Reviews</a>
        <a href="#footer">Footer</a>
      </nav>
      <div className="icons">
        <i className="fas fa-search" id="search-btn"></i>
        {props.user ? (
          <Link to="/profile">
            <i className="fa fa-user" aria-hidden="true" id="login-btn"></i>
          </Link>
        ) : (
          <i className="fa fa-user" aria-hidden="true" id="login-btn" onClick={props.openLoginForm}></i>
        )}
        {/* <Link to="login">
          <i className="fa fa-user" aria-hidden="true" id="login-btn"></i>
        </Link> */}
      </div>
      <form action="" className="search-bar-container">
        <input type="search" id="search-bar" placeholder="Search here.." />
        <label htmlFor="search-bar" className="fas fa-search"></label>
      </form>
    </div>
  );
};

export default Header;
