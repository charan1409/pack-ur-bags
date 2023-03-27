import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { navItems } from "./NavItems";
import Header from "../Navbar/Header";

const DisplayPackages = () => {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [datanotfound, setdatanotfound] = useState(true);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/admins/packages").then((resp) => {
      if (resp.status !== 200) {
        alert(resp.data.msg);
      } else {
        console.log(resp.data);
        return setPackages(resp.data);
      }
    });
  }, []);

  async function Deluser(a) {
    await axios
      .delete(`http://localhost:9000/admins/delete/${a}`)
      .then((resp) => {
        alert(resp.data.msg);
      });
  }
  return (
    <div>
      <div>
        <Header user={true} navItems={navItems} />
        <h1>Packages</h1> 
        <div className="Container">
          <div className="search">
            <input
              className="admin"
              type="text"
              placeholder="Search for User"
              onChange={(e) => {
                const search = e.target.value.trimStart().trimEnd();
                setdatanotfound(true);
                const data = packages.filter((item) => {
                  return item.category
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
          <div className="box">
            <table>
              <tr>
                <th style={{ textAlign: "center", width: "17%" }}>Id</th>
                <th>From</th>
                <th>To</th>
                <th>Category</th>
                <th>Edit</th>
                <th style={{ textAlign: "center", width: "10%" }}>Delete</th>
              </tr>
              {datanotfound ? (
                state.length === 0 ? (
                  packages.map((x) => {
                    return (
                      <tr key={x.id}>
                        <td>{x.id}</td>
                        <td className="admin">{x.from}</td>
                        <td className="admin">{x.to}</td>
                        <td className="admin">{x.category}</td>
                        <td>
                            <i
                                className="fas fa-edit edit"
                                onClick={() => navigate(`/editpackage/${x.id}`)}
                            ></i>
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
                        <tr key={x.id}>
                        <td>{x.id}</td>
                        <td className="admin">{x.from}</td>
                        <td className="admin">{x.to}</td>
                        <td className="admin">{x.category}</td>
                        <td>
                            <i
                                className="fas fa-edit edit"
                                onClick={() => navigate(`/editpackage/${x.id}`)}
                            ></i>
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
                )
              ) : (
                <h2 style={{ fontSize: "30px" }}>No User Found</h2>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPackages;
