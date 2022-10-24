import React from "react";
import Heading from "./ViewplacesComponents/heading";
import "./style.css"
import Header from "../Main/Header"
import Components from "./ViewplacesComponents/PlacesComponent";
import photo1 from "./places/beach/blue-ocean-resort.jpg"
import photo2 from "./places/beach/paradise.jpg"
import photo3 from "./places/beach/radisson.jpg"
import photo4 from "./places/beach/cherai.jpg"
import photo5 from "./places/beach/barefoot.jpg"
import photo6 from "./places/beach/taj_fisher.jpg"
import { useNavigate } from 'react-router-dom';

const beaches = [{ id: 1, photo: photo1, to: "Blue Ocean", details: "Located on the beach front, over the paradisiacal beaches of white sand and turquoise water of Bavaro, the Ocean Blue & Sand hotel boasts a complete structure perfectly integrated to its setting.", rate: "4" },
{ id: 2, photo: photo2, to: "Mangalore", details: "The river cruises start from Tourist Jetty on Mandovi river in Panaji town on Old Panaji Road. Each cruise is triple decked and a lovely panoramic view of the city of Panjim.", rate: "4" },
{ id: 3, photo: photo3, to: "Manali", details: "The top things to do in Himachal pradesh are Manali, Shimla, Mcleodganj, Dalhousie, Spiti,Kasol.You can see all the places to visit in Himachal pradesh here", rate: "4" },
{ id: 4, photo: photo4, to: "Cherai", details: "Imagine a mix of everything that Cherai has to offer, the beach, the backwaters, the smell of the palm trees, the view of the tall coconut trees and the far-stretched paddy fields all at one place; Cherai Beach Resort is that very place!", rate: "4" },
{ id: 5, photo: photo5, to: "Kodaikanal", details: "Kodaikanal is a hill town in the southern Indian state of Tamil Nadu. It’s set in an area of granite cliffs, forested valleys, lakes, waterfalls and grassy hills.", rate: "4" },
{ id: 6, photo: photo6, to: "Delhi", details: "Delhi showcases an ancient culture and a rapidly modernising country. Dotted with monuments there is much to discover here.", rate: "4" }]


function App() {
    const navigate = useNavigate();
    const createPost = (val, to, det, rate, photo) => {
        navigate('/BeachesHotel',
            {
                state: {
                    post_id: val,
                    post_to: to,
                    post_det: det,
                    post_rate: rate,
                    post_photo: photo
                }
            });
    }
    return (
        <div>
            <Header user={true} />
            <Heading category="Beaches" />
            <div>
                {beaches.map((x) => (<Components photo={x.photo} to={x.to} details={x.details} rate={x.rate} onClick={() => { createPost(x.id, x.to, x.details, x.rate, x.photo) }} />))}
            </div>
        </div>
    )
}
export default App;