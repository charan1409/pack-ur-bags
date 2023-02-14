import React from "react";
import { useState, useEffect,useCallback } from "react";
import axios from "axios";
import "./Admin.css";
import Header from "../Navbar/Header";
import { actionCreators } from "../../actions/actions";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

function Admin() {
  const dispatch = useDispatch();
  const userL= JSON.parse(localStorage.getItem("user"));
  axios.get(`http://localhost:9000/users/loguser/${userL.username}`).then(async (resp) => {
    dispatch(actionCreators.user(resp.data));
  })
  const [role,setRole] = useState("user")
  const [Data, setData] = useState([]);
  const [state, setState] = useState([]);
  const [datanotfound, setdatanotfound] = useState(true);
  const fetchUsers = useCallback(async () => {
    await axios
      .get(`http://localhost:9000/admins/users?role=${role}`)
      .then((res) => {
        setData(res.data);
      });
  },[role]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function Deluser(a) {
    await axios.delete(`http://localhost:9000/admins/delete/${a}`).then(resp => {
      alert(resp.data.msg);
    })
    fetchUsers("user")
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
  return (
    <div>
      <Header user={true} navItems={navItems} />
      <div className="Container">
        {role === "user" ? <h1>USERS</h1> : <h1>ADMIN</h1>}
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
          <button className="btn1" onClick={() => setRole("user")}>
            user
          </button>
          <button className="btn1" onClick={() => setRole("admin")}>
            admin
          </button>
        </div>
        <div className="box">
          <table>
            <tr>
              <th style={{ textAlign: "center", width: "17%" }}>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Tours</th>
              <th style={{ textAlign: "center", width: "10%" }}>Delete</th>
            </tr>
            {datanotfound ? (
              state.length === 0 ? (
                Data.map((x) => {
                  return (
                    <tr key={x.id}>
                      <td>{x.id}</td>
                      <td className="admin">{x.username}</td>
                      <td className="admin">{x.email}</td>
                      <td>view all</td>
                      <td style={{ textAlign: "center" }}>
                        <i
                          className="fas fa-trash-alt del"
                          onClick={() => Deluser(x.username)}
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

const mapStateToProps = (state) => {
  return {
    user:state.user
  };
};
export default connect(mapStateToProps)(Admin);
