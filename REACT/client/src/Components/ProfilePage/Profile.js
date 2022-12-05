import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Navbar/Header";
import "./clientprofile.css";
import img from "./profile.png";
import Tabledata from "./Tabledata";
import Edityourprofile from "./Edityourprofile";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";

function edit_form() {
  const modalBg = document.querySelector(".modal-bg");
  modalBg.classList.toggle("bg-active");
}

function change_pass() {
  const modalBg = document.querySelector(".pass-modal-bg");
  modalBg.classList.toggle("bg-active");
}

const navItems = [
  {
    title: "Home",
    path: "/index",
  },
];
function Profile() {
  const counter = useSelector((state) => state.value);
  const [user, setUser] = useState({});
  // eslint-disable-next-line
  const [changed, setChanged] = useState(false);
  const userL = JSON.parse(localStorage.getItem("user"));
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/users/${userL.id}`);
    const data = await response.json();
    return setUser(data);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [counter]);
  return (
    <div>
      <Header user={true} navItems={navItems} />
      <h1 className="h1">Profile</h1>
      <br></br>
      <div className="profile">
        <div className="_left">
          <div className="_img">
            <img src={img} alt="profile_img" />
            <div className="img_content">
              <i className="bi bi-trash fa-3x"></i>
              <i className="bi bi-upload fa-3x"></i>
            </div>
          </div>
          <button className="btn_profile" onClick={edit_form}>
            edit profile
          </button>
        </div>
        <div className="_right">
          <table>
            <Tabledata heading={"Username:"} data={user.username} />
            <Tabledata heading={"Name:"} data={user.name} />
            <Tabledata heading={"Gender:"} data={user.gender} />
            <Tabledata heading={"Phone Number:"} data={user.phonenumber} />
            <Tabledata heading={"Email:"} data={user.email} />
          </table>
          <div className="btns">
            <button className="btn_profile" onClick={change_pass}>
              change password
            </button>
            <br></br>
            <Link
              to="/"
              className="btn_profile"
              onClick={() => {
                localStorage.removeItem("user");
              }}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
      <div className="modal-bg">
        <div className="edit-form">
          <h2>edit your profile</h2>
          <Edityourprofile username="User" setChanged={setChanged} />
          <span onClick={edit_form}>x</span>
        </div>
      </div>
      <div className="pass-modal-bg">
        <div className="edit-form">
          <h2>Change your password</h2>
          <ChangePassword username="User" />
          <span onClick={change_pass}>x</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
