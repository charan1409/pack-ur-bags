import React,{useState,useEffect} from "react";
import axios from "axios";
import Heading from "./ViewplacesComponents/Heading";
import "./style.css";
import Header from "../Navbar/Header";
import Components from "./ViewplacesComponents/PlacesComponent";  
import { useNavigate } from "react-router-dom";
const navItems = [
  {
    title: "Home",
    path: "/index",
    
  },
];
function App() {
  const navigate = useNavigate();
  const [placesData,setPlacesData] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:9000/places/places/all`).then(resp => {
      setPlacesData(resp.data)
    })
  },[])
  const createPost = (val, to, det, photo) => {
    // navigate(props.path, {
    //   state: {
    //     post_id: val,
    //     post_to: to,
    //     post_det: det,
    //     post_photo: photo,
    //   },
    // });
  };
  return (
    <div>
      <Header user={true} navItems={navItems}/>
      <Heading category="All places" />
      <div>
        {placesData.map((x) => (
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
