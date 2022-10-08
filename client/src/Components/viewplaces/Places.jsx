import React from "react";
import Rating from "./rating";
import Img from "./img";
import Details from "./details";
import Btn from "../Btn";
import Heading from "./heading";
import photo from "./img.jpg";
import "./style.css"
import { Link } from "react-router-dom";
function App(){
    return(<div>
        <Heading category="how are you"/>
        <div className="place-box1">
            <Img photo={photo} alt="bye"/>
            <div class="place-details">
            <Details to="sricity" details="hi"/>
            <Rating rate="4"/>
            <div className="button-holder">
            <Link to="/book"><Btn type="button" value="Book"/></Link>
            <Link to="/placeshotel"><Btn type="button" value="See more"/></Link>
            </div>
        </div></div></div>
    )
}
export default App;