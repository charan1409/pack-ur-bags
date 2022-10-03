import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";

import "./App.css";
import LoginPage from "./Components/Landing/LoginPage";
import Landing from "./Components/Landing/Landing";
import Index from "./Components/Main/Index";
import Places from "./Components/Places/Places";
import PlacesHotel from "./Components/PlacesHotel/PlacesHotel";
import Book from "./Components/Book/Book";

import Payment from './Components/Pay/Payment';

import Error from "./Components/ErrorPage/Error";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="index" element={<Index/>} />
          <Route path="places" element={<Places/>} />
          <Route path="placeshotel" element={<PlacesHotel/>} />
          <Route path="book" element={<Book/>} />
          <Route path="payment" element={<Payment/>} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
