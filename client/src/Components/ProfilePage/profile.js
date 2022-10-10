import React from 'react';
import Header from '../Main/Header';
import "./clientprofile.css";
import img from "./displayimage.jpg"
import Tabledata from './Tabledata';

function profile() {

    return (
        <div>
            <Header />
            {/* <h1 style={{ fontSize: "40px" }}>profile</h1> */}
            <h1 class='h1'>Profile</h1><br></br>
            <div class="profile">
                <div class="left">
                    {/* <p>Hello</p> */}
                    <div class="_img">
                        <img src={img} alt="profile_image" />
                        <div class="content">
                            <i class="bi bi-trash fa-3x" onclick="location.href='/profile/remove'"></i>
                            <i class="bi bi-upload fa-3x" onclick="location.href='/profile/upload'"></i>
                        </div>
                    </div>
                    <button class="prof-btn" onclick="review_rating()">edit profile</button></div>
                <div class="right_table">
                    <table>
                        <Tabledata heading={"Name:"} data={"Rohith"} />
                        <Tabledata heading={"Username:"} data={"Rohith12"} />
                        <Tabledata heading={"Gender:"} data={"Male"} />
                        <Tabledata heading={"Phone Number:"} data={"234"} />
                        <Tabledata heading={"Email:"} data={"Rohith@gmail.com"} />
                    </table>
                    <div class="btns">
                        <button class="prof-btn" onclick="location.href='/profile/changepass'">change password</button><br></br>
                        <button class="prof-btn" onclick="location.href='/logout'">logout</button>
                    </div>
                </div>

            </div >

            {/* <div class="modal-bg">
                <div class="edit-form">
                    <h2>edit your profile</h2>
                    <form action="/profile/edit" method="post" class="editform">
                        <label for="username">Username:</label>
                        <input type="text" class="tbox" name="username" placeholder="Enter your username" value="<%=user.username%>"><br></br></input>
                        <label for="upname">Name: </label>
                        <input type="text" class="tbox" name="upname" placeholder="Enter your name" value="<%=user.name%>"><br></br></input>
                        <label for="upgender">Gender:</label>
                        <input type="radio" name="upgender" id="male" value="male" checked></input>
                        <input type="radio" name="upgender" id="male" value="male"></input>
                        <label for="male">male</label>
                        <input type="radio" name="upgender" id="female" value="female" checked></input>
                        <input type="radio" name="upgender" id="female" value="female"></input>
                        <label for="female">female</label><br></br>
                        <label for="upphone">Phone number:</label>
                        <input type="text" class="tbox" name="upphone" placeholder="Enter your phone number" value="<%=user.phone%>"><br></br></input>
                        <a href="/profile/profile" class="cancelbtn">cancel</a>
                        <button type="submit" class="btn" value="save changes">save changes</button>
                    </form>
                    <span onclick="location.href='/profile/profile'">X</span>
                </div>
            </div> */}
        </div >
    )
}

export default profile;