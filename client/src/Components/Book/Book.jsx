import React from "react";
import Img from "./Img";
import photo from "../viewplaces/places/beach/barefoot.jpg";
import Form from "./Form";
import "./book.css";
import Header from "../Navbar/Header";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../actions/actions";
import axios from "axios";

const navItems = [
  {
    title: "Home",
    path: "/index",
    
  },
  {
    title: "Gallery",
    path: "/index/#gallery",
    
  },
  {
    title: "Places",
    path: "/places/all",
    
  },
  {
    title: "Services",
    path: "/index/#services",
    
  }
];

function App(props) {
  const dispatch = useDispatch();
  const userL = JSON.parse(localStorage.getItem("user"));
  if(! props.user){
    axios.get(`http://localhost:9000/users/loguser/${userL.username}`)
          .then(async (resp) => {
            dispatch(actionCreators.user(resp.data));
          }) 
  }
  return (
    <div className="book">
      <Header user={true} navItems={navItems} />
      <div>
        <h1 className="heading">
          <span>B</span>
          <span>O</span>
          <span>O</span>
          <span>K</span>
          <span className="space"></span>
          <span>N</span>
          <span>O</span>
          <span>W</span>
        </h1>
      </div>
      <div className="row">
        <div className="box">
          <Img photo={photo} alt="Enjoy your trip" />
        </div>
        <div className="box">
          <Form />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};
export default connect(mapStateToProps)(App);