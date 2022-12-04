import React, { useState } from "react";
import axios from "axios";
import { add } from "../../Redux/action";
import { useDispatch } from "react-redux";

function Edityourprofile(props) {
  const dispatch = useDispatch();
  // on change userinfo refresh page once

  const user = JSON.parse(localStorage.getItem("user"));
  const [changed, setChanged] = useState(false);
  const [userinfo, setUserinfo] = useState({
    id: user.id,
    username: user.username,
    name: user.name,
    phonenumber: user.phonenumber,
    gender: user.gender,
    password: user.password,
    email: user.email,
    tours: user.tours,
  });

  const onUpdateField = (e) => {
    const nextFieldState = {
      ...userinfo,
      [e.target.name]: e.target.value,
    };
    setUserinfo(nextFieldState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(userinfo));
    axios.put(`http://localhost:3001/users/${user.id}`, user);
    setChanged(!changed);
    props.setChanged(true);
    dispatch(add());
    alert("updated");
    const modalBg = document.querySelector(".modal-bg");
    modalBg.classList.toggle("bg-active");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="editform">
        <label htmlFor="upname">
          Name:
          <input
            type="text"
            className="tbox"
            name="name"
            placeholder="Enter your name"
            onChange={onUpdateField}
            value={userinfo.name}
          />
        </label>
        <br></br>
        <label
          htmlFor="upgender"
          onChange={onUpdateField}
          value={userinfo.name}
        >
          Gender:
          <input type="radio" name="gender" id="male" value="male" />
          <label htmlFor="male">male</label>
          <input type="radio" name="gender" id="female" value="female" />
          <label htmlFor="female">female</label>
        </label>
        <br></br>
        <label htmlFor="upphone">
          Phone number:
          <input
            type="text"
            className="tbox"
            name="phonenumber"
            placeholder="Enter your phone number"
            onChange={onUpdateField}
            value={userinfo.phonenumber}
          />
        </label>
        <button type="submit" className="btn_profile" value="save changes">
          save changes
        </button>
      </form>
    </div>
  );
}

export default Edityourprofile;
