import React from "react";
import Heading from "./ViewplacesComponents/heading";
import "./style.css"
import Header from "../Navbar/Header"
import Components from "./ViewplacesComponents/PlacesComponent";
import photo1 from "./places/cultural/goldentemp.jpg"
import photo2 from "./places/cultural/hampi.jpg"
import photo3 from "./places/cultural/lucknow.jpg"
import photo4 from "./places/cultural/kolkata.jpg"
import photo5 from "./places/cultural/kerala.jpg"
import photo6 from "./places/cultural/hyd.jpg"
import { useNavigate } from 'react-router-dom';

const Cultural = [{ id: 1, photo: photo1, to: "Amritsar: The Golden City", details: "Amritsar is undoubtedly the heart of the Sikh culture in the country where Golden temple is located.Amritsar has many gurudwaras, museums and cultural places that make it one of the best places to experience the Sikh culture." },
{ id: 2, photo: photo2, to: "Hampi: Ancient Kingdom Of Vijaynagar", details: "Hampi is a UNESCO world heritage site situated at the Northern part of Karnataka.This place is famous for Virupaksha temple and holding the ruins of the ancient kingdom of Vijaynagar." },
{ id: 3, photo: photo3, to: "Lucknow: The City Of The Nawabs", details: "With an architecture that is heavily influenced by the Mughals, the Delhi Sultanate, the Nawabs of Awadh and the British, you can imagine how magnificent the heritage and culture of Lucknow is." },
{ id: 4, photo: photo4, to: "Kolkata: The City Of Joy", details: "From the influence of the Nawabs of Bengal to the cultures set by the East India Company, the city of Kolkata has witnessed a tremendous cultural shift and emerged to have one of the most notable literary-rich crowd.Victoria Memorial, Howrah Bridge, Indian Museum, and St. Paul’s Cathedral are the most prominent tourist places in Kolkata." },
{ id: 5, photo: photo5, to: "Kerala: God’s Own Country", details: "The diverse culture of Kerala is a blend of Aryan & Dravidian cultures, with influences drawn time-and-again from other Indian & international places. Hinduism, Islam, and Christianity have contributed majorly to the architecture, the rituals & customs, the performing arts, and the festivals of Kerala." },
{ id: 6, photo: photo6, to: "Hyderabad: The City Of Nizams", details: "Hyderabad, established in 1591 was ruled by Sultans, Mughals, & Nizams before becoming a Princely State under the British Raj. The region was previously under the ancient kingdoms of Chalukyas and Kakatiyas. The city’s architecture is richly influenced by all these cultures." }]


function App() {
    const navigate = useNavigate();
    const createPost = (val, to, det, photo) => {
        navigate('/CulturalHotel',
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
            <Heading category="Some Cultual heritages of India" />
            <div>
                {Cultural.map((x) => (<Components photo={x.photo} to={x.to} details={x.details} link="/CulturalHotel" onClick={() => { createPost(x.id, x.to, x.details, x.photo) }} />))}
            </div>
        </div>
    )
}
export default App;