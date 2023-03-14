import React, { useState, useEffect, useRef } from "react";
import Header from "../Navbar/Header";
import "./clientprofile.css";
import Tabledata from "./Tabledata";
import Edityourprofile from "./Edityourprofile";
import ChangePassword from "./ChangePassword";
import axios from "axios";
import { actionCreators } from "../../actions/actions";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

function change_pass() {
  const modalBg = document.querySelector(".pass-modal-bg");
  modalBg.classList.toggle("bg-active");
}

const navItems = [
  {
    title: "Home",
    path: "/index",
  },
];
function Profile(props) {
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const userval = props.user.user.user;
  const [user, setUser] = useState({});
  const [fd, setFd] = useState({});
  const [edit, setEdit] = useState(false);
  const [feededit, setFeededit] = useState(false);
  const [feedback, setFeedback] = useState("");
  // eslint-disable-next-line
  const userL = JSON.parse(localStorage.getItem("user"));
  const fetchData = async () => {
    await axios
      .get(`http://localhost:9000/users/loguser/${userL.username}`)
      .then(async (resp) => {
        console.log(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        dispatch(actionCreators.user(resp.data));
        setFd(resp.data.fd);
        return setUser(resp.data.user);
      });
  };
  useEffect(() => {
    fetchData();
    setEdit(false);
    // eslint-disable-next-line
  }, []);

  const profileHandler = async (e) => {
    if (e.target.files[0]) {
      const fd = new FormData();
      fd.append("image", e.target.files[0], e.target.files[0].name);
      fd.append("email", userval.email);
      axios.post("http://localhost:9000/profile/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await axios
        .post("http://localhost:9000/profile/upload", fd)
        .then((resp) => {
          if (resp.status === 200) {
            axios
              .get(`http://localhost:9000/users/loguser/${userL.username}`)
              .then(async (response) => {
                dispatch(actionCreators.user(response.data));
              });
            alert(resp.data.succ);
          }
        });
    }
  };
  const imgDeleteHandler = async () => {
    const fd = {
      email: userval.email,
    };
    await axios
      .post("http://localhost:9000/profile/remove", fd)
      .then((resp) => {
        if (resp.status === 200) {
          axios
            .get(`http://localhost:9000/users/loguser/${userL.username}`)
            .then(async (response) => {
              dispatch(actionCreators.user(response.data));
            });
          alert(resp.data.succ);
        }
      });
  };

  const changeFeedback = async (e) => {
    alert(feedback);
    const fd = {
      username: userval.username,
      feedback: feedback,
    };
    await axios
      .post("http://localhost:9000/profile/feedback", fd)
      .then((resp) => {
        if (resp.status === 200) {
          axios
            .get(`http://localhost:9000/users/loguser/${userL.username}`)
            .then(async (response) => {
              dispatch(actionCreators.user(response.data));
            });
          alert(resp.data.succ);
        }
      });
  };

  const deleteFeedback = async () => {
    alert("Delete");
    const fd = {
      username: userval.username,
    };
    await axios
      .delete("http://localhost:9000/profile/deletefeedback", fd)
      .then((resp) => {
        if (resp.status === 200) {
          axios
            .get(`http://localhost:9000/users/loguser/${userL.username}`)
            .then(async (response) => {
              dispatch(actionCreators.user(response.data));
            });
          alert(resp.data.succ);
        }
      });
  };

  return (
    <div>
      <Header user={true} navItems={navItems} />
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
                    <Edityourprofile username="User" />
                    <span onClick={() => setEdit(false)}>x</span>
                  </div>
                ) : (
                  <table>
                    <Tabledata heading={"Username:"} data={userval.username} />
                    <Tabledata heading={"Name:"} data={userval.name} />
                    <Tabledata heading={"Email:"} data={userval.email} />
                    <Tabledata heading={"Gender:"} data={userval.gender} />
                    <Tabledata
                      heading={"Phone Number:"}
                      data={userval.phonenumber}
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
                  <button className="btn_profile" onClick={change_pass}>
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
        <div className="user-feedback" style={{ height: "300px" }}>
          <h2>
            {fd ? (
              <div className="">
                {fd.feedback}
                <br />
                {feededit ? (
                  <i
                    className="bi bi-x-square fa-2x"
                    style={{ cursor: "pointer" }}
                    onClick={() => setFeededit(false)}
                  ></i>
                ) : (
                  <i
                    style={{ cursor: "pointer" }}
                    className="bi bi-pencil-square fa-2x"
                    onClick={() => setFeededit(true)}
                  ></i>
                )}
                {
                  fd && (
                    <i
                      className="bi bi-trash fa-2x"
                      style={{ cursor: "pointer" }}
                      onClick={deleteFeedback}
                    ></i>
                  )
                }
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

        <div className="pass-modal-bg">
          <div className="edit-form">
            <h2>Change your password</h2>
            <ChangePassword username="User" />
            <span onClick={change_pass}>x</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
