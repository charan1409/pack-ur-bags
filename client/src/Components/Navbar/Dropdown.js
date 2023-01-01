import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";

function Dropdown() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
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
            My Tours
          </Link>
          <Link
            to="/transactions"
            className="submenu-item"
            onClick={() => setDropdown(false)}
          >
            Transactions
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
    </>
  );
}

export default Dropdown;
