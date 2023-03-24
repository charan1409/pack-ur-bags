import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Navbar/Header";
import "./ViewAll.css";

const ViewAll = () => {
  const { id } = useParams();
  const [tours, setTours] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:9000/payment/mybookings/${id}`).then((resp) => {
      if (resp.status !== 200) {
        alert(resp.data.msg);
      } else {
        console.log(resp.data);
        return setTours(resp.data);
      }
    });
  }, []);
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
    {
      title: "feedbacks",
      path: "/feedbacks",
    },
  ];
  return (
    <>
      <Header user={true} navItems={navItems} />
      <div>
        {tours.length === 0 ? (
          <h1>Your Tour List is Empty</h1>
        ) : (
          <div>
            <div className="tour-item-class">
              {tours
                ? tours.map((item, key) => {
                    return (
                      <div className="tour-item-box" key={key}>
                        <div className="tour-details">
                          <table>
                            <tr style={{ fontSize: "20px" }}>
                              <th>From</th>
                              <th>To</th>
                              <th>No. of Passengers</th>
                              <th>Departure</th>
                              <th>Arrival</th>
                              <th>Total amount</th>
                            </tr>
                            <tr>
                              <td>{item.from}</td>
                              <td>{item.to}</td>
                              <td>{item.numberOfpassengers}</td>
                              <td>{item.fromdate}</td>
                              <td>{item.todate}</td>
                              <td>{item.numberOfpassengers * item.price}</td>
                            </tr>
                          </table>
                          <>
                            {item.passengers.map((passenger, key) => {
                              return (
                                <table>
                                  <tr style={{ fontSize: "20px" }}>
                                    <th>Passenger {key + 1}</th>
                                  </tr>
                                  <tr>
                                    <td>Name: {passenger.name}</td>
                                  </tr>
                                </table>
                              );
                            })}
                          </>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewAll;
