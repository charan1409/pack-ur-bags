import React from "react";
import { useState, useEffect } from "react";
import Form from "./Form";
import "./book.css";
import Header from "../Navbar/Header";
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
  const [user, setUser] = useState({});
  const {id} = useParams();
  const [placedata, setPlacedata] = useState();
  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:9000/users/loguser/${userL.username}`)
      .then((resp) => {
        if(resp.data.user) return setUser(resp.data.user);
        else navigate("/error")
      });
    axios
      .get(`http://localhost:9000/places/placedetails/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          setPlacedata(resp.data);
          console.log(resp.data);
        } else {
          navigate("/error");
        }
      });
  }, [id,navigate]);

  function clicked(event) {
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
      <Header user={user} navItems={navItems} />
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
          ):<h2>Enjoy your trip</h2>}
        </div>
        <div className="box2">
          <Form onSubmit={clicked} price={placedata?placedata.placeDetails.price:0} days={placedata?placedata.placeDetails.days:0}/>
        </div>
      </div>
    </div>
  );
}

export default App;
