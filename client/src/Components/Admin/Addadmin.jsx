import React from "react";
import InputBox from "../Landing/InputBox";
import { useState } from "react";
import Btn from "../Btn";
import axios from "axios";
import "./Addadmin.css";
import Header from "../Navbar/Header";

function Addadmin(props) {
  const [userinfo, setUserinfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
    role: "admin",
  });

  const onUpdateField = (e) => {
    const nextFieldState = {
      ...userinfo,
      [e.target.name]: e.target.value,
    };
    setUserinfo(nextFieldState);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (/\s/.test(userinfo.username || userinfo.username.trim().length < 1)) {
      alert("Username should not contain spaces");
    } else if (
      userinfo.email.trim().length < 1 ||
      !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(userinfo.email)
    ) {
      //  eslint-disable-line
      alert("Invalid Email");
    } else if (userinfo.password.trim().length < 6) {
      alert("Password should be altleast 6 characters");
    } else if (userinfo.password !== userinfo.confirmedPassword) {
      alert("Passwords are not matching");
    } else {
      // setRegisterError([false, ""]);
      const user = {
        id: new Date().valueOf(),
        username: userinfo.username,
        email: userinfo.email,
        password: userinfo.password,
        role: "admin"
      };
      axios.post("http://localhost:9000/users/register", user).then((resp) => {
        if (resp.data.error) {
          // setRegisterError([true, resp.data.error]);
          alert(resp.data.error);
        } else if (resp.data.success) {
          setUserinfo({
            username: "",
            email: "",
            password: "",
            confirmedPassword: "",
          });
          alert(resp.data.success);
        }
      });
    }
  };

  const navItems = [
    {
      title: "Home",
      path: "/admin",
    },
    {
      title: "add admin",
      path: "/adminform",
    },
    {
      title: "add place",
      path: "/adminplaces",
    },
  ];

  return (
    <>
      <Header user={true} navItems={navItems} />
      <div className="add">
        <h1>Add admin</h1>
        <form onSubmit={submitHandler} className="addadmin" style={{height: "400px"}}>
          <InputBox
            placeholder={"username"}
            leftIcon={"bi bi-person-fill"}
            type={"text"}
            name={"username"}
            value={userinfo.username}
            onChange={onUpdateField}
          />
          <InputBox
            placeholder={"email"}
            leftIcon={"bi bi-envelope-open-fill"}
            type={"text"}
            name={"email"}
            value={userinfo.email}
            onChange={onUpdateField}
          />
          <InputBox
            placeholder={"password"}
            leftIcon={"bi bi-key-fill"}
            type={"password"}
            name={"password"}
            value={userinfo.password}
            onChange={onUpdateField}
          />
          <InputBox
            placeholder={"confirm your password"}
            leftIcon={"bi bi-key-fill"}
            type={"password"}
            name={"confirmedPassword"}
            value={userinfo.confirmedPassword}
            onChange={onUpdateField}
          />
          <Btn type="submit" value="register" />
        </form>
      </div>
    </>
  );
}

export default Addadmin;
