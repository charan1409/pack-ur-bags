import React from "react";
import { useState } from "react";
import Header from "../Navbar/Header";
import Btn from "../Btn";
import InputBox from "../Landing/InputBox";
import axios from "axios";

function AddPlaces() {
  const navItems = [
    {
      title: "Home",
      path: "/admin",
    },
    {
      title: "add admin",
      path: "/adminform",
    },
    {
      title: "add place",
      path: "/adminplaces",
    },
  ];

  const [placeinfo, setplaceinfo] = useState({
    type: "",
    place: "",
    details: "",
    location: "",
  });

  const onUpdateField = (e) => {
    const nextFieldState = {
      ...placeinfo,
      [e.target.name]: e.target.value,
    };
    setplaceinfo(nextFieldState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newplace = {
      place: placeinfo.place,
      details: placeinfo.details,
      location: placeinfo.location,
    };
    axios.post("http://localhost:3001/places", newplace);
    setplaceinfo({
      type: "",
      place: "",
      details: "",
      location: "",
    });
  };
  return (
    <div>
      <Header user={false} navItems={navItems} />
      <div className="add">
        <h1>Add place</h1>
        <form onSubmit={submitHandler}>
          <InputBox
            placeholder={"place type"}
            type={"text"}
            name={"type"}
            value={placeinfo.type}
            onChange={onUpdateField}
          />
          <InputBox
            placeholder={"place"}
            type={"text"}
            name={"place"}
            value={placeinfo.place}
            onChange={onUpdateField}
          />
          <InputBox
            placeholder={"details"}
            type={"text"}
            name={"details"}
            value={placeinfo.details}
            onChange={onUpdateField}
          />
          <InputBox
            placeholder={"location"}
            type={"text"}
            name={"location"}
            value={placeinfo.location}
            onChange={onUpdateField}
          />
          <Btn type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}

export default AddPlaces;
