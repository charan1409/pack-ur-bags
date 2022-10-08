import React from "react";
import img from "../viewplaces/img.jpg"
import Img from "../viewplaces/img"
import Place from "../viewplaces/details"
import Rating from "../viewplaces/rating"
import Info from "./info"
import Review from "./review"
import "./style.css"
import Btn from "../Btn"
import { Link } from "react-router-dom";
function App(){
    return(
        <div>
            <div className="place-box">
                <div className="heading">
                    <Img photo={img}/>
                    <div className="details">
                        <div className="content">
                            <Place to="Blue Ocean" details="Satus:"/>
                            <Rating rate="4"/>
                        </div>
                        
                        <Link to="/book"><Btn type="button" value="Book"/></Link>
                    </div>
                </div>
                <Info details="Located On The Beach Front, Over The Paradisiacal Beaches Of White Sand And Turquoise Water Of Bavaro, The Ocean Blue & Sand Hotel Boasts A Complete Structure Perfectly Integrated To Its Setting."/>
                <Review image={img} username={"kamal"} review={"good"} type="button" name="Submit"/>
           </div>
           
        </div>
    )
}
export default App;