import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import "../Main/main.css";
import img1 from "./img/chip.png";
import img2 from "./img/visa.png";
import Header from "../Navbar/Header";
import { store1 } from "../../App.js";

const Payment = () => {
  const navigate = useNavigate();
  const { trans, setTrans } = useContext(store1);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2021");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`The Card Number Entered is: ${number}`);
    // alert(`The Name Entered is: ${name}`);
    // alert(`The Month Entered is: ${month}`);
    // alert(`The Year Entered is: ${year}`);
    // alert(`The CVV Entered is: ${cvv}`);
    alert(`Payment Successful`);

    const payment_data = {
      number: number,
      name: name,
      month: month,
      year: year,
      cvv: cvv,
    };
    console.log(payment_data);

    setNumber("");
    setName("");
    setMonth("");
    setYear("");
    setCvv("");

    if (!trans.includes(payment_data)) {
      setTrans([...trans, payment_data]);
      console.log(trans);
      navigate("/transactions");
    }
  };

  function number_space() {
    var str = number;
    var res = str.replace(/(.{4})/g, "$1 ");
    return res;
  }

  const navItems = [
    {
      title: "Home",
      path: "/index",
    },
  ];

  return (
    <>
      <Header user={true} navItems={navItems} />
      <div className="container">
        <div className="card-container">
          <div className="front">
            <div className="image">
              <img src={img1} alt="" />
              <img src={img2} alt="" />
            </div>
            <div className="card-number-box">
              {number.length === 0 ? "#### #### #### ####" : number_space()}
            </div>
            <div className="flexbox">
              <div className="box">
                <span>card holder</span>
                <div className="card-holder-name">
                  {name.length === 0 ? "full name" : name}
                </div>
              </div>
              <div className="box">
                <span>expires</span>
                <div className="expiration">
                  <span className="exp-month" style={{ marginRight: "10px" }}>
                    {month.length === 0 ? "mm" : month}
                  </span>
                  <span className="exp-year">
                    {year.length === 0 ? "yy" : year}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="back">
            <div className="stripe"></div>
            <div className="box">
              <span>{cvv.length === 0 ? "cvv" : cvv}</span>
              <div className="cvv-box"></div>
              <img src={img2} alt="" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <span>Amount</span>
            <input
              type="number"
              name="number"
              className="card-number-input"
              required
            />
          </div>
          <div className="inputBox">
            <span>card number</span>
            <input
              type="text"
              name="number"
              maxLength="16"
              className="card-number-input"
              required
              value={number}
              onChange={(x) => {
                // console.log(x.target.value);
                return setNumber(x.target.value);
              }}
            />
          </div>
          <div className="inputBox">
            <span>card holder</span>
            <input
              type="text"
              name="holder"
              className="card-holder-input"
              required
              value={name}
              onChange={(x) => {
                // console.log(x.target.value);
                return setName(x.target.value);
              }}
            />
          </div>
          <div className="flexbox">
            <div className="inputBox">
              <span>expiration month</span>
              <select
                name="expmon"
                id=""
                className="month-input"
                required
                value={month}
                onChange={(x) => {
                  // console.log(x.target.value);
                  return setMonth(x.target.value);
                }}
              >
                <option value="month" disabled>
                  month
                </option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div className="inputBox">
              <span>expiration year</span>
              <select
                name="expyear"
                id=""
                className="year-input"
                required
                value={year}
                onChange={(x) => {
                  // console.log(x.target.value);
                  return setYear(x.target.value);
                }}
              >
                <option value="year" disabled>
                  year
                </option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
            <div className="inputBox">
              <span>cvv</span>
              <input
                type="text"
                name="cvv"
                maxLength="4"
                className="cvv-input"
                required
                value={cvv}
                onChange={(x) => {
                  // console.log(x.target.value);
                  return setCvv(x.target.value);
                }}
                onMouseEnter={() => {
                  document.querySelector(".front").style.transform =
                    "perspective(1000px) rotateY(-180deg)";
                  document.querySelector(".back").style.transform =
                    "perspective(1000px) rotateY(0deg)";
                }}
                onMouseLeave={() => {
                  document.querySelector(".front").style.transform =
                    "perspective(1000px) rotateY(0deg)";
                  document.querySelector(".back").style.transform =
                    "perspective(1000px) rotateY(180deg)";
                }}
              />
            </div>
          </div>
          <input type="submit" value="Pay" className="submit-btn" />
        </form>
      </div>
    </>
  );
};

export default Payment;
