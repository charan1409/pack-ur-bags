import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import TopBtn from "./TopBtn";
import InputBox from "./InputBox";
import Btn from "../Btn";
import Error from "./LogError";
import axios from "axios";

function Form(props) {
  const [loginError, setLoginError] = useState([false, ""]);
  const [userinfo, setUserinfo] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();

  const closeLoginError = () => {
    setLoginError([false, ""]);
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
      setLoginError([true, "Invalid username"]);
    } else if (userinfo.password.trim().length < 6) {
      setLoginError([true, "Invalid password"]);
    } else {
      setLoginError([false, ""]);
      axios.post("http://localhost:9000/users/login",userinfo).then((resp) => {
        if (resp.status === 200) {
          localStorage.setItem("user", JSON.stringify(resp.data));
          if (resp.data.role === "admin" || resp.data.role === "root") {
            navigate("/admin");
          } else {
            navigate("/index");
          }
        } else {
          setLoginError([true, resp.data.error]);
        }
      });
    }
  };

  return (
    <div>
      <TopBtn heading={"SIGN IN"} />
      <form className="loginForm" onSubmit={submitHandler}>
        {loginError[0] && (
          <Error msg={loginError[1]} onClick={closeLoginError} />
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
          placeholder={"password"}
          leftIcon={"bi bi-key-fill"}
          type={"password"}
          name={"password"}
          value={userinfo.password}
          onChange={onUpdateField}
        />
        <Btn type={"submit"} value={"Sign In"} onClick={props.closeRegister} /><br></br>
        <h2>Forgot Password?</h2>
        <p>Don't have an account?</p>
        <Btn type={"button"} value={"Sign Up"} onClick={props.openRegister} /><br></br>
        <p>contact : packyourbagsofficial@gmail.com</p>
      </form>
    </div>
  );
}

export default Form;
