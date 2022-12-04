import React from "react";
import Btn from "../Btn";
import { Link } from "react-router-dom";
function Hotelbox(props) {
  return (
    <div className="box">
      <img src="/img/places/beach/blue-ocean-resort.jpg" alt="" />
      <div className="content">
        <div className="image">
          <img src={props.photo} alt="" />
        </div>
        <h3 className="hotel"> {props.hotel} </h3>
        <br />
        <h3>
          <i className="fas fa-map-marker-alt"></i>
          {props.location}
        </h3>
        <p>{props.direction}</p>
        <div className="stars">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
          <i className="far fa-star"></i>
        </div>
        <div className="price"> ₹{props.price} per night</div>
        <br />
        <Link to="/book">
          <Btn value="Book" />
        </Link>
      </div>
    </div>
  );
}
export default Hotelbox;
