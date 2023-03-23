import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Navbar/Header";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/admins/feedbacks").then((resp) => {
      if (resp.status !== 200) {
        alert(resp.data.msg);
      } else {
        return setFeedbacks(resp.data);
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
      {feedbacks.map((feedback) => {
        return (
          <div>
            <h1>{feedback.username}</h1>
            <h3>{feedback.feedback}</h3>
          </div>
        );
      })}
    </>
  );
};

export default Feedbacks;
