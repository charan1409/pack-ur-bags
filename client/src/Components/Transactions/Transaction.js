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

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:9000/users/loguser/${userL.username}`)
      .then((resp) => {
        return setUser(resp.data);
      });
    axios
      .get(`http://localhost:9000/payment/getTransactions/${userL.username}`)
      .then((resp) => {
        setLoading(false);
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
                      var fromDate = new Date(item.fromdate);
                      fromDate.setDate(fromDate.getDate() - 3);
                      return (
                        <div className="tour-item-box" key={key}>
                          <div className="trans-detail-tableup">
                            <table style={{ width: "100%" }}>
                              <tr>
                                <th>From</th>
                                <td>{item.placedetails.from}</td>
                              </tr>
                              <tr>
                                <th>To</th>
                                <td>{item.placedetails.to}</td>
                              </tr>
                              <tr>
                                <th>No. of Passengers</th>
                                <td>{item.numberOfpassengers}</td>
                              </tr>
                              <tr>
                                <th>Departure</th>
                                <td>{item.fromdate}</td>
                              </tr>
                              <tr>
                                <th>Arrival</th>
                                <td>{item.todate}</td>
                              </tr>
                              <tr>
                                <th>Total amount</th>
                                <td>
                                  {item.numberOfpassengers *
                                    item.placedetails.price}
                                </td>
                              </tr>
                            </table>
                          </div>

                          <div className="trans-detail-tabledown">
                            <table style={{ width: "100%" }}>
                              <tr>
                                <th>Card Number</th>
                                <th>{item.paymentDetails.number}</th>
                              </tr>
                              <tr>
                                <th>Name</th>
                                <th>{item.paymentDetails.name}</th>
                              </tr>
                              <tr>
                                <th>CVV</th>
                                <th>{item.paymentDetails.cvv}</th>
                              </tr>
                            </table>
                            <div className="trans-btn">
                              {new Date(item.todate) < new Date(Date.now()) ? (
                                <Btn
                                  value="Feedback"
                                />
                              ) : new Date(fromDate) > new Date() ? (
                                <Btn
                                  value="Cancel"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    axios
                                      .delete(
                                        `http://localhost:9000/payment/deleteBooking/${item.id}`
                                      )
                                      .then((resp) => {
                                        alert(resp.data.msg);
                                        window.location.reload();
                                      });
                                  }}
                                />
                              ) : (
                                <h2>Enjoy trip</h2>
                              )}
                            </div>
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
