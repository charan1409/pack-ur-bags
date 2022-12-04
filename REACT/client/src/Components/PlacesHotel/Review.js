import React from "react";
import Btn from "../Btn";
import Submit from "./Submit";

function review_rating() {
  const modalBg = document.querySelector(".modal-bg");
  modalBg.classList.toggle("bg-active");
}

function Review(props) {
  return (
    <div className="review" id="reviews">
      <h3>Reviews:</h3>
      <Btn type={props.type} onClick={review_rating} value={props.name} />
      <Submit id="1" />
      <div className="content">
        <img src={props.image} alt={props.alt} />
        <h5>{props.username}</h5>
        <br />
        <br />
        <p>{props.review}</p>
      </div>
    </div>
  );
}
export default Review;
