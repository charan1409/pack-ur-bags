import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Dropdown from "./Dropdown";
import { navItems } from "./NavItems";

const Header = (props) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="header">
      <div id="menu-bar" className="fas fa-bars"></div>

      <Link to="/index" className="logo">
        <span>P</span>ACK <span>U</span>R <span>B</span>AGS
      </Link>
      <ul className="navbar">
        {navItems.map((item) => {
          return (
            <li key={item.id} className={item.cName}>
              <HashLink to={item.path}>{item.title}</HashLink>
            </li>
          );
        })}
        {/* {props.user ? <Link to="/index">Home</Link> : <Link to="/">Home</Link>}
        <a href="#home">Home</a>
        <Link to="#gallery">Gallery</Link>
        <Link to="#places">Places</Link>
        <Link to="#about">About</Link>
        <Link to="#services">Services</Link>
        <Link to="#review">Reviews</Link>
        <Link to="#footer">Footer</Link> */}
      </ul>
      <div className="icons">
        {props.user ? (
          <div
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <i className="fa fa-user" aria-hidden="true" id="login-btn"></i>
            {dropdown && <Dropdown />}
          </div>
        ) : (
          <i
            className="fa fa-user"
            aria-hidden="true"
            id="login-btn"
            onClick={props.openLoginForm}
          ></i>
        )}
      </div>
    </div>
  );
};

export default Header;
