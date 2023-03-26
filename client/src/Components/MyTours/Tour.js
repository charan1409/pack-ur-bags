import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import "./Tour.css";
import axios from "axios";
import Btn from "../Btn";
import Loading from "../Loading/Loading";
import InputBox from "../Book/InputBox";

const Tours = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navItems = [
    {
      title: "Home",
      path: "/index",
    },
    {
      title: "Gallery",
      path: "/index/#gallery",
    },
    {
      title: "Places",
      path: "/places/all",
    },
    {
      title: "Services",
      path: "/index/#services",
    },
  ];
  const [passenger, setPassenger] = useState({
    name: "",
    gender: "male",
    age: "",
  });
  const onChangeField = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const [tours, setTours] = useState([]);
  const userL = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(`http://localhost:9000/payment/mybookings/${userL.username}`)
      .then((resp) => {
        console.log(resp.data);
        setLoading(false);
        return setTours(resp.data);
      });
  }, [userL.username, setTours]);

  useEffect(() => {
    const userL = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:9000/users/loguser/${userL.username}`)
      .then((resp) => {
        return setUser(resp.data.user);
      });
  }, []);


  return (
    <div>
      <Header user={user} navItems={navItems} />

      {loading ? (
        <Loading />
      ) : (
        <div>
          {tours.length === 0 ? (
            <h1>Your Tour List is Empty</h1>
          ) : (
            <div>
              <div className="tour-item-class">
                {tours
                  ? tours.map((item, key) => {
                    return (
                      <div className="tour-item-box" key={key}>
                        <div className="tour-details">
                          <table>
                            <tr style={{ fontSize: "20px" }}>
                              <th>From</th>
                              <th>To</th>
                              <th>No. of Passengers</th>
                              <th>Departure</th>
                              <th>Arrival</th>
                              <th>Total amount</th>
                            </tr>
                            <tr>
                              <td>{item.placedetails.from}</td>
                              <td>{item.placedetails.to}</td>
                              <td>{item.numberOfpassengers}</td>
                              <td>{item.fromdate}</td>
                              <td>{item.todate}</td>
                              <td>{item.numberOfpassengers * item.placedetails.price}</td>
                            </tr>
                          </table>
                          <>{
                            item.passengers.map((passenger, key) => {
                              return (
                                <table>
                                  <tr style={{ fontSize: "20px" }}>
                                    <th>Passenger {key + 1}</th>
                                  </tr>
                                  <tr>
                                    <td>Name: {passenger.name}</td>
                                  </tr>
                                </table>
                              )
                            })
                          }</>
                          <div className="Passengers">
                            <form>
                              <div className="passname">
                                <input
                                  type="text"
                                  placeholder="Enter name"
                                  name="name"
                                  value={passenger.name}
                                  onChange={onChangeField}
                                />
                              </div>

                              <div className="box1 passname">
                                <label name="gender">
                                  <select
                                    name="gender"
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setPassenger({
                                        ...passenger,
                                        gender: e.target.value,
                                      });
                                    }}
                                  >
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                  </select>
                                </label>{" "}
                              </div>

                              <InputBox
                                value={passenger.age}
                                type={"number"}
                                name="age"
                                holder={"Enter age"}
                                min={3}
                                max={70}
                                onChange={onChangeField}
                              />
                              <button>
                                <i
                                  className="fas fa-plus"
                                  onClick={(e) => {
                                    let regpass = item.passengers;
                                    console.log(regpass)
                                    let temp = regpass;
                                    console.log("first",temp);
                                    if (!passenger.name || passenger.age < 3 || passenger.age > 70) {
                                      alert("Please fill all the fields");
                                      return;
                                    }
                                    console.log(passenger)
                                    temp = [...temp, passenger];
                                    console.log("second ",temp);
                                    axios.put(`http://localhost:9000/payment/updatePassengers/${item.id}`, { passengers: temp }).then((resp) => {
                                      if (resp.status === 200) {
                                        alert(resp.data.msg);
                                      }
                                    })
                                    setPassenger({
                                      name: "",
                                      gender: "male",
                                      age: "",
                                    });
                                    e.preventDefault(); 
                                  }}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    marginTop: "15px",
                                    cursor: "pointer",
                                  }}
                                ></i>
                              </button>
                            </form>
                          </div>
                        </div>
                        <div className="tour-button">
                          <Btn
                            value="Book Now"
                            type="button"
                            onClick={() => {
                              navigate(`/payment/${item.id}`);
                            }}
                          />
                        </div>
                        <Btn
                          value="Edit"
                          type="button"
                          onClick={() => {
                            navigate(`/edit/${item.id}`);
                          }}
                        />

                        {/* Implement delete */}
                        <Btn
                          value="Delete"
                          type="button"
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:9000/places/delete/${item.id}`
                              )
                              .then((resp) => {
                                alert(resp.data.message);
                                window.location.reload();
                              });
                          }}
                        />

                      </div>
                    );
                  })
                  : ""}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tours;
