import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Landing from "./Components/Landing/Landing";
import Index from "./Components/Main/Index";
import Beaches from "./Components/viewplaces/Beaches";
import Island from "./Components/viewplaces/Island";
import Hillstation from "./Components/viewplaces/Hillstation";
import Forest from "./Components/viewplaces/Forest";
import Winter from "./Components/viewplaces/Winter";
import Cultural from "./Components/viewplaces/Cultural";
import Desert from "./Components/viewplaces/Desert";
import Countryside from "./Components/viewplaces/Countryside";
import BeachesHotel from "./Components/PlacesHotel/BeachesHotel";
import CulturalHotel from "./Components/PlacesHotel/CulturalHotel";
import CountrysideHotel from "./Components/PlacesHotel/CountrysideHotel";
import Book from "./Components/Book/Book";
import Payment from './Components/Pay/Payment';

import Error from "./Components/ErrorPage/Error";
import Profile from './Components/ProfilePage/profile';
import Tours from "./Components/MyTours/Tours";
import Transaction from "./Components/Transactions/Transaction";



function App() {
  const users = [
    {
      username:"charan14",
      password:"charan"
    },
    {
      username:"rahul14",
      password:"rahulvarma"
    },
    {
      username:"kamal12",
      password:"kamalsai"
    },
    {
      username:"rohith14",
      password:"rohith"
    },
    {
      username:"nikhil14",
      password:"nikhil"
    }
  ]
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing users={users}/>}/>
          <Route path="index" element={<Index />} />
          <Route path="Beaches" element={<Beaches />} />
          <Route path="Island" element={<Island />} />
          <Route path="Hillstation" element={<Hillstation />} />
          <Route path="Forest" element={<Forest />} />
          <Route path="Winter" element={<Winter />} />
          <Route path="Cultural" element={<Cultural />} />
          <Route path="Desert" element={<Desert />} />
          <Route path="Countryside" element={<Countryside />} />
          <Route path="BeachesHotel" element={<BeachesHotel />} />
          <Route path="CulturalHotel" element={<CulturalHotel />} />
          <Route path="CountrysideHotel" element={<CountrysideHotel />} />
          <Route path="book" element={<Book />} />
          <Route path="payment" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mytours" element={<Tours />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
