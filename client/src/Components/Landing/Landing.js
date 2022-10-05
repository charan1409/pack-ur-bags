import React,{useState} from 'react'

import Header from "../Main/Header";
import Vedio from "../Main/Vedio";
import Gallery from "../Main/Gallery";
import Services from "../Main/Services";
import LoginPage from "./LoginPage";
import { Link } from "react-router-dom";



const Landing = () => {

  const [login,setLogin] = useState(false);

  const toggleLoginForm = () =>{
    setLogin(!login);
  }
  return (
    <div>
      <Header user={false} openLoginForm={toggleLoginForm}/>
      <Vedio />
      <Gallery />
      <Services />
      <Link to="/index"><h1>Link to Index Page</h1></Link>
      {login && <LoginPage openLoginForm={toggleLoginForm}/>}
    </div>
  )
}

export default Landing