import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
function Details(props) {
  return (
    <div className="detail">
      <h2>
        {props.from} - {props.to}
      </h2>
      <h3>₹{props.price} per person</h3>
      <p>{props.details}</p>
    </div>
  );
}
export default Details;
