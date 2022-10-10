import React from "react";
import { Link } from "react-router-dom";
import Header from "../Main/Header";

const Book = () => {
  return (
    <div>
      <Header />
      <h1>Booking Page Here.</h1>
      <Link to="/payment"><h1>Link to Payment Page</h1></Link>
    </div>
  );
};

export default Book;
