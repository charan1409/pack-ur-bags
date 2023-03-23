import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Navbar/Header";

const ViewAll = () => {
  const { id } = useParams();
  const [tours, setTours] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:9000/admins/tours/${id}`).then((resp) => {
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
      {tours.map((tour) => {
        return (
          <div>
            <h2>{tour.fromdate}</h2>
            <h2>{tour.todate}</h2>
          </div>
        );
      })}
    </>
  );
};

export default ViewAll;
