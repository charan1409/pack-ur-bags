import React, { useEffect, useState } from "react";

import Header from "../Navbar/Header";
import Vedio from "../Main/Vedio";
import Gallery from "../Main/Gallery";
import Services from "../Main/Services";
import LoginPage from "./LoginPage";

const Landing = (props) => {
  const [login, setLogin] = useState(false);

  const toggleLoginForm = () => {
    setLogin(!login);
  };

  useEffect(() => {
    if (props.formType) {
      return setLogin(true);
    } else{
      return setLogin(false);
    }
  }, [props.formType]);

  const navItems = [
    {
      title: "Home",
      path: "#home",
    },
    {
      title: "Gallery",
      path: "#gallery",
    },
    {
      title: "Services",
      path: "#services",
    },
  ];

  return (
    <div>
      <Header
        user={props.user}
        openLoginForm={toggleLoginForm}
        navItems={navItems}
      />
      <Vedio isvalidin={false} />
      <Gallery />
      <Services />
      <h1>
        Please{" "}
        <button className="btn" onClick={toggleLoginForm}>
          Login
        </button>{" "}
        For More
      </h1>

      {login && (
        <LoginPage
          formType={props.formType}
          openLoginForm={toggleLoginForm}
        />
      )}
    </div>
  );
};

export default Landing;
