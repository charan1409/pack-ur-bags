import React, { useContext, useState } from "react";
import Header from "../Navbar/Header";
import { store } from "";

const Tours = () => {
  const { cartItems, setCartItems} = useContext(store);
  return (
    <div>
        <Header user={true}/>
      <h1>Tours Page Here</h1>
    </div>
  );
};

export default Tours;
