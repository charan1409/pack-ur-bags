import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputBox from "./InputBox";

var todayDate = new Date();
var month = todayDate.getMonth() + 1;
var year = todayDate.getUTCFullYear() - 0;
var tdate = todayDate.getDate();
if (month < 10) {
  month = "0" + month;
}
if (tdate < 10) {
  tdate = "0" + tdate;
}
var maxDate = year + "-" + month + "-" + tdate;

function Form(props) {
  const navigate = useNavigate();
  const [passengerDetails, setPassengerDetails] = useState({
    name: "",
    gender: "male",
    age: "",
  });
  const [regpassengers, setrepasse] = useState([]);
  const id = useParams();
  const onChangeField = (e) => {
    const nextField = { ...passengerDetails, [e.target.name]: e.target.value };
    setPassengerDetails(nextField);
  };
  return (
    <div>
      <form>
        <div className="Passengers">
          <div className="passname">
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={passengerDetails.name}
              onChange={onChangeField}
            />
          </div>

          <div className="box1 passname">
            <label value={passengerDetails.gender} name="gender">
              <select
                name="gender"
                onChange={(e) => {
                  console.log(e.target.value);
                  setPassengerDetails({
                    ...passengerDetails,
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
            value={passengerDetails.age}
            type={"number"}
            name="age"
            holder={"Enter age"}
            min={3}
            onChange={onChangeField}
          />
          <button>
            <i
              className="fas fa-plus"
              onClick={(e) => {
                if (!passengerDetails.name || passengerDetails.age < 3) {
                  alert("Please fill all the fields");
                  return;
                }
                e.preventDefault();
                setrepasse([...regpassengers, passengerDetails]);
                setPassengerDetails({
                  name: "",
                  gender: "male",
                  age: "",
                });
              }}
              style={{
                width: "30px",
                height: "30px",
                marginTop: "15px",
                cursor: "pointer",
              }}
            ></i>
          </button>
        </div>

        {!regpassengers.length ? (
          <h2>Passenger List</h2>
        ) : (
          <div className="passenger-list" style={{ marginTop: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Passengers</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {regpassengers.map((passenger, index) => {
                  return (
                    <tr key={index}>
                      <td>{passenger.name}</td>
                      <td> {passenger.gender} </td>
                      <td> {passenger.age} </td>
                      <td>
                        <button
                          onClick={() => {
                            const newPassengers = regpassengers.filter(
                              (_, i) => {
                                return i !== index;
                              }
                            );
                            setrepasse(newPassengers);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* <Link to="/payment"><input type="submit" className="book-btn" value="Book" /></Link> */}
        <input type="submit" className="book-btn" value="Book Tour" />
      </form>
    </div>
  );
}
export default Form;
