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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  },
];

function App(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userL = JSON.parse(localStorage.getItem("user"));
  if (!props.user) {
    axios
      .get(`http://localhost:9000/users/loguser/${userL.username}`)
      .then(async (resp) => {
        dispatch(actionCreators.user(resp.data));
      });
  }

  const {id} = useParams();
  function clicked(event) {
    // const bookData = {
    //   from: from,
    //   to: to,
    //   adult: adult,
    //   child: child,
    //   depart: depart,
    //   arrival: arrival,
    // };
    // console.log(bookData);

    // if (!cartItems.includes(bookData)) {
    //   // setCartItems([...cartItems, bookData]);
    //   const user = JSON.parse(localStorage.getItem("user"));
    //   axios.get(`http://localhost:3001/users/${user.id}`).then((res) => {
    //     const user = res.data;
    //     user.tours.push(bookData);
    //     axios.put(`http://localhost:3001/users/${user.id}`, user);
    //     alert("Added to cart");
    //     navigate("/mytours");
    //   });
    // }

    event.preventDefault();
    axios.get(`http://localhost:9000/book/booking/${id}`).then((resp) => {
      if (resp.status === 200) {
        navigate(`/payment/${id}`);
      } else {
        navigate("/error");
      }
    });
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
        <div className="box1">
          <Img photo={photo} alt="Enjoy your trip" />
        </div>
        <div className="box2">
          <Form onSubmit={clicked} />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    tour: state.tour,
  };
};
export default connect(mapStateToProps)(App);
