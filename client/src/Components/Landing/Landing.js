import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../Navbar/Header";
import Vedio from "../Main/Vedio";
import Gallery from "../Main/Gallery";
import Services from "../Main/Services";
import LoginPage from "./LoginPage";

const Landing = (props) => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(["user"]);

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

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    if(userL){
      axios
        .get(`http://localhost:9000/users/loguser/${userL.username}`)
        .then((resp) => {
          if (resp.status === 200) {
            localStorage.setItem("user", JSON.stringify(resp.data));
            if (cookies.user) {
              if (
                resp.data.role === "admin" ||
                resp.data.role === "root"
              ) {
                navigate("/admin");
              } else {
                navigate("/index");
              }
            }
          }
        });
    }
  }, []);

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
