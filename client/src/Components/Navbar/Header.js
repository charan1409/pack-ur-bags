import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Dropdown from "./Dropdown";

const Header = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdown, setDropdown] = useState(false);
  const [path, setpath] = useState("")

  useEffect(()=>{
    if(!user) setpath('/')
    else if(user.role === 'user') setpath("/index")
    else if(user.role === 'admin') setpath("/admin")
  },[setpath,user])
  return (
    <div className="header">
      <div id="menu-bar" className="fas fa-bars"
      onClick = {
        () => {
          document.querySelector("#menu-bar").classList.toggle("fa-times");
          document.querySelector(".navbar").classList.toggle("active");
        }
      }
      ></div>
      <Link to={path} className="logo">
          <span>P</span>ACK <span>U</span>R <span>B</span>AGS
        </Link>
      <ul className="navbar">
        {props.navItems.map((item) => {
          return (
            <li key={item.title} className="nav-item">
              <HashLink to={item.path}
              onClick = {
                () => {
                  document.querySelector("#menu-bar").classList.toggle("fa-times");
                  document.querySelector(".navbar").classList.toggle("active");
                }
              }
              >{item.title}</HashLink>
            </li>
          );
        })}
      </ul>
      <div className="icons">
        {user ? (
          <div className="profdet"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <h2>{user.username}</h2>
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
