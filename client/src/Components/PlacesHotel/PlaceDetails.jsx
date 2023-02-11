import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Img from "../viewplaces/ViewplacesComponents/Img";
import Place from "../viewplaces/ViewplacesComponents/Details";
import Rating from "../viewplaces/ViewplacesComponents/Rating";
import Info from "./Info";
import Review from "./Review";
import Header from "../Navbar/Header";
import img from "../viewplaces/img.jpg";
import Btn from "../Btn";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../actions/actions";

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
  const [placedata, setPlacedata] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const userL = JSON.parse(localStorage.getItem("user"));
  if(! props.username.username){
    axios.get(`http://localhost:9000/users/loguser/${userL.username}`)
          .then(async (resp) => {
            dispatch(actionCreators.username(resp.data));
          }) 
  }
  useEffect(() => {
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
  }, []);
  return (
    <div>
      <Header user={true} navItems={navItems} />
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
                    <Link to="/book">
                      <Btn type="button" value="Book" />
                    </Link>
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
const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};
export default connect(mapStateToProps)(App);
