import React,{useState,useEffect} from 'react'
import axios from 'axios';

import { navItems } from "./NavItems";
import Header from "../Navbar/Header";

const DisplayPackages = () => {
    const [packages,setPackages] = useState([])
    useEffect(() => {
        axios.get("http://localhost:9000/admins/packages").then((resp) => {
            if(resp.status !== 200){
                alert(resp.data.msg)
            }else{
                console.log(resp.data)
                return setPackages(resp.data)
            }
        })
    }, [])
  return (
    <div>
        <Header user={true} navItems={navItems} />
      
    </div>
  )
}

export default DisplayPackages
