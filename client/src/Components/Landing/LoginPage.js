import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./LoginPage.css";
import TopBtn from "./TopBtn";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function LoginPage(props) {
  const [register, setRegister] = useState(false);

  const openRegister = () => {
    setRegister(true);
  };

  const closeRegister = () => {
    setRegister(false);
  };
  return (
    <div className="modal">
      <div className="login-container">
        <div className="total-form-container">
          <div className="login-form-close">
            <Link to={"/"}>
              <span className="login-form-close-btn" onClick={props.openLoginForm}>
                X
              </span>
            </Link>
          </div>
          <div id="log" className="login-form-container">
            <TopBtn heading={`${register ? "Sign Up" : "Sign In"}`} />
            {!register ? (
              <LoginForm
                register={register}
                openRegister={openRegister}
                closeRegister={closeRegister}
                users={props.users}
              />
            ) : (
              <RegisterForm
                openRegister={openRegister}
                closeRegister={closeRegister}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
