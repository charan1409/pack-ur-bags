import React,{useState,useEffect} from "react";
import axios from "axios";
import Heading from "./ViewplacesComponents/Heading";
import "./style.css";
import Header from "../Navbar/Header";
import Components from "./ViewplacesComponents/PlacesComponent";  
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const navItems = [
  {
    title: "Home",
    path: "/index",
    
  },
];
function App() {
  const navigate = useNavigate();
  const [placesData,setPlacesData] = useState([]);
  const params=useParams();
  const [category,setCategory]=useState(params.id);
  useEffect(()=>{
    axios.get(`http://localhost:9000/places/places/${category}`).then(resp => {
      setPlacesData(resp.data)
    })
  },[category])
  return (
    <div>
      <Header user={true} navItems={navItems}/>
      <div className="head">
        <Heading category="Places" />
        {params.id==="all"?
        <div>
          <label htmlFor="places">Sort by: 
          <select name="places" id="places" onChange={(event)=>setCategory(event.target.value)} value={category}>
            <option value="all">all</option>  
            <option value="beach">beach</option>
            <option value="island">island</option>
            <option value="countryside">countryside</option>
            <option value="desert">desert</option>
            <option value="forest">forest</option>
            <option value="cultural">cultural</option>
            <option value="winter">winter</option>
            <option value="hillstation">hillstation</option>
          </select></label>
        </div>:<div></div>}
      </div>      
      <div>
        {placesData && placesData.map((x) => (
          <Components
            photo={x.photo}
            from={x.from}
            to={x.to}
            details={x.details}
            onClick={() => {
              navigate(`/placedetails/${x.id}`)
            }}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
