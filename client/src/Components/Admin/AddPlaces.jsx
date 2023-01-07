import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import Btn from "../Btn";
import axios from "axios";
import "./AddPlaces.css";

function AddPlaces() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const days = ["Three", "Five","Both"];
  const busType = ["AC", "NON-AC", "Both"];
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
  const [image, setImage] = useState();
  const [placeinfo, setplaceinfo] = useState({
    from: "",
    to: "",
    price: "",
    details: "",
    category: "",
    busType: "",
    days: 0,
  });

  const onUpdateField = (e) => {
    const nextFieldState = {
      ...placeinfo,
      [e.target.name]: e.target.value,
    };
    setplaceinfo(nextFieldState);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const base64 = await convertToBase64(image);
    const newplace = {
      id: new Date().valueOf(),
      from: placeinfo.from,
      to: placeinfo.to,
      price: placeinfo.price,
      details: placeinfo.details,
      category: placeinfo.category,
      busType: placeinfo.busType,
      days: placeinfo.days,
      image: base64,
    };
    axios.post(`http://localhost:9000/admins/place/${user.username}`, newplace).then((resp) => {
      if (resp.status === 200) {
        setplaceinfo({
          from: "",
          to: "",
          price: "",
          details: "",
          category: "",
        });
        setImage();
        alert(resp.data.success);
      } else {
        navigate("/error")
      }
    });
  };
  return (
    <div>
      <Header user={true} navItems={navItems} />
      <div className="addplace">
        <h1>Add place</h1>
        <form onSubmit={submitHandler}>
          <input
            placeholder="from"
            type="text"
            name="from"
            value={placeinfo.from}
            onChange={onUpdateField}
          />
          <input
            placeholder="to"
            type="text"
            name="to"
            value={placeinfo.to}
            onChange={onUpdateField}
          />
          <input
            placeholder="price"
            type="number"
            name="price"
            value={placeinfo.price}
            onChange={onUpdateField}
          />
          <input
            placeholder="details"
            type="text"
            name="details"
            value={placeinfo.details}
            onChange={onUpdateField}
          />
          <input
            placeholder="category"
            type="text"
            name="category"
            value={placeinfo.category}
            onChange={onUpdateField}
          />
          <select name="days" onChange={onUpdateField}>
            <option>No.of days</option>
            {days.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
          <select name="busType" onChange={onUpdateField}>
            <option>Bus Types</option>
            {busType.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
          <input
            placeholder="choose picture"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Btn type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}

export default AddPlaces;
