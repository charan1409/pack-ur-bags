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
    gender: "",
    age: "",
  });
  const id = useParams()
  const onChangeField = (e) => {
    const nextField = { ...passengerDetails, [e.target.name]: e.target.value };
    setPassengerDetails(nextField);
  };

  return (
    <div>
      <form>
        <div className="Passengers">
          <InputBox
            // display="Name"
            value={passengerDetails.name}
            type={"text"}
            name="name"
            holder={"Enter name"}
            onChange={onChangeField}
          />
          <div className="box1">
            <label onChange={onChangeField} value={passengerDetails.gender} name="gender">Gender
              <select>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </label>  </div>
          <InputBox
            // display="Age"
            value={passengerDetails.age}
            type={"number"}
            name="age"
            holder={"Enter age"}
            onChange={onChangeField}
          />
          <div className="inputBox">
            <input type="submit" className="add-btn" value="Add passenger" />
          </div>
        </div>

        {/* <Link to="/payment"><input type="submit" className="book-btn" value="Book" /></Link> */}
        <input type="submit" className="book-btn" value="Book Tour" />
      </form>
    </div>
  );
}
export default Form;
