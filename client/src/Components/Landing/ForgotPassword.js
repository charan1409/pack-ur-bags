import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import TopBtn from "./TopBtn";
import InputBox from "./InputBox";
import Btn from "../Btn";
import Error from "./LogError";
import axios from "axios";

function ForgotPassword() {
  const [loginError, setLoginError] = useState([false, ""]);
  const [userinfo, setUserinfo] = useState({
    otp: "",
    password1: "",
    password2: "",
  });

  const onUpdateField = (e) => {
    const nextFieldState = {
      ...userinfo,
      [e.target.name]: e.target.value,
    };
    setUserinfo(nextFieldState);
  };

  return <div>
    <TopBtn heading={"Forgot Password"} />
    <form className="loginForm" onSubmit={submitHandler}>
        {loginError[0] && (
          <Error msg={loginError[1]} onClick={closeLoginError} />
        )}
        <InputBox
          placeholder={"Enter OTP"}
          leftIcon={"bi bi-person-fill"}
          type={"text"}
          name={"otp"}
          value={userinfo.otp}
          onChange={onUpdateField}
        />
        <InputBox
          placeholder={"password"}
          leftIcon={"bi bi-key-fill"}
          type={"password"}
          name={"password1"}
          value={userinfo.password1}
          onChange={onUpdateField}
        />
        <InputBox
          placeholder={"confirm password"}
          leftIcon={"bi bi-key-fill"}
          type={"password"}
          name={"password2"}
          value={userinfo.password2}
          onChange={onUpdateField}
        />
        <Btn type={"submit"} value={"Sign In"} onClick={props.closeRegister} /><br></br>
        <p>Don't have an account?</p>
      </form>
  </div>;
}

export default ForgotPassword;
