import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Navbar/Header";
import "./Trans.css";
import axios from "axios";

const Transaction = (props) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const [trans, setTrans] = useState([]);
  
  const removeItems = (key) => {
    const newset = trans.filter((ob, a) => a !== key);
    setTrans([...newset]);
  };
  useEffect(() => {
    axios.get(`http://localhost:9000/payment/getTransactions/${user.username}`).then((resp) => {
      console.log(resp.data);
      return setTrans(resp.data);
    });
  }, []);

  const navItems = [
    {
      title: "Home",
      path: "/index",
    },
    {
      title: "Gallery",
      path: "/index/#gallery",
    },
    {
      title: "Places",
      path: "/places/all",
    },
    {
      title: "Services",
      path: "/index/#services",
    },
  ];

  return (
    <div>
      <Header user={true} navItems={navItems} />
      <Link to="/payment">
        <input type="submit" className="btn" value="Payment" />
      </Link>
      {trans.length === 0 ? (
        <h1>Transactions are Empty</h1>
      ) : (
        <div>
          <div className="item-class">
            {trans
              ? trans.map((item, key) => {
                  return (
                    <div className="item-box" key={key}>
                      <h2>Card Number : {item.number}</h2>
                      <h2>Name : {item.name}</h2>
                      <h2>Month : {item.month}</h2>
                      <h2>Year : {item.year}</h2>
                      <h2>CVV: {item.cvv}</h2>
                      <div className="addtocart">
                        <button
                          onClick={() => {
                            removeItems(key);
                            alert("You will contacted for Refund");
                          }}
                          className="book-btn btn-primary"
                        >
                          Cancel and Refund{" "}
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
