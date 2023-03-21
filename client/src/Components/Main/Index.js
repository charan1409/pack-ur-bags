import React, { useState, useEffect } from "react";
import "./main.css";
import Upward from "./Upward";
import Header from "../Navbar/Header";
import Vedio from "./Vedio";
import Gallery from "./Gallery";
import Places from "./Places";
import About from "./About";
import Services from "./Services";
import Review from "./Review";
import Feedback from "./Feedback";
import Footer from "./Footer";
import axios from "axios";

const Index = () => {
  const [user, setUser] = useState({});
  const [updated, setUpdated] = useState(false);
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
      title: "Places",
      path: "#places",
    },
    {
      title: "About",
      path: "#about",
    },
    {
      title: "Services",
      path: "#services",
    },
    {
      title: "Reviews",
      path: "#review",
    },
  ];
  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:9000/users/loguser/${userL.username}`)
      .then((resp) => {
        return setUser(resp.data.user);
      });
  }, [updated]);

  const update = () => {
    setUpdated(!updated);
  };
  return (
    <div>
      <Upward />
      <Header user={user} navItems={navItems} />
      <Vedio user={user} />
      <Gallery />
      <Places />
      <About />
      <Services />
      <Review />
      <Feedback user={user} updated={update}/>
      <Footer />
    </div>
  );
};

export default Index;
