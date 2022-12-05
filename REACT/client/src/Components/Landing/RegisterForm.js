import React, { useState } from "react";
import "./LoginForm.css";
import InputBox from "./InputBox";
import Btn from "../Btn";
import Error from "./LogError";
import axios from "axios";

function RegisterForm(props) {
  const [registerError, setRegisterError] = useState([false, ""]);
  const [userinfo, setUserinfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const closeRegisterError = () => {
    setRegisterError(false);
  };

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
      setRegisterError([true, "Username should not contain spaces"]);
    } else if (
      // eslint-disable-next-line
      userinfo.email.trim().length < 1 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userinfo.email)
    ) {
      //  eslint-disable-line
      setRegisterError([true, "Invalid Email"]);
    } else if (userinfo.password.trim().length < 6) {
      setRegisterError([true, "Password should be altleast 6 characters"]);
    } else if (userinfo.password !== userinfo.confirmedPassword) {
      setRegisterError([true, "Passwords are not matching"]);
    } else {
      setRegisterError([false, ""]);
      axios.get("http://localhost:3001/users").then((res) => {
        const userE = res.data.find((user) => user.email === userinfo.email);
        const userN = res.data.find(
          (user) => user.username === userinfo.username
        );
        if (userE) {
          setRegisterError([true, "Email is already registered."]);
        } else if (userN) {
          setRegisterError([true, "username is already in use."]);
        } else {
          const newUser = {
            id: new Date().valueOf(),
            username: userinfo.username,
            email: userinfo.email,
            password: userinfo.password,
            tours: [],
          };
          axios.post("http://localhost:3001/users", newUser);
          alert(`${userinfo.username} is registered successfully`);
          setUserinfo({
            username: "",
            email: "",
            password: "",
            confirmedPassword: "",
          });
          setRegisterError([false, ""]);
          props.closeRegister();
        }
      });
    }
  };
  return (
    <div>
      <form className="loginForm" onSubmit={submitHandler}>
        {registerError[0] && (
          <Error msg={registerError[1]} onClick={closeRegisterError} />
        )}
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
        <Btn type={"submit"} value={"Sign Up"} />
        <p style={{ color: "white" }}>Already have an account?</p>
        <Btn type={"button"} value={"Sign In"} onClick={props.closeRegister} />
      </form>
    </div>
  );
}

export default RegisterForm;
