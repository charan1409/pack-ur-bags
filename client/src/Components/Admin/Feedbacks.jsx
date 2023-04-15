import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Navbar/Header";
import "./Feedbacks.css";
import Loading from "../Loading/Loading";
import { navItems } from "./NavItems";

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

  return (
    <>
      <Header user={true} navItems={navItems} />
      <h1>Feedbacks</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="feedbacks">
          {feedbacks &&
            feedbacks.map((feedback) => {
              return (
                <div className="place-box1">
                  <div className="feed-pic">
                    <img src={feedback.userDetails.image} alt={"image"} />
                  </div>
                  <div className="place-details">
                    <h1>{feedback.userDetails.username}</h1>
                    <div>
                      <p>{feedback.feedback}</p>
                    </div>
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
