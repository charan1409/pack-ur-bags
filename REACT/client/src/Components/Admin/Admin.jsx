import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import Btn from "../Btn";
import Header from "../Navbar/Header";

function Admin() {
  const [userData, setuserData] = useState([]);
  const [state, setState] = useState([]);
  const [datanotfound, setdatanotfound] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:3001/users`).then((res) => {
      setuserData(res.data);
    });
  }, []);
  async function Deluser(a) {
    await axios.delete(`http://localhost:3001/users/${a}`);
    console.log(a);
    await axios.get(`http://localhost:3001/users`).then((res) => {
      setuserData(res.data);
    });
  }
  const navItems = [
    {
      title: "Home",
      path: "/admin",
    },
  ];
  return (
    <div>
      <Header user={false} navItems={navItems} />
      <div className="Container">
        <h1>USERS</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search for User"
            onChange={(e) => {
              const search = e.target.value.trimStart().trimEnd();
              setdatanotfound(true);
              const data = userData.filter((item) => {
                return item.username.toLowerCase().includes(search.toLowerCase());
              });
              if (data.length === 0) {
                setdatanotfound(false);
              }
              setState(data);
            }}
          />
          <i className="fas fa-search"></i>
        </div>
        <div className="box">
          <table>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Tours</th>
              <th>Delete</th>
            </tr>
            {/* {userData.map((x) => (
              <tr>
                <td>{x.username}</td>
                <td>{x.email}</td>
                <td>{x.password}</td>
                <td>
                  {x.tours.map((item) => (
                    <div>
                      <h3>From - {item.from}</h3>
                      <h3>To - {item.to}</h3>
                      <h3>Number of Adults- {item.adult}</h3>
                      <h3>Number of Child- {item.child}</h3>
                      <h3>Date of Departure- {item.depart}</h3>
                      <h3>Date of Arrival- {item.arrival}</h3>
                    </div>
                  ))}
                </td>
                <td>
                  <Btn value="Delete" onClick={() => Deluser(x.id)} />
                </td>
              </tr>
            ))} */}

            {datanotfound ? (
              state.length === 0 ? (
                userData.map((x) => {
                  return (
                    <tr>
                    <td>{x.username}</td>
                    <td>{x.email}</td>
                    <td>{x.password}</td>
                    <td>
                      {x.tours.map((item) => (
                        <div>
                          <h3>From - {item.from}</h3>
                          <h3>To - {item.to}</h3>
                          <h3>Number of Adults- {item.adult}</h3>
                          <h3>Number of Child- {item.child}</h3>
                          <h3>Date of Departure- {item.depart}</h3>
                          <h3>Date of Arrival- {item.arrival}</h3>
                        </div>
                      ))}
                    </td>
                    <td>
                      <Btn value="Delete" onClick={() => Deluser(x.id)} />
                    </td>
                  </tr>
                  );
                })
              ) : (
                state.map((x) => {
                  return (
                    <tr>
                    <td>{x.username}</td>
                    <td>{x.email}</td>
                    <td>{x.password}</td>
                    <td>
                      {x.tours.map((item) => (
                        <div>
                          <h3>From - {item.from}</h3>
                          <h3>To - {item.to}</h3>
                          <h3>Number of Adults- {item.adult}</h3>
                          <h3>Number of Child- {item.child}</h3>
                          <h3>Date of Departure- {item.depart}</h3>
                          <h3>Date of Arrival- {item.arrival}</h3>
                        </div>
                      ))}
                    </td>
                    <td>
                      <Btn value="Delete" onClick={() => Deluser(x.id)} />
                    </td>
                  </tr>
                  );
                })
              )
            ) : (
              <h1 className="notfound">No Data Found</h1>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
