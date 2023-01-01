import React from "react";
import Img from "../viewplaces/ViewplacesComponents/Img";
import Place from "../viewplaces/ViewplacesComponents/Details";
import Rating from "../viewplaces/ViewplacesComponents/Rating";
import Info from "./Info";
import Review from "./Review";
import "./style.css";
import Btn from "../Btn";
import { Link } from "react-router-dom";

function Component(props) {
  return (
    <div className="single-place-details">
      <div className="place-box">
        <div className="heading">
          <Img photo={props.photo} />
          <div className="details">
            <div className="content">
              <Place to={props.to} details="Satus:Available" />
              <Rating rate={props.rate} />
            </div>
            <Link to="/book">
              <Btn type="button" value="Book" />
            </Link>
          </div>
        </div>
        <Info details={props.details} />
        <Review
          image={props.img}
          username={props.username}
          review={props.review}
          type="button"
          name="Submit"
        />
      </div>
    </div>
  );
}
export default Component;
