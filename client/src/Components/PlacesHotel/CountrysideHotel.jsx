import React from "react";
import "./style.css";
import Component from "./PlacesHotelComponent";
import Header from "../Navbar/Header";
import img from "../viewplaces/img.jpg"
import { useLocation } from 'react-router-dom';

function App(){
    const { state } = useLocation();
    return(
        <div>
            <Header user={true}/>
            {(state.post_id === 1) && 
            <Component photo={state.post_photo} to={state.post_to} rate={state.post_rate} details={state.post_det} img={img} username="kamal" review="good" />
            }
            {(state.post_id === 2) && 
            <Component photo={state.post_photo} to={state.post_to} rate={state.post_rate} details={state.post_det} img={img} username="kamal" review="good" />
            }
            {(state.post_id === 3) && 
            <Component photo={state.post_photo} to={state.post_to} rate={state.post_rate} details={state.post_det} img={img} username="kamal" review="good" />
            }
            {(state.post_id === 4) && 
            <Component photo={state.post_photo} to={state.post_to} rate={state.post_rate} details={state.post_det} img={img} username="kamal" review="good" />
            }
            {(state.post_id === 5) && 
            <Component photo={state.post_photo} to={state.post_to} rate={state.post_rate} details={state.post_det} img={img} username="kamal" review="good" />
            }
            {(state.post_id === 6) && 
            <Component photo={state.post_photo} to={state.post_to} rate={state.post_rate} details={state.post_det} img={img} username="kamal" review="good" />
            }
        </div>
    )
}
export default App;