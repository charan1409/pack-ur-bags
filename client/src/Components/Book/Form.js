import React from "react";

const PassengerForm = ({ passenger, onChange }) => {
  const handleChange = (event) => {
    onChange({ ...passenger, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" name="name" value={passenger.name} onChange={handleChange} />
      </label>
      <label>
        Gender:
        <select name="gender" value={passenger.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Age:
        <input type="number" name="age" value={passenger.age} onChange={handleChange} />
      </label>
    </div>
  );
};

export default PassengerForm;
