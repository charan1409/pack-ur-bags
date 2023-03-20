import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputBox from "./InputBox";
import axios from "axios";
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
  const userL=JSON.parse(localStorage.getItem("user"));
  const [passengerDetails, setPassengerDetails] = useState({
    name: "",
    gender: "male",
    age: "",
  });
  const id = useParams();
  const [finalData, setFinalData] = useState({
    regpassengers: [],
    total: 0,
    fromdate: todayDate,
    username:userL.username
  });
  // var todate =new Date(finalData.fromdate);
  // todate.setDate(todate.getDate() + props.days);
  // console.log(todate);
  const [regpassengers, setrepasse] = useState([]);
  useEffect(() => {
    setFinalData({...finalData, regpassengers: regpassengers, total: regpassengers.length * props.price})
  }, [regpassengers, id])
  const onChangeField = (e) => {
    const nextField = { ...passengerDetails, [e.target.name]: e.target.value };
    setPassengerDetails(nextField);
  };
  return (
    <div>
      <form onSubmit={(e)=>{
        e.preventDefault();
        if(!regpassengers.length){
          alert("Please add passengers");
          return;
        }
        finalData.regpassengers.map((passenger)=>{
          axios.post(`http://localhost:9000/book/passengers/${id.id}`, {username:userL.username, placeid:id.id, name:passenger.name, gender:passenger.gender, age:passenger.age}).then((resp)=>{
            if(resp.status === 200){
              alert(resp.data.success);
            }
          })
          axios.post(`http://localhost:9000/book/book/${id.id}`,{username:userL.username, placeid:id.id, fromdate:finalData.fromdate,  paymentDone:false} ).then((resp)=>{
            if(resp.status === 200){
              alert(resp.data.success);
              navigate(`/payment/${id.id}`)
            }
          })
        })

      }}>
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
            max={70}
            onChange={onChangeField}
          />
          <button>
            <i
              className="fas fa-plus"
              onClick={(e) => {
                if (!passengerDetails.name || passengerDetails.age < 3 || passengerDetails.age > 70) {
                  alert("Please fill all the fields");
                  return;
                }
                e.preventDefault();
                setrepasse([...regpassengers, passengerDetails]);
                setPassengerDetails({...passengerDetails, username:userL.username, placeid:id.id})
                axios.post(`http://localhost:9000/passengers/${id.id}`, passengerDetails).then((resp)=>{
                  if(resp.status === 200){
                    alert(resp.data.success);
                  }
                })
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
        <br/>
        <InputBox
          value={finalData.fromdate}
          type="date"
          display="Select Date"  
          min={maxDate}
          // onChange={(e) => {
          //   console.log(e.target.value)
          //   if(e.target.value>todayDate){setFinalData({ ...finalData, fromdate: e.target.value })}
          //   else{alert("select proper date")}
          // }}
        />
        <h2>Total cost is {regpassengers.length * props.price}</h2>
        <input type="submit" className="book-btn" value="Book Tour" />
      </form>
    </div>
  );
}
export default Form;
