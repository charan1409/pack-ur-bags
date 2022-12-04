import React from "react";
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

const Index = (props) => {
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
    {
      title: "Footer",
      path: "#footer",
    },
  ];
  return (
    <div>
      <Upward />
      <Header user={true} navItems={navItems} />
      <Vedio isvalidin={true} />
      <Gallery />
      <Places />
      <About />
      <Services />
      <Review />
      <Feedback />
      <Footer />
    </div>
  );
};

export default Index;
