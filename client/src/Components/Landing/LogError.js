import React from "react";
import "./LogError.css";

const LogAlert = (props) => {
  return (
    <div>
      {props.type === "error" ? (
        <div className="log-error">
          <p>{props.msg}</p>
          <span onClick={props.onClick}>X </span>
        </div>
      ) : (
        <div className="log-success">
          <p>{props.msg}</p>
          <span onClick={props.onClick}>X </span>
        </div>
      )}
    </div>
  );
};

export default LogAlert;
