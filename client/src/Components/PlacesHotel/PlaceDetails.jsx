import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Cookies from "js-cookie";

import Img from "../viewplaces/ViewplacesComponents/Img";
import Place from "../viewplaces/ViewplacesComponents/Details";
import Rating from "../viewplaces/ViewplacesComponents/Rating";
import Info from "./Info";
import Review from "./Review";
import Header from "../Navbar/Header";
import Btn from "../Btn";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

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
function App(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [placedata, setPlacedata] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    if (userL) {
      axios
        .get(`http://localhost:9000/users/loguser/${userL.username}`)
        .then((resp) => {
          return setUser(resp.data);
        });
    }
    axios
      .get(`http://localhost:9000/places/placedetails/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          setPlacedata(resp.data);
          setLoading(true);
        } else {
          navigate("/error");
        }
      });
  }, [id, navigate]);
  const bookFunc = () => {
    if (Cookies.get("user") && user) {
      axios.get(`http://localhost:9000/book/booking/${id}`).then((resp) => {
        if (resp.status === 200) {
          navigate(`/book/${id}`);
        } else {
          navigate("/error");
        }
      });
    } else {
      var date = new Date();
      date.setTime(date.getTime() + 60 * 1000);
      Cookies.set("redirect", `/book/${id}`, { expires: date });
      navigate("/login");
    }
  };
  return (
    <div>
      <Header
        user={user}
        navItems={navItems}
        openLoginForm={props.openLoginForm}
      />
      {loading ? (
        <div>
          {placedata && (
            <div className="single-place-details">
              <div className="place-box">
                <div className="heading">
                  <Img photo={placedata.photo} />
                  <div className="details">
                    <div className="content">
                      <Place
                        from={placedata.from}
                        to={placedata.to}
                        details={placedata.status}
                        price={placedata.price}
                        rating={placedata.rating}
                      />
                    </div>
                    <Btn type="button" onClick={bookFunc} value="Book" />
                  </div>
                </div>
                <Info details={placedata.details} />
                {placedata.reviews.length !== 0 ? (
                  <>
                    {placedata.reviews.map((review,index) => {
                      return (
                        <Review
                          key={index}
                          image={
                            "http://localhost:9000/profileImgs/" +
                            review.user.image
                          }
                          username={review.user.username}
                          review={review.review}
                        />
                      );
                    })}
                  </>
                ) : (
                  <h1>No reviews yet</h1>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
