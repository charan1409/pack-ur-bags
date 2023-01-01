import React from "react";
function InputBox(props) {
  return (
    <div className="inputBox">
      <h3>{props.display}</h3>
      <input
        type={props.type}
        onChange={props.onchange}
        value={props.value}
        name={props.from}
        placeholder={props.holder}
        min={props.min}
        max={props.max}
        required
      />
    </div>
  );
}
export default InputBox;
