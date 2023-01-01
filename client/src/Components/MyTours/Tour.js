import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Navbar/Header";
import "./Tour.css";
import axios from "axios";

const Tours = () => {
  const navItems = [
    {
      title: "Home",
      path: "/index",
    },
  ];

  const [tours, setTours] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${user.id}`).then((res) => {
      const user = res.data;
      setTours(user.tours);
    });
    // eslint-disable-next-line
  }, [tours.length]);

  return (
    <div>
      <Header user={true} navItems={navItems} />
      <Link to="/book">
        <input type="submit" className="btn" value="Book Page" />
      </Link>
      {tours.length === 0 ? (
        <h1>Your Tour List is Empty</h1>
      ) : (
        <div>
          <div className="item-class">
            {tours
              ? tours.map((item, key) => {
                  return (
                    <div className="item-box" key={key}>
                      <h2>From : {item.from}</h2>
                      <h2>To : {item.to}</h2>
                      <h2>Number of Adults: {item.adult}</h2>
                      <h2>Number of Child: {item.child}</h2>
                      <h2>Date of Departure: {item.depart}</h2>
                      <h2>Date of Arrival: {item.arrival}</h2>
                      <h2>Total amount: {5000 + item.adult*100}</h2>
                      <div className="addtocart">
                        <div>
                          <button
                            onClick={() => {
                              const user = JSON.parse(
                                localStorage.getItem("user")
                              );
                              axios
                                .get(`http://localhost:3001/users/${user.id}`)
                                .then((res) => {
                                  axios
                                    .put(
                                      `http://localhost:3001/users/${user.id}`,
                                      {
                                        ...res.data,
                                        tours: res.data.tours.filter(
                                          (ob, a) => a !== key
                                        ),
                                      }
                                    )
                                    .then((res) => {
                                      setTours(res.data.tours);
                                    });
                                });
                            }}
                            className="book-btn btn-primary"
                          >
                            Remove{" "}
                          </button>
                        </div>
                        <div>
                          <Link to="/payment">
                            <input
                              type="submit"
                              className="book-btn"
                              value="Book"
                            />
                          </Link>
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
  );
};

export default Tours;
