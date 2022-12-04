import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
function Rating() {
  return (
    <div className="rating">
      {/* <p>Rating:{props.rate}/5</p> */}
      <i className="bi bi-star-fill"></i>
      <i className="bi bi-star-fill"></i>
      <i className="bi bi-star-fill"></i>
      <i className="bi bi-star-fill"></i>
      <i className="bi bi-star"></i>
    </div>
  );
}
export default Rating;
