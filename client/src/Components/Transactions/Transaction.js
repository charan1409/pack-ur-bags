import React, { useState, useEffect } from "react";
import Header from "../Navbar/Header";
import "./Trans.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import Btn from "../Btn";

const Transaction = (props) => {
  const [user, setUser] = useState({});
  const [trans, setTrans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeItems = (key) => {
    const newset = trans.filter((ob, a) => a !== key);
    setTrans([...newset]);
  };
  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:9000/users/loguser/${userL.username}`)
      .then((resp) => {
        return setUser(resp.data.user);
      });
    axios
      .get(`http://localhost:9000/payment/getTransactions/${userL.username}`)
      .then((resp) => {
        setLoading(false);
        console.log("This is Payment", resp.data);
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
      <Header user={user} navItems={navItems} />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {trans.length === 0 ? (
            <h1>Transactions are Empty</h1>
          ) : (
            <div className="">
              <div className="tour-item-class">
                {trans
                  ? trans.map((item, key) => {
                      return (
                        <div className="tour-item-box" key={key}>
                          <div className="trans-detail-table">
                            <table style={{ width: "100%" }}>
                              <tr>
                                <th>Card Number</th>
                                <th>{item.number}</th>
                              </tr>
                              <tr>
                                <th>Name</th>
                                <th>{item.name}</th>
                              </tr>
                              <tr>
                                <th>Month</th>
                                <th>{item.month}</th>
                              </tr>
                              <tr>
                                <th>Year</th>
                                <th>{item.year}</th>
                              </tr>
                              <tr>
                                <th>CVV</th>
                                <th>{item.cvv}</th>
                              </tr>
                            </table>
                          </div>

                          <div className="tour-button">
                            <Btn
                              value="Cancel"
                              type="button"
                              onClick={() => {
                                removeItems(key);
                                alert("You will contacted for Refund");
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Transaction;
