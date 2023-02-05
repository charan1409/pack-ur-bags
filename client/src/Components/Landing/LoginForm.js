import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
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
          console.log(resp.data);
          const user = resp.data
          localStorage.setItem("user", JSON.stringify(user));
          if (user.role === "admin" || user.role === "root") {
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
        <p style={{ color: "white" }}>Forgot Password?</p><br></br>
        <p style={{ color: "white" }}>Don't have an account?</p>
        <Btn type={"button"} value={"Sign Up"} onClick={props.openRegister} /><br></br>
        <p style={{ color: "white" }}>contact information: packyourbags@gmail.com</p>
      </form>
    </div>
  );
}

export default Form;
