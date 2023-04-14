import React, { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./LoginForm.css";
import InputBox from "./InputBox";
import Btn from "../Btn";
import axios from "axios";

function RegisterForm(props) {
  const { id } = useParams();
  const [cookies, setCookie] = useCookies(["user","redirectLink"]);
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState([false, ""]);
  const [userinfo, setUserinfo] = useState({
    username: "",
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      /\s/.test(userinfo.username) ||
      userinfo.username.trim().length < 1 ||
      userinfo.username.trim().length > 8
    ) {
      setRegisterError([true, "username contains more than 8 characters"]);
    } else if (userinfo.password.trim().length < 6) {
      setRegisterError([true, "password should be altleast 6 characters"]);
    } else if (userinfo.password !== userinfo.confirmedPassword) {
      setRegisterError([true, "passwords are not matching"]);
    } else {
      setRegisterError([false, ""]);
      const user = {
        id: new Date().valueOf(),
        username: userinfo.username,
        email: id,
        password: userinfo.password,
        role: "user",
      };
      console.log(id);
      axios.post("http://localhost:9000/users/register", user).then((resp) => {
        if (resp.status !== 200) {
          setRegisterError([true, resp.data.msg]);
        } else {
          setUserinfo({
            username: "",
            password: "",
            confirmedPassword: "",
          });
          alert(resp.data.msg);
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          if(cookies.redirectLink){
            console.log(cookies.redirectLink);
            navigate(cookies.redirectLink);
          } else{
            return <Navigate to="/index" />;
          }
        }
      });
    }
  };
  return (
    <div>
      <div className="top-btn">
        <h2>SIGN UP</h2>
      </div>
      {registerError[0] && (
        <div className="log-error">
          <p>{registerError[1]}</p>
          <span onClick={closeRegisterError} className="close-error">
            X
          </span>
        </div>
      )}
      <form className="loginForm" onSubmit={submitHandler}>
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
        <Btn
          type={"button"}
          value={"Sign In"}
          onClick={() => {
            navigate("/login");
          }}
        />
      </form>
    </div>
  );
}

export default RegisterForm;