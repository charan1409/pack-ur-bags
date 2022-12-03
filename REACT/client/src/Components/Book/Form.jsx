import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import { store1 } from "../../App.js";
import axios from "axios";

var todayDate = new Date();
var month = todayDate.getMonth() + 1;
var year = todayDate.getUTCFullYear() - 0;
var tdate = todayDate.getDate();
if (month < 10) {
  month = "0" + month;
}
if (tdate < 10) {
  tdate = "0" + tdate;
}
var maxDate = year + "-" + month + "-" + tdate;

function Form() {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(store1);

  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [adult, setadult] = useState("");
  const [child, setchild] = useState("");
  const [depart, setdepart] = useState("");
  const [arrival, setarrival] = useState("");

  function fromHandle(event) {
    setfrom(event.target.value);
  }
  function toHandle(event) {
    setto(event.target.value);
  }
  function adultHandle(event) {
    setadult(event.target.value);
  }
  function childHandle(event) {
    setchild(event.target.value);
  }
  function departHandle(event) {
    setdepart(event.target.value);
  }
  function arrivalHandle(event) {
    setarrival(event.target.value);
  }

  function clicked(event) {
    const bookData = {
      from: from,
      to: to,
      adult: adult,
      child: child,
      depart: depart,
      arrival: arrival,
    };
    console.log(bookData);

    if (!cartItems.includes(bookData)) {
      // setCartItems([...cartItems, bookData]);
      const user = JSON.parse(localStorage.getItem("user"));
      axios.get(`http://localhost:3001/users/${user.id}`).then((res) => {
        const user = res.data;
        user.tours.push(bookData);
        axios.put(`http://localhost:3001/users/${user.id}`, user);
        alert("Added to cart");
        navigate("/mytours");
      });
    }

    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={clicked}>
        <InputBox
          onchange={fromHandle}
          display="FROM"
          value={from}
          type="text"
          name="from"
          holder="Enter your place"
        />
        <InputBox
          display="TO"
          onchange={toHandle}
          value={to}
          type="text"
          name="dest"
          holder="Enter a Destination"
        />
        <InputBox
          display="number of adults"
          onchange={adultHandle}
          value={adult}
          type="number"
          name="adult"
          holder="number of people"
          min="1"
          max="15"
        />
        <InputBox
          display="number of children"
          onchange={childHandle}
          value={child}
          type="number"
          name="child"
          holder="number of people"
          min="0"
          max="10"
        />

        <div className="arrival">
          <InputBox
            display="Departure"
            onchange={departHandle}
            value={depart}
            type="date"
            name="date1"
            id="dd"
            min={maxDate}
          />
          <InputBox
            display="Arrival"
            onchange={arrivalHandle}
            value={arrival}
            type="date"
            name="date2"
            id="ad"
            min={depart}
          />
        </div>
        {/* <Link to="/payment"><input type="submit" className="book-btn" value="Book" /></Link> */}
        <input type="submit" className="book-btn" value="Add Tour" />
      </form>
    </div>
  );
}
export default Form;
