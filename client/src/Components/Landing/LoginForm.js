import React, { useState } from "react";
import "./LoginForm.css";
import InputBox from "./InputBox";
import Btn from "../Btn";
import Error from "./LogError";

function Form(props) {
  const [loginError, setLoginError] = useState([false,""]);
  const [userinfo, setUserinfo] = useState({
    username:"",
    password:""
  });

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
    if(/\s/.test(userinfo.username || userinfo.username.trim().length < 1)){
      setLoginError([true,"Username should not contain spaces"])
    }
    else if(userinfo.password.trim().length < 6){
      setLoginError([true,"Password should be altleast 6 characters"])
    } else{
      setLoginError([false,""])
      alert(JSON.stringify(userinfo,null,2))
      setUserinfo({
        username:"",
        password:""
      })
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
