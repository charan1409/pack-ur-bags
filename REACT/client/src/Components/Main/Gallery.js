import React from "react";
import "./main.css";
import img1 from "./img/1.jpeg";
import img3 from "./img/3.jpeg";
import img4 from "./img/4.jpeg";
import img5 from "./img/5.jpeg";
import img6 from "./img/6.jpeg";
import img7 from "./img/7.jpeg";
import img8 from "./img/8.jpeg";
import img9 from "./img/9.jpeg";
import img10 from "./img/10.jpeg";
import img11 from "./img/11.jpeg";
import img13 from "./img/13.jpg";

import GalleryBox from "./Box";

const Gallery = () => {
  return (
    <div className="section">
      <div className="gallery" id="gallery">
        <h1 className="heading ">
          <span>G</span>
          <span>A</span>
          <span>L</span>
          <span>L</span>
          <span>E</span>
          <span>R</span>
          <span>Y</span>
        </h1>

        <div className="box-container">
          <GalleryBox
            img={img1}
            btn = {false}
            place="Goa"
            data="The top sightseeing places in Goa are Calangute Beach, Basilica of Bom Jesus and more..."
            styleName = ""
          />

          <GalleryBox
            img={img3}
            btn = {false}
            place="Panaji"
            data="The river cruises start from Tourist Jetty on Mandovi river in
          Panaji town on Old Panaji Road."
          styleName = ""
          />

          <GalleryBox
            img={img4}
            btn = {false}
            place="Himachal pradesh"
            data="The top things to do in Himachal pradesh are Manali, Shimla,
          Mcleodganj and more..."
          styleName = ""
          />

          <GalleryBox
            img={img5}
            btn = {false}
            place="Dalhousie"
            data="Dalhousie is a high-altitude across 5 hills near the mountain
          range in the north Indian."
          styleName = ""
          />

          <GalleryBox
            img={img6}
            btn = {false}
            place="Kodaikanal"
            data="Kodaikanal is a hill town in the southern Indian state of Tamil
          Nadu."
          styleName = ""
          />

          <GalleryBox
            img={img7}
            btn = {false}
            place="Delhi"
            data="Delhi showcases an ancient culture and a rapidly modernising
          country."
          styleName = ""
          />

          <GalleryBox
            img={img8}
            btn = {false}
            place="Ooty"
            data="Ooty is a resort town in the Western Ghats mountains, in southern
          India's Tamil Nadu state."
          styleName = ""
          />

          <GalleryBox
            img={img9}
            btn = {false}
            place="kerla"
            data="Kerala is famous especially for its ecotourism initiatives and
          beautiful backwaters."
          styleName = ""
          />

          <GalleryBox
            img={img10}
            btn = {false}
            place="Kanyakumari"
            data="Kanyakumari is a coastal town in the state of Tamil Nadu on
          India's southern tip."
          styleName = ""
          />

          <GalleryBox
            img={img11}
            btn = {false}
            place="Araku Valley"
            data="Araku Valley is a hill station and valley region in the
          southeastern Indian state of Andhra Pradesh."
          styleName = ""
          />

          <GalleryBox
            img={img13}
            btn = {false}
            place="Agra"
            data="One of the seven wonders of the world, Taj Mahal is located on the
          banks of River Yamuna in Agra..."
          styleName = ""
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
