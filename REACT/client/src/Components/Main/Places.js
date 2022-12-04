import React from "react";
import "./main.css";
import beach from "./img/beach.jpg";
import island from "./img/island.jpg";
import hillstation from "./img/hillStation.jpg";
import forest from "./img/forest.jpg";
import winter from "./img/winter.jpg";
import cultural from "./img/cultural.jpg";
import desert from "./img/Desert.jpg";
import countryside from "./img/countryside.jpg";

import PlacesBox from "./Box";

const Places = () => {
  return (
    <div className="section">
      <div className="places" id="places">
        <h1 className="heading">
          <span>P</span>
          <span>L</span>
          <span>A</span>
          <span>C</span>
          <span>E</span>
          <span>S</span>
        </h1>

        <div className="box-container">
          <PlacesBox
            img={beach}
            btn={true}
            link="/Beaches"
            place="Beach"
            data="Beach areas are popular types of tourist destinations. Some
            people travel a long way to reach a beach"
            styleName=""
          />

          <PlacesBox
            img={island}
            btn={true}
            link="/Island"
            place="Islands"
            data="Islands are land masses that are surrounded by water. They are
            separated form the mainland."
            styleName=""
          />

          <PlacesBox
            img={hillstation}
            btn={true}
            link="/Hillstation"
            place="Hill Stations"
            data="There are many different activities that you can do in the
            mountains, such as hiking, skiing, horse riding, and more."
            styleName=""
          />

          <PlacesBox
            img={forest}
            btn={true}
            link="/Forest"
            place="Forest"
            data="There are forests all over the world, although the flora and
            fauna differs according to the geographical location."
            styleName=""
          />

          <PlacesBox
            img={winter}
            btn={true}
            link="/Winter"
            place="Winter"
            data="People travel to destinations with winter conditions for a range
            of winter sport activities."
            styleName=""
          />

          <PlacesBox
            img={cultural}
            btn={true}
            link="/Cultural"
            place="Cultural"
            data="A type of tourism activity in which the visitor's essential
            motivation is to learn, discover, experience."
            styleName=""
          />

          <PlacesBox
            img={desert}
            btn={true}
            link="/Desert"
            place="Desert"
            data="Desert is an undulating sand plain covered with sand dunes."
            styleName=""
          />

          <PlacesBox
            img={countryside}
            btn={true}
            link="/Countryside"
            place="Countryside"
            data="A visit to countryside is a unique and wonderful experience."
            styleName=""
          />
        </div>
      </div>
    </div>
  );
};

export default Places;
