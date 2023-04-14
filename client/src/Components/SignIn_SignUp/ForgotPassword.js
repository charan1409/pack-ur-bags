import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LoginForm.css";
import InputBox from "./InputBox";
import Btn from "../Btn";
import axios from "axios";

function ForgotPassword(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState([false, ""]);
  const [userinfo, setUserinfo] = useState({
    password1: "",
    password2: "",
  });

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
    if (userinfo.password1.trim().length < 6) {
      setLoginError([true, "Password length must be greater than 6"]);
    } else if (userinfo.password1 !== userinfo.password2) {
      setLoginError([true, "Passwords do not match"]);
    } else {
      setLoginError([false, ""]);
      axios
        .post("http://localhost:9000/users/forgotpassword", {
          email: id,
          password: userinfo.password1,
        })
        .then((resp) => {
          if (resp.status === 200) {
            localStorage.setItem("user", resp.data);
            navigate("/index");
          } else {
            setLoginError([true, resp.data.error]);
          }
        });
    }
    navigate("/index");
  };

  return (
    <div>
      <div className="top-btn">
        <h2>FORGOT PASSWORD</h2>
      </div>
      <form className="loginForm" onSubmit={submitHandler}>
        {loginError[0] && (
          <div className="log-error">
            <p>{loginError[1]}</p>
            <span onClick={closeLoginError} className="close-error">
              X
            </span>
          </div>
        )}
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
        <Btn type={"submit"} value={"Submit"} />
        <br></br>
      </form>
    </div>
  );
}

export default ForgotPassword;