import React from "react";
import "./style.css";
import Component from "./PlacesHotelComponent";
import Header from "../Main/Header";
import img from "../viewplaces/img.jpg"
import { useLocation } from 'react-router-dom';

const hotel1=[{id:1,hotel:"Blue Ocean Hotels and Resorts",location:"Swastik Ave, Chinnadi Kuppam, Injambakkam, Chennai,Tamil Nadu 600014",direction:"A minute’s walk from the closest beach along the Bay of Bengal, this casual hotel in a residential neighbourhood is 8 km from Taramani train station and 12 km from Guindy National Park.",price:"1000"},
{id:2,hotel:"Blue Bay Beach Resort",location:"Vadanemilli Village (Before Crocodile Park, SH 49,Mahabalipuram,Tamil Nadu 603104",direction:"Overlooking a sandy beach, this straightforward resort is 10 km from DakshinaChitra museum, and a 5-minute walk from The Madras Crocodile Bank Trust and Centre for Herpetology",price:"1200"},
{id:3,hotel:"Sunshine Resort",location:"Chennai,Tamil nadu",direction:"10 min walk from railway station",price:"900"}];

function App(){
    const { state } = useLocation();
    console.log(state.post_id);
    return(
        <div>
            <Header user={true}/>
            {(state.post_id === 1) && 
            <Component photo={state.post_photo} to={state.post_to} rate={state.post_rate} details={state.post_det} img={img} hotels={hotel1} description="bye" username="kamal" review="good" />
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