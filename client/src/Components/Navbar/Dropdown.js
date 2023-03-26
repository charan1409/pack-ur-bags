import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown(props) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      {props.role === "user" ? (
        <ul
          className={dropdown ? "services-submenu clicked" : "services-submenu"}
          onClick={() => setDropdown(!dropdown)}
        >
          <li>
            <Link
              to="/profile"
              className="submenu-item"
              onClick={() => setDropdown(false)}
            >
              Profile
            </Link>
            <Link
              to="/mytours"
              className="submenu-item"
              onClick={() => setDropdown(false)}
            >
              cart
            </Link>
            <Link
              to="/transactions"
              className="submenu-item"
              onClick={() => setDropdown(false)}
            >
              My tours
            </Link>
            <Link
              to="/"
              className="submenu-item"
              onClick={() => {
                localStorage.removeItem("user");
                setDropdown(false);
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <>
          <ul
            className={
              dropdown ? "services-submenu clicked" : "services-submenu"
            }
            onClick={() => setDropdown(!dropdown)}
          >
            <li>
              <Link
                to="/"
                className="submenu-item"
                onClick={() => {
                  localStorage.removeItem("user");
                  setDropdown(false);
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </>
      )}
    </>
  );
}

export default Dropdown;
