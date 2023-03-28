import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Navbar/Header";
import Btn from "../Btn";
import axios from "axios";
import "./AddPlaces.css";
import { navItems } from "./NavItems";

function AddPlaces(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const days = ["Three", "Five", "Both"];
  const busType = ["AC", "NON-AC", "Both"];
  const { id } = useParams();

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

  useEffect(() => {
    if (props.keyType === "edit") {
      axios.get(`http://localhost:9000/admins/place/${id}`).then((resp) => {
        if (resp.status !== 200) {
          alert(resp.data.msg);
        } else {
          const pl = {
            from: resp.data.from,
            to: resp.data.to,
            price: resp.data.price,
            details: resp.data.details,
            category: resp.data.category,
            busType: resp.data.busType,
            days: resp.data.days,
          };
          setplaceinfo(pl);
          console.log("dfkgo" + placeinfo.from);
        }
      });
    }
  }, []);

  const onUpdateField = (e) => {
    const nextFieldState = {
      ...placeinfo,
      [e.target.name]: e.target.value,
    };
    setplaceinfo(nextFieldState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("id", new Date().valueOf() + Math.floor(Math.random() * 10));
    fd.append("from", placeinfo.from);
    fd.append("to", placeinfo.to);
    fd.append("details", placeinfo.details);
    fd.append("category", placeinfo.category);
    fd.append("busType", placeinfo.busType);
    fd.append("days", placeinfo.days);
    fd.append("photo", image);
    axios
      .post(`http://localhost:9000/admins/place/${user.username}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((resp) => {
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
          navigate("/error");
        }
      });
  };
  return (
    <div>
      <Header user={true} navItems={navItems} />
        <h1>Add place</h1>
      <div className="add">
        <form
          onSubmit={submitHandler}
          className="addadmin"
          style={{ height: "650px", width: "600px" }}
        >
          <label htmlFor="from">
            From:
            <input
              placeholder={"from"}
              leftIcon={"bi bi-geo-alt-fill"}
              type={"text"}
              name={"from"}
              value={placeinfo.from}
              onChange={onUpdateField}
            />
          </label>

          <label htmlFor="to" style={{marginLeft: "30%"}}>
            To:
          <input
            placeholder={"to"}
            leftIcon={"bi bi-geo-alt-fill"}
            type={"text"}
            name={"to"}
            value={placeinfo.to}
            onChange={onUpdateField}
          />
          </label>
          <label htmlFor="price"> Price:
          <input
            placeholder={"price"}
            leftIcon={"bi bi-cash"}
            type={"number"}
            name={"price"}
            value={placeinfo.price}
            onChange={onUpdateField}
          />
          </label>

          <label htmlFor="details" style={{marginLeft: "30%"}}>
            Details:
          <input
            placeholder={"details"}
            leftIcon={"bi bi-card-text"}
            type={"text"}
            name={"details"}
            value={placeinfo.details}
            onChange={onUpdateField}
          />
          </label>

          <input
            placeholder={"category"}
            leftIcon={"bi bi-card-text"}
            type={"text"}
            name={"category"}
            value={placeinfo.category}
            onChange={onUpdateField}
          />

          <select name="days" onChange={onUpdateField} style={{marginLeft: "30%"}}>
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
            style={{marginLeft: "30%"}}
            placeholder="choose picture"
            type="file"
            name="photo"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Btn type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}

export default AddPlaces;
