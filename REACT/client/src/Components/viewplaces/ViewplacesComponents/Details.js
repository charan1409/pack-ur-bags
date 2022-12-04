import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
function Details(props) {
  return (
    <div className="detail">
      <h2>
        <i className="bi bi-geo-alt-fill"></i>
        {props.to}
      </h2>
      <p>{props.details}</p>
    </div>
  );
}
export default Details;
