import React from 'react'

import Header from "../Main/Header";
import Vedio from "../Main/Vedio";
import Gallery from "../Main/Gallery";
import Services from "../Main/Services";
import { Link } from "react-router-dom";



const Landing = () => {
  return (
    <div>
      <Header user={false}/>
      <Vedio />
      <Gallery />
      <Services />
      <Link to="/index"><h1>Link to Index Page</h1></Link>
    </div>
  )
}

export default Landing