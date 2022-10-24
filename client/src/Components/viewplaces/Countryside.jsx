import React from "react";
import Heading from "./ViewplacesComponents/heading";
import "./style.css"
import Header from "../Main/Header"
import Components from "./ViewplacesComponents/PlacesComponent";
import photo1 from "./places/countryside/puthur.jpg"
import photo2 from "./places/countryside/thert.jpg"
import photo3 from "./places/countryside/shyam gaon.jpg"
import photo4 from "./places/countryside/chitrakote.jpg"
import photo5 from "./places/countryside/lachen.jpg"
import photo6 from "./places/countryside/hodka.jpg"
import { useNavigate } from 'react-router-dom';

const countryside = [{ id: 1, photo: photo1, to: "Puttur, Andhra Pradesh", details: "This small village in Andhra Pradesh is popular for its agriculture, mangroves and the prominent silk business." },
{ id: 2, photo: photo2, to: "Theerthamalai, Tamil Nadu", details: "The name of the village translates to mean ‘The Hill of holy Water' and has a temple that dates back to the 7th century. Enjoy the calm and quiet that only such villages can provide." },
{ id: 3, photo: photo3, to: "Shyam Gaon, Assam", details: "The small Buddhist locality in Jorhat district known as Shyam Gaon can provide an interesting rural journey in Assam." },
{ id: 4, photo: photo4, to: "Chitrakote, Chhattisgarh", details: "Popular for the folk arts and handicrafts that are made in the village, Chitrakote is also popular for the Chitrakoot waterfalls." },
{ id: 5, photo: photo5, to: "Lachen, Sikkim", details: "This is a small village that is set against a backdrop of snow-capped mountains and conifer trees." },
{ id: 6, photo: photo6, to: "Hodka, Gujarat", details: "The village located in the Kutch or Kachchh district of Gujarat is a beautiful place that has a mix of both the desert of clay and sand that makes the region so unique." }]

function App() {
    const navigate = useNavigate();
    const createPost = (val, to, det, photo) => {
        navigate('/CountrysideHotel',
            {
                state: {
                    post_id: val,
                    post_to: to,
                    post_det: det,
                    post_photo: photo
                }
            });
    }
    return (
        <div>
            <Header user={true} />
            <Heading category="FEW DESTINATIONS FOR RURAL TOURISM IN INDIA" />
            <div>
                {countryside.map((x) => (<Components photo={x.photo} to={x.to} details={x.details} link="/CountrysideHotel" onClick={() => { createPost(x.id, x.to, x.details, x.photo) }} />))}
            </div>
        </div>
    )
}
export default App;