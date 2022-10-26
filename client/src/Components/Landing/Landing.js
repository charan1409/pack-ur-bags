import React,{useState} from 'react'

import Header from "../Navbar/Header";
import Vedio from "../Main/Vedio";
import Gallery from "../Main/Gallery";
import Services from "../Main/Services";
import LoginPage from "./LoginPage";



const Landing = (props) => {

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
      <h1>Please <button className='btn' onClick={toggleLoginForm}>Login</button> For More</h1>
      
      {login && <LoginPage users={props.users} openLoginForm={toggleLoginForm} loggedUser={props.loggedUser}/>}
    </div>
  )
}

export default Landing