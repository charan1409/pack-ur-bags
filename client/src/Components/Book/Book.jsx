import React from "react";
import Img from "./img"
import photo from "../viewplaces/places/beach/barefoot.jpg"
import Form from "./Form";
import "./book.css"
import Header from "../Navbar/Header";
function App() {
    return (
        <div className="book">
                <Header user={true}/>
                <div><h1 className="heading">
                    <span>B</span>
                    <span>O</span>
                    <span>O</span>
                    <span>K</span>
                    <span className="space"></span>
                    <span>N</span>
                    <span>O</span>
                    <span>W</span>
                </h1></div>
                <div className="row">
                    <div className="box"><Img photo={photo} alt="Enjoy your trip" /></div>          
                    <div className="box"><Form /></div>
                </div>
        </div>
    )
}
export default App;