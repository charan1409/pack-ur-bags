import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import Header from "../Navbar/Header";

function Admin() {
  const [rval, setrval] = useState(0);
  const [userData, setuserData] = useState([]);
  const [adminData, setadminData] = useState([]);
  const [state, setState] = useState([]);
  const [datanotfound, setdatanotfound] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:3001/users?role=user`).then((res) => {
      setuserData(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/users?role=admin`).then((res) => {
      setadminData(res.data);
    });
  }, []);

  async function Deluser(a) {
    await axios.delete(`http://localhost:3001/users/${a}`);
    alert(`User with id ${a} deleted`);
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
    {
      title: "add admin",
      path: "/adminform",
    },
    {
      title: "add place",
      path: "/adminplaces",
    },
  ];
  var Data = userData;
  if (rval !== 0) {
    Data = adminData;
  } else {
    Data = userData;
  }
  return (
    <div>
      <Header user={false} navItems={navItems} />
      <div className="Container">
        {rval === 0 ? <h1>USERS</h1> : <h1>ADMIN</h1>}
        <div className="search">
          <input
            className="admin"
            type="text"
            placeholder="Search for User"
            onChange={(e) => {
              const search = e.target.value.trimStart().trimEnd();
              setdatanotfound(true);
              const data = Data.filter((item) => {
                return item.username
                  .toLowerCase()
                  .includes(search.toLowerCase());
              });
              if (data.length === 0) {
                setdatanotfound(false);
              }
              setState(data);
            }}
          />
          <i className="fas fa-search"></i>
        </div>
        <div>
          <button className="btn1" onClick={() => setrval(0)}>
            user
          </button>
          <button className="btn1" onClick={() => setrval(1)}>
            admin
          </button>
        </div>
        <div className="box">
          <table>
            <tr>
              <th style={{ textAlign: "center", width: "17%" }}>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Tours</th>
              <th style={{ textAlign: "center", width: "10%" }}>Delete</th>
            </tr>
            {datanotfound ? (
              state.length === 0 ? (
                Data.map((x) => {
                  return (
                    <tr>
                      <td>{x.id}</td>
                      <td className="admin">{x.username}</td>
                      <td className="admin">{x.email}</td>
                      <td className="admin">{x.password}</td>
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
                      <td style={{ textAlign: "center" }}>
                        <i
                          className="fas fa-trash-alt del"
                          onClick={() => Deluser(x.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              ) : (
                state.map((x) => {
                  return (
                    <tr>
                      <td>{x.id}</td>
                      <td className="admin">{x.username}</td>
                      <td className="admin">{x.email}</td>
                      <td className="admin">{x.password}</td>
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
                        <i
                          className="fas fa-trash-alt del"
                          onClick={() => Deluser(x.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              )
            ) : (
              <h2 style={{ fontSize: "30px" }}>No User Found</h2>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
