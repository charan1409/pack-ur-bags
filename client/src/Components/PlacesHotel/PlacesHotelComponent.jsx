import React from "react";
import Img from "../viewplaces/img"
import Place from "../viewplaces/details"
import Rating from "../viewplaces/rating"
import Info from "./info"
import Review from "./review"
import "./style.css"
import Btn from "../Btn"
import { Link } from "react-router-dom";

function Component(props){
    return(
        <div className="place-box">
                <div className="heading">
                    <Img photo={props.photo} />
                    <div className="details">
                        <div className="content">
                            <Place to={props.to} details="Satus:Available"/>
                            <Rating rate={props.rate}/>
                        </div>
                        
                        <Link to="/book"><Btn type="button" value="Book"/></Link>
                    </div>
                </div>
                <Info details={props.details}/>
                <Review image={props.img} username={props.username} review={props.review} type="button" name="Submit"/>
           </div>
    )
}
export default Component;
