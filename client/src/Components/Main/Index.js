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

const Index = () => {
  return (
    <div>
      <Upward />
      <Header user={true}/>
      <Vedio />
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
