import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import "./clientprofile.css";
import Tabledata from "./Tabledata";
import Edityourprofile from "./Edityourprofile";
import ChangePassword from "./ChangePassword";
import axios from "axios";

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
function Profile(props) {
  const hiddenFileInput = useRef(null);

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [fd, setFd] = useState({});
  const [edit, setEdit] = useState(false);
  const [pass, setPass] = useState(false);
  const [feededit, setFeededit] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:9000/users/loguser/${userL.username}`)
      .then(async (resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        setFd(resp.data.fd);
        if (resp.data.user) return setUser(resp.data.user);
        else navigate("/error");
      });
    setEdit(false);
  }, [updated, setEdit]);

  const update = () => {
    setUpdated(!updated);
  };

  const profileHandler = async (e) => {
    if (e.target.files[0]) {
      const fd = new FormData();
      fd.append("image", e.target.files[0], e.target.files[0].name);
      fd.append("email", user.email);
      await axios
        .post("http://localhost:9000/profile/upload", fd)
        .then((resp) => {
          if (resp.status === 200) {
            update();
            alert(resp.data.succ);
          } else {
            navigate("/error");
          }
        });
    }
  };
  const imgDeleteHandler = async () => {
    const fd = {
      email: user.email,
    };
    await axios
      .post("http://localhost:9000/profile/remove", fd)
      .then((resp) => {
        if (resp.status === 200) {
          update();
          alert(resp.data.succ);
        } else {
          navigate("/error");
        }
      });
  };

  const changeFeedback = async (e) => {
    alert(feedback);
    const fd = {
      username: user.username,
      feedback: feedback,
    };
    await axios
      .post("http://localhost:9000/profile/feedback", fd)
      .then((resp) => {
        if (resp.status === 200) {
          update();
          alert(resp.data.succ);
        } else {
          navigate("/error");
        }
      });
  };

  const deleteFeedback = async () => {
    await axios
      .delete(`http://localhost:9000/profile/deletefeedback/${user.username}`)
      .then((resp) => {
        if (resp.status === 200) {
          update();
          alert(resp.data.succ);
        } else {
          navigate("/error");
        }
      });
  };

  return (
    <div>
      <Header user={user} navItems={navItems} />
      <div className="profile-background">
        <div className="white-panel">
          <div className="user-details">
            <h1 className="h1">Profile</h1>
            <hr style={{ height: "1px", backgroundColor: "black" }} />
            <div className="profile">
              <div className="_left">
                <div className="_img">
                  <img src={user.image} alt="profile_img" />
                  <div className="img_content">
                    <i
                      className="bi bi-upload fa-3x"
                      onClick={() => hiddenFileInput.current.click()}
                    ></i>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={hiddenFileInput}
                      name="image"
                      onChange={profileHandler}
                    ></input>
                    {user.imagegiven && (
                      <i
                        className="bi bi-trash fa-3x"
                        onClick={imgDeleteHandler}
                      ></i>
                    )}
                  </div>
                </div>
              </div>
              <div className="_right">
                {edit ? (
                  <div className="edit-form">
                    <h2>edit your profile</h2>
                    <Edityourprofile username="User" updated={update} />
                    <span onClick={() => setEdit(false)}>x</span>
                  </div>
                ) : (
                  <table>
                    <Tabledata heading={"Username:"} data={user.username} />
                    <Tabledata heading={"Name:"} data={user.name} />
                    <Tabledata heading={"Email:"} data={user.email} />
                    <Tabledata heading={"Gender:"} data={user.gender} />
                    <Tabledata
                      heading={"Phone Number:"}
                      data={user.phonenumber}
                    />
                  </table>
                )}
                <div className="btns">
                  {!edit && (
                    <button
                      className="btn_profile"
                      onClick={() => setEdit(true)}
                    >
                      edit profile
                    </button>
                  )}
                  <button
                    className="btn_profile"
                    onClick={() => {
                      axios
                        .post("http://localhost:9000/users/generateOTP", {
                          email: user.email,
                          keyword: "change password",
                        })
                        .then((resp) => {
                          if (resp.status === 200) {
                            alert(resp.data.succ);
                            setPass(true);
                          } else {
                            alert("something went wrong");
                            navigate("/error");
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    change password
                  </button>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-down">
        <hr style={{ height: "5px", backgroundColor: "black" }} />
        <div className="latest-upcoming-booking" style={{ height: "150px" }}>
          <h2>
            Your latest upcoming booking will appear here with view all booking
            buttons
          </h2>
        </div>

        <hr style={{ height: "5px", backgroundColor: "black" }} />
        <div className="user-feedback" style={{ height: "450px" }}>
          <h2>
            {fd ? (
              <div className="">
                <div className="profile-feed">
                  <h3>Feedback</h3>
                  {fd.feedback}
                </div>
                <br />
                {feededit ? (
                  <i
                    className="bi bi-x-square fa-2x"
                    style={{ cursor: "pointer" }}
                    onClick={() => setFeededit(false)}
                  ></i>
                ) : (
                  <i
                    style={{ cursor: "pointer", color: "green" }}
                    className="bi bi-pencil-square fa-2x"
                    onClick={() => setFeededit(true)}
                  ></i>
                )}
                {fd && (
                  <i
                    className="bi bi-trash fa-2x"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={deleteFeedback}
                  ></i>
                )}
                {feededit && (
                  <div className="feedback">
                    <textarea
                      name="feedback"
                      id="feedback"
                      cols="30"
                      rows="5"
                      placeholder="Your feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                    <br />
                    <button className="btn_profile" onClick={changeFeedback}>
                      submit
                    </button>
                  </div>
                )}
              </div>
            ) : (
              "Your submitted feedback will appear here."
            )}
          </h2>
        </div>
        <hr style={{ height: "5px", backgroundColor: "black" }} />

        <div className="user-reviews" style={{ height: "150px" }}>
          <h2>Your reviews to your tours will appear here with edit option.</h2>
        </div>
        <hr style={{ height: "5px", backgroundColor: "black" }} />

        <div>
          {pass && (
            <div className="pass-modal-bg">
              <div className="edit-form">
                <h2>Change your password</h2>
                <ChangePassword
                  onClick={() => {
                    setPass(false);
                  }}
                />
                <span onClick={() => setPass(false)}>x</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
