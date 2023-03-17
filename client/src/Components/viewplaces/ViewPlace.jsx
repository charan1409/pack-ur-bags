import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./ViewplacesComponents/Heading";
import "./style.css";
import Header from "../Navbar/Header";
import Components from "./ViewplacesComponents/PlacesComponent";
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
  const [placesData, setPlacesData] = useState([]);
  const params = useParams();
  const [category, setCategory] = useState(params.id);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userL = JSON.parse(localStorage.getItem("user"));
  if(! props.user){
    axios.get(`http://localhost:9000/users/loguser/${userL.username}`)
          .then(async (resp) => {
            dispatch(actionCreators.user(resp.data));
          }) 
  }

  useEffect(() => {
    axios
      .get(`http://localhost:9000/places/places/${category}`)
      .then((resp) => {
        setPlacesData(resp.data);
        setLoading(true);
      });
  }, [category]);
  return (
    <div className="viewAllPlaces">
      <Header user={true} navItems={navItems} />

      <div className="head">
        <Heading category="Places" />
        {params.id === "all" ? (
          <div className="allselect">
            <label htmlFor="places">
              Sort by:
              <select
                name="places"
                id="places"
                onChange={(event) => {
                  setCategory(event.target.value);
                  setLoading(false);
                }}
                value={category}
              >
                <option value="all">all</option>
                <option value="beach">beach</option>
                <option value="island">island</option>
                <option value="countryside">countryside</option>
                <option value="desert">desert</option>
                <option value="forest">forest</option>
                <option value="cultural">cultural</option>
                <option value="winter">winter</option>
                <option value="hillstation">hillstation</option>
              </select>
            </label>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {loading ? (
        <div>
          <div>
            {placesData &&
              placesData.map((x) => (
                <Components
                  key={x.id}
                  photo={x.photo}
                  from={x.from}
                  to={x.to}
                  details={x.details}
                  price={x.price}
                  onClickBook={() => {
                    navigate(`/book/${x.id}`);
                  }}
                  onClick={() => {
                    navigate(`/placedetails/${x.id}`);
                  }}
                />
              ))}
          </div>
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
