import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
function Details(props) {
  return (
    <div className="detail">
      <h2>
        vizag - {props.to}
      </h2>
      <h3>Rs.400 per person</h3>
      <p>{props.details}</p>
    </div>
  );
}
export default Details;
