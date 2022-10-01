import React from "react";

const BoxComp = (props) => {
  const style_name = props.styleName;
  return (
    <div className="box">
      <img src={props.img} alt="" />
      <div className="content">
        <h3>
          {" "}
          <i className="fas fa-map-marker-alt"></i> {props.place}{" "}
        </h3>
        <p>{props.data}</p>
        <div className="stars">
          <i className={`${style_name} fa-star`}></i>
          <i className={`${style_name} fa-star`}></i>
          <i className={`${style_name} fa-star`}></i>
          <i className={`${style_name} fa-star`}></i>
          <i className={`${style_name} fa-star`}></i>
        </div>
        <div className="price">
          {" "}
          {props.price} <span>{props.orig}</span>{" "}
        </div>
        <a href={props.navig} className="btn">
          visit
        </a>
      </div>
    </div>
  );
};

export default BoxComp;
