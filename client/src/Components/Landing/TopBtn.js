import React from "react";
import "./TopBtn.css";

function TopBtn(props) {
  return (
    <div className="top-btn">
      <h1>{props.heading}</h1>
    </div>
  );
}

export default TopBtn;
