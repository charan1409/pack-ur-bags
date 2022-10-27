import React from "react";
import Heading from "./ViewplacesComponents/heading";
import "./style.css";
import Header from "../Navbar/Header";
import Components from "./ViewplacesComponents/PlacesComponent"; 
// import photo1 from "./places/countryside/puthur.jpg";
// import photo2 from "./places/countryside/thert.jpg";
// import photo3 from "./places/countryside/shyam gaon.jpg";
// import photo4 from "./places/countryside/chitrakote.jpg";
// import photo5 from "./places/countryside/lachen.jpg";
// import photo6 from "./places/countryside/hodka.jpg";  
import { useNavigate } from "react-router-dom";

function App(props) {
  const navigate = useNavigate();
  const createPost = (val, to, det, photo) => {
    navigate(props.path, {
      state: {
        post_id: val,
        post_to: to,
        post_det: det,
        post_photo: photo,
      },
    });
  };
  return (
    <div>
      <Header user={true} />
      {/* <Heading category="FEW DESTINATIONS FOR RURAL TOURISM IN INDIA" /> */}
      <Heading category={props.category} />
      <div>
        {props.placeType.map((x) => (
          <Components
            photo={x.photo}
            to={x.to}
            details={x.details}
            onClick={() => {
              createPost(x.id, x.to, x.details, x.photo);
            }}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
