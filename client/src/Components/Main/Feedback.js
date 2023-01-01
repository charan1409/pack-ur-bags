import React from "react";
import "./main.css";
import { useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [fdbk, setFdbk] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // Not Refreshing Page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fdbk) alert("please give your feedback");
    else {
      const feedback_data = {
        username: user.username,
        image: user.image,
        fdbk: fdbk,
      };
      axios
        .post("http://localhost:9000/index/fd", feedback_data)
        .then((resp) => {
          alert(resp.data.success);
        });
      setFdbk("");
    }
  };

  return (
    <>
      {user.feedbackgiven ? (
        <h2>Thank's for giving your feedback😎</h2>
      ) : (
        <>
          <div className="fd_bk">
            <span>Give Feedback</span>
            <div className="shortdesc2">
              <p>Please share your valuable feedback to us</p>
            </div>
          </div>
          <div className="feed_box">
            <div className="feed">
              <form onSubmit={handleSubmit}>
                <label>
                  Your feedback
                  <br />
                  <textarea
                    value={fdbk}
                    onChange={(x) => setFdbk(x.target.value)}
                    name="addtional"
                  ></textarea>
                  <br />
                </label>
                <button type="submit" id="fsubmit" style={{ fontSize: "20px" }}>
                  Submit feedback
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Feedback;
