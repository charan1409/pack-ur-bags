import React, { useState } from "react";
import "./LoginForm.css";
import InputBox from "./InputBox";
import Btn from "../Btn";
import Error from "./LogError";

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
    } else if(userinfo.email.trim().length < 1 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userinfo.email))){//  eslint-disable-line
      setRegisterError([true, "Invalid Email"]);
    } else if (userinfo.password.trim().length < 6) {
      setRegisterError([true, "Password should be altleast 6 characters"]);
    } else if(userinfo.password !== userinfo.confirmedPassword){
      setRegisterError([true, "Passwords are not matching"]);
    } else {
      setRegisterError([false, ""]);
      alert(JSON.stringify(userinfo, null, 2));
      setUserinfo({
        username: "",
        email: "",
        password: "",
        confirmedPassword: "",
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
        <Btn type={"submit"} value={"Sign Up"} onClick={props.openRegister} />
        <p>Already have an account?</p>
        <Btn type={"button"} value={"Sign In"} onClick={props.closeRegister} />
      </form>
    </div>
  );
}

export default RegisterForm;
