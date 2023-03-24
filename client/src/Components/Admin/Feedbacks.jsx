import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Navbar/Header";
import "./Feedbacks.css";
import Loading from "../Loading/Loading";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:9000/admins/feedbacks").then((resp) => {
      if (resp.status !== 200) {
        alert(resp.data.msg);
      } else {
        setLoading(false);
        console.log(resp.data);
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
      <h1>Feedbacks of User's</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="feedbacks">
          {feedbacks.map((feedback) => {
            return (
              <div>
                <div className="adminfeed">
                  <img src={feedback.image} alt="" />
                  <h3>{feedback.username}</h3>
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <p>{feedback.feedback}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Feedbacks;
