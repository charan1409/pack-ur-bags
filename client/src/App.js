import React, { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollTop from "./Components/ScrollTop";

import "./App.css";
import Landing from "./Components/Landing/Landing";
import Index from "./Components/Main/Index";
import ViewPlace from "./Components/viewplaces/ViewPlace";
import BeachesHotel from "./Components/PlacesHotel/BeachesHotel";
import Book from "./Components/Book/Book";
import Payment from "./Components/Pay/Payment";
import Error from "./Components/ErrorPage/Error";
import Profile from "./Components/ProfilePage/Profile";
import Tours from "./Components/MyTours/Tour";
import Transaction from "./Components/Transactions/Transaction";
import Admin from "./Components/Admin/Admin";
import Addadmin from "./Components/Admin/Addadmin";
import AddPlaces from "./Components/Admin/AddPlaces";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import change from "./Redux/counter";
export const store1 = createContext();
const store = createStore(
  change,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
function App() {
  return (
    <>
      <Provider store={store}>
        <store1.Provider value={{}}>
          <BrowserRouter>
            <ScrollTop smooth />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="index" element={<Index />} />
              <Route path="places/:id" element={<ViewPlace />} />
              <Route path="BeachesHotel" element={<BeachesHotel />} />
              <Route path="book" element={<Book />} />
              <Route path="payment" element={<Payment />} />
              <Route path="profile" element={<Profile />} />
              <Route path="mytours" element={<Tours />} />
              <Route path="transactions" element={<Transaction />} />
              <Route path="admin" element={<Admin />} />
              <Route path="adminform" element={<Addadmin />} />
              <Route path="adminplaces" element={<AddPlaces />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </store1.Provider>
      </Provider>
    </>
  );
}

export default App;
