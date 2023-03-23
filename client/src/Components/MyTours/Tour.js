import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import "./Tour.css";
import axios from "axios";
import Btn from "../Btn";
import Loading from "../Loading/Loading";

const Tours = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
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

  const [tours, setTours] = useState([]);
  const userL = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(`http://localhost:9000/payment/mybookings/${userL.username}`)
      .then((resp) => {
        console.log(resp.data);
        setLoading(false);
        return setTours(resp.data);
      });
  }, [userL.username, setTours]);

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:9000/users/loguser/${userL.username}`)
      .then((resp) => {
        return setUser(resp.data.user);
      });
  }, []);

  return (
    <div>
      <Header user={user} navItems={navItems} />

      {loading ? (
        <Loading />
      ) : (
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
                            <h2>From : {item.from}</h2>
                            <h2>To : {item.to}</h2>
                            <h2>
                              Number of Passengers: {item.numberOfpassengers}
                            </h2>
                            <h2>Date of Departure: {item.fromdate}</h2>
                            <h2>Date of Arrival: {item.todate}</h2>
                            <h2>
                              Total amount:{" "}
                              {item.numberOfpassengers * item.price}
                            </h2>
                          </div>
                          <div className="tour-button">
                            <Btn
                              value="Continue booking"
                              type="button"
                              onClick={() => {
                                navigate(`/payment/${item.id}`);
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

export default Tours;
