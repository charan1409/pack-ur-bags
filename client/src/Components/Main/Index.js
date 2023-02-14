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
import { connect } from "react-redux";
import axios from "axios";
import { actionCreators } from "../../actions/actions";
import { useDispatch } from "react-redux";


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
      path: "/places/all",
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
    }
  ];
  const dispatch = useDispatch();
  const userL = JSON.parse(localStorage.getItem("user"));
  if(! props.user){
    axios.get(`http://localhost:9000/users/loguser/${userL.username}`)
          .then(async (resp) => {
            dispatch(actionCreators.user(resp.data));
            console.log(resp.data.user)
          }) 
  }
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
const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};
export default connect(mapStateToProps)(Index);
