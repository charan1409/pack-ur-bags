import React, { useState } from 'react'

function ChangePassword() {

  const [password,setPassword]=useState({oldpassword:"",newpassword:"",conpassword:""})
  const change=(e)=>{
    setPassword({...password,[e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(password.oldpassword.length && password.newpassword.length && password.conpassword.length){
      if(password.newpassword === password.conpassword){
        alert(password.newpassword)
      }
    }
    const modalBg = document.querySelector(".pass-modal-bg");
    modalBg.classList.toggle("bg-active");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldpassword">Old Password: 
        <input
          type="password"
          className="tbox"
          name="oldpassword"
          placeholder="Enter your old password"
          value={password.oldpassword}
          onChange={change}
        />
        </label>
        <br></br>
        <label htmlFor="newpassword">New password: 
        <input
          type="password"
          className="tbox"
          name="newpassword"
          placeholder="Enter your new password"
          value={password.newpassword}
          onChange={change}
        /></label>
        <br></br>
        <label htmlFor="conpassword">Confirm password: 
        <input
          type="password"
          className="tbox"
          name="conpassword"
          placeholder="confirm your new password"
          value={password.conpassword}
          onChange={change}
        /></label>
        <br></br>
        <button type="submit" className="btn_profile" value="save changes">
          change password
        </button>
        <button type="submit" className="btn_profile" value="save changes">
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
