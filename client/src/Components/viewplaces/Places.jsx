import React from "react";
import Heading from "./heading";
import "./style.css"
import Header from "../Main/Header"
import Components from "./PlacesComponent";
import photo from "./img.jpg";

function App(){
    return(<div>
        <Header user={true}/>
        <Heading category="how are you"/>
        <Components photo={photo} to="sricity" details="hi" rate="4" />
        </div>
    )
}
export default App;