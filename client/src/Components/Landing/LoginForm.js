import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import InputBox from "./InputBox";
import Btn from "../Btn";
import Error from "./LogError";

// const users = [
//   {
//     username:"charan14",
//     password:"charan"
//   },
//   {
//     username:"rahul14",
//     password:"rahulvarma"
//   },
//   {
//     username:"kamal12",
//     password:"kamalsai"
//   },
//   {
//     username:"rohith14",
//     password:"rohith"
//   },
//   {
//     username:"nikhil14",
//     password:"nikhil"
//   }
// ]

function Form(props) {
  const [loginError, setLoginError] = useState([false,""]);
  const [userinfo, setUserinfo] = useState({
    username:"",
    password:""
  });
  let history = useNavigate();

  const closeLoginError = () => {
    setLoginError([false,""]);
  };

  const onUpdateField = e => {
    const nextFieldState = {
      ...userinfo,
      [e.target.name]: e.target.value
    };
    setUserinfo(nextFieldState);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(props);
    if(/\s/.test(userinfo.username || userinfo.username.trim().length < 1)){
      setLoginError([true,"Username should not contain spaces"])
    }
    else if(userinfo.password.trim().length < 6){
      setLoginError([true,"Password should be altleast 6 characters"])
    } else{
      setLoginError([false,""])
      props.users.forEach(e => {
        if(e.username === userinfo.username && e.password === userinfo.password){
          setUserinfo({
            username:"",
            password:""
          })
          history("/index");
        } else{
          setLoginError([true,"Invalid user details"])
        }
      });
    }
  };

    return (
      <div>
        <form className="loginForm" onSubmit={submitHandler}>
          {loginError[0] && <Error msg={loginError[1]} onClick={closeLoginError} />}
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
          <Btn
            type={"submit"}
            value={"Sign In"}
            onClick={props.closeRegister}
          />
          <p>Don't have an account?</p>
          <Btn type={"button"} value={"Sign Up"} onClick={props.openRegister} />
        </form>
      </div>
    );
}

export default Form;
