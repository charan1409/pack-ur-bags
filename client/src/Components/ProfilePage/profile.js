import React, {useContext} from "react";
import Header from "../Navbar/Header";
import "./clientprofile.css";
import img from "./displayimage.jpg";
import Tabledata from "./Tabledata";
import Edityourprofile from "./Edityourprofile";
import { Link } from "react-router-dom";
import { store } from "../../App.js";

function review_rating() {
  const modalBg = document.querySelector(".modal-bg");
  modalBg.classList.toggle("bg-active");
}

function Profile() {
    const {loginuser} =  useContext(store);
    return (
        <div>
            <Header />
            <h1 className='h1'>Profile</h1><br></br>
            <div className="profile">
                <div className="_left">
                    <div className="_img">
                        <img src={img} alt="profile_img" />
                        <div className="img_content">
                            <i className="bi bi-trash fa-3x"></i>
                            <i className="bi bi-upload fa-3x"></i>
                        </div>
                    </div>
                    <button className="btn_profile" onClick={review_rating}>edit profile</button></div>
                <div className="_right">
                    <table>
                        <Tabledata heading={"Name:"} data={loginuser.username} />
                        <Tabledata heading={"Username:"} data={loginuser.username} />
                        <Tabledata heading={"Gender:"} data={"male"} />
                        <Tabledata heading={"Phone Number:"} data={"9392756484"} />
                        <Tabledata heading={"Email:"} data={loginuser.email} />
                    </table>
                    <div className="btns">
                        <Link to="/changepass" className="btn_profile">Change Password</Link>
                        {/* <button class="btn_profile" onClick="/changepass">change password</button><br></br> */}
                        <button class="btn_profile" onClick="">logout</button>
                    </div>
                </div>
            </div >
            <div className="modal-bg">
                <h2>edit your profile</h2>
                <div className="edit-form">
                    <Edityourprofile username="User" />
                    <span onClick={review_rating}>x</span>
                </div>
            </div>
        </div>

    )
}

export default Profile;
