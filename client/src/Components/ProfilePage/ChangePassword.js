import React, { useState } from "react";
import axios from "axios";
import { actionCreators } from "../../actions/actions";
import { useDispatch } from "react-redux";

function ChangePassword() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    email: user.email,
    oldpassword: "",
    newpassword: "",
    conpassword: "",
  });

  const change = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !password.oldpassword &&
      !password.newpassword &&
      !password.conpassword
    ) {
      alert("Enter all fields.");
    } else if (password.newpassword !== password.conpassword) {
      alert("new passwords doesn't match.");
    } else {
      await axios
        .post(`http://localhost:9000/profile/changepass`, password)
        .then((resp) => {
          if (resp.status !== 200) alert(resp.data.error);
          else {
            dispatch(actionCreators.add());
            setPassword({
              email: user.email,
              oldpassword: "",
              newpassword: "",
              conpassword: "",
            });
            alert(resp.data.succ);
            const modalBg = document.querySelector(".pass-modal-bg");
            modalBg.classList.toggle("bg-active");
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
