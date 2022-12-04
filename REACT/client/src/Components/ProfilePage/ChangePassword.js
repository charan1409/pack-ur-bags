import React, { useState, useEffect } from "react";
import axios from "axios";

function ChangePassword() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [changed, setChanged] = useState(false);
  const [password, setPassword] = useState({
    oldpassword: "",
    newpassword: "",
    conpassword: "",
  });

  const change = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .put(`http://localhost:3001/users/${user.id}`, user)
      .then((resp) => {
        // console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [changed, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !password.oldpassword &&
      !password.newpassword &&
      !password.conpassword
    ) {
      alert("Enter all fields.");
    } else if (password.oldpassword !== user.password) {
      alert("incorrect password.");
    } else if (password.newpassword !== password.conpassword) {
      alert("new passwords doesn't match.");
    } else {
      user.password = password.newpassword;
      localStorage.setItem("user", JSON.stringify(user));
      setChanged(!changed);

      const modalBg = document.querySelector(".pass-modal-bg");
      modalBg.classList.toggle("bg-active");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldpassword">
          Old Password:
          <input
            type="password"
            className="tbox"
            name="oldpassword"
            placeholder="Enter old password"
            value={password.oldpassword}
            onChange={change}
          />
        </label>
        <br></br>
        <label htmlFor="newpassword">
          New password:
          <input
            type="password"
            className="tbox"
            name="newpassword"
            placeholder="Enter new password"
            value={password.newpassword}
            onChange={change}
          />
        </label>
        <br></br>
        <label htmlFor="conpassword">
          Confirm password:
          <input
            type="password"
            className="tbox"
            name="conpassword"
            placeholder="confirm new password"
            value={password.conpassword}
            onChange={change}
          />
        </label>
        <br></br>
        <button type="submit" className="btn_profile" value="save changes">
          change password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
