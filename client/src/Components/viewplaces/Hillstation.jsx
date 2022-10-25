import React from "react";
import Heading from "./ViewplacesComponents/heading";
import "./style.css"
import Header from "../Navbar/Header"
import Components from "./ViewplacesComponents/PlacesComponent";
import photo from "./img.jpg";

function App(){ 
    return(<div>
        <Header user={true}/>
        <Heading category="Hill station"/>
        <Components photo={photo} to="sricity" details="hi" rate="4" link="/placeshotel"/>
        <Components photo={photo} to="sricity" details="hi" rate="4" link="/placeshotel"/>
        <Components photo={photo} to="sricity" details="hi" rate="4" link="/placeshotel"/>
        <Components photo={photo} to="sricity" details="hi" rate="4" link="/placeshotel"/>
        <Components photo={photo} to="sricity" details="hi" rate="4" link="/placeshotel"/>
        <Components photo={photo} to="sricity" details="hi" rate="4" link="/placeshotel"/>

        </div>
    )
}
export default App;