import React from "react";
import "./style.css";
import Component from "./PlacesHotelComponent";
import Header from "../Main/Header";
import img from "../viewplaces/img.jpg"

function App(){
    return(
        <div>
            <Header user={true}/>
            <Component photo={img} to="Blue Ocean" rate="4" details="Located On The Beach Front, Over The Paradisiacal Beaches Of White Sand And Turquoise Water Of Bavaro, The Ocean Blue & Sand Hotel Boasts A Complete Structure Perfectly Integrated To Its Setting." img={img} username="kamal" review="good" />
           
        </div>
    )
}
export default App;