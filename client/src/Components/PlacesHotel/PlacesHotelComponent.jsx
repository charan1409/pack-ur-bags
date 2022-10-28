import React from "react";
import Img from "../viewplaces/ViewplacesComponents/Img"
import Place from "../viewplaces/ViewplacesComponents/Details"
import Rating from "../viewplaces/ViewplacesComponents/Rating"
import Info from "./Info"
import Review from "./Review"
import "./style.css"
import Btn from "../Btn"
import Hotelbox from "./Hotelbox";
import { Link } from "react-router-dom";

function Component(props) {
    return (

        <div className="place-box">
            <div className="heading">
                <Img photo={props.photo} />
                <div className="details">
                    <div className="content">
                        <Place to={props.to} details="Satus:Available" />
                        <Rating rate={props.rate} />
                    </div>

                    <Link to="/book"><Btn type="button" value="Book" /></Link>
                </div>
            </div>
            <Info details={props.details} />
            <div className="Hotelbox">
                <h2>HOTELS NEAR {props.to}</h2><br />
                <p>{props.description}</p>
                <br />
                <div class="box-container">
                    {(props.hotels).map((x)=>(<Hotelbox hotel={x.hotel} location={x.location} direction={x.direction} price={x.price} photo={x.photo} />))}
                </div>
            </div>
            <Review image={props.img} username={props.username} review={props.review} type="button" name="Submit" />
        </div>

    )
}
export default Component;
