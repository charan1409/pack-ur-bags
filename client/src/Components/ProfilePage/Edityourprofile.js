import React, { useState } from "react";
import axios from "axios";
import { actionCreators } from "../../actions/actions";
import { useDispatch } from "react-redux";

function Edityourprofile(props) {
  const dispatch = useDispatch();
  // on change userinfo refresh page once

  const user = JSON.parse(localStorage.getItem("user"));
  const [userinfo, setUserinfo] = useState({
    id: user.id,
    username: user.username,
    name: user.name,
    phonenumber: user.phonenumber,
    gender: user.gender,
    email: user.email,
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
    if (/\s/.test(userinfo.username)) {
      alert("username shouldn't have spaces.");
    } else {
      axios
        .post(`http://localhost:9000/profile/edit`, userinfo)
        .then((resp) => {
          if (resp.status !== 200) alert(resp.data.error);
          else {
            dispatch(actionCreators.add());
            alert(resp.data.succ);
            // const modalBg = document.querySelector(".modal-bg");
            // modalBg.classList.toggle("bg-active");
          }
        });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="editform">
        <label htmlFor="name">
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
        <label htmlFor="username">
          Username:
          <input
            type="text"
            className="tbox"
            name="username"
            placeholder="Enter your username"
            onChange={onUpdateField}
            value={userinfo.username}
          />
        </label>
        <br></br>
        <label
          htmlFor="gender"
          onChange={onUpdateField}
          value={userinfo.gender}
        >
          Gender:
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            defaultChecked={userinfo.gender === "male"}
          />
          <label htmlFor="male">male</label>
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            defaultChecked={userinfo.gender === "female"}
          />
          <label htmlFor="female">female</label>
        </label>
        <br></br>
        <label htmlFor="phonenumber">
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
