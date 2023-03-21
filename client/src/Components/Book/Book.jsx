import React from "react";
import { useState, useEffect } from "react";
import Img from "./Img";
import photo from "../viewplaces/places/beach/barefoot.jpg";
import Form from "./Form";
import "./book.css";
import Header from "../Navbar/Header";
import { useDispatch } from "react-redux";
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
  const {id} = useParams();
  const [placedata, setPlacedata] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:9000/places/placedetails/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          setPlacedata(resp.data);
          console.log(resp.data);
          setLoading(true);
        } else {
          navigate("/error");
        }
      });
  }, [id,navigate]);

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
  const price= placedata ? placedata.placeDetails.price : 0;
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
          {placedata ? (
            <div className="details">
              <h2>From: {placedata.placeDetails.from}</h2>
              <h2>To: {placedata.placeDetails.to}</h2>
              <h2>Price per person: ₹{placedata.placeDetails.price}</h2>
            </div>
          ):<Img photo={photo} alt="Enjoy your trip" />}
          
          
        </div>
        <div className="box2">
          <Form onSubmit={clicked} price={placedata?placedata.placeDetails.price:0} days={placedata?placedata.placeDetails.days:0}/>
        </div>
      </div>
    </div>
  );
}

export default App;
