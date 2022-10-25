import React,{useState} from 'react'

import Header from "../Main/Header";
import Vedio from "../Main/Vedio";
import Gallery from "../Main/Gallery";
import Services from "../Main/Services";
import LoginPage from "./LoginPage";



const Landing = (props) => {

  const [login,setLogin] = useState(false);

  const toggleLoginForm = () =>{
    setLogin(!login);
    console.log(props.users);
  }
  return (
    <div>
      <Header user={false} openLoginForm={toggleLoginForm}/>
      <Vedio />
      <Gallery />
      <Services />
      {login && <LoginPage users={props.users} openLoginForm={toggleLoginForm}/>}
    </div>
  )
}

export default Landing