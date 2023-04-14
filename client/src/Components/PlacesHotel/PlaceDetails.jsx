import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useCookies } from "react-cookie";

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
  const [cookies,setCookie] = useCookies(["user","redirectLink"]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [placedata, setPlacedata] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    // const userL = JSON.parse(localStorage.getItem("user"));
    // axios
    //   .get(`http://localhost:9000/users/loguser/${userL.username}`)
    //   .then((resp) => {
    //     return setUser(resp.data);
    //   });
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
  }, [id,navigate]);
  const bookFunc = ()=>{
    if (cookies.user && user) {
      axios.get(`http://localhost:9000/book/booking/${id}`)
      .then((resp)=>{
        if(resp.status === 200){
          navigate(`/book/${id}`);
        } else{
          navigate('/error');
        }
      })
    } else{
      setCookie("redirectLink",`/book/${id}`,{path:"/", maxAge: 300 });
      navigate("/login");
    }
  }
  return (
    <div>
      <Header user={user} navItems={navItems} openLoginForm={props.openLoginForm}/>
      {loading ? (
        <div>
          {placedata && (
            <div className="single-place-details">
              <div className="place-box">
                <div className="heading">
                  <Img photo={placedata.placeDetails.photo} />
                  <div className="details">
                    <div className="content">
                      <Place
                        from={placedata.placeDetails.from}
                        to={placedata.placeDetails.to}
                        details={placedata.placeDetails.status}
                        price={placedata.placeDetails.price}
                      />
                      <Rating />
                    </div>
                    <Btn type="button" onClick={bookFunc} value="Book" />
                  </div>
                </div>
                <Info details={placedata.placeDetails.details} />
                {placedata.reviews.length !== 0 ? (
                  <Review
                    image={placedata.reviews.userimage}
                    username={placedata.reviews.username}
                    review={placedata.reviews.review}
                    type="button"
                    name="Submit"
                  />
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
