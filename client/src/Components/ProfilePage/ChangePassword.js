import React from 'react'

function ChangePassword(props) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const modalBg = document.querySelector(".pass-modal-bg");
    modalBg.classList.toggle("bg-active");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="opass">Password: </label>
        <input
          type="password"
          className="tbox"
          name="opass"
          placeholder="Enter your password"
        />
        <br></br>
        <label for="npass">New password: </label>
        <input
          type="password"
          className="tbox"
          name="npass"
          placeholder="Enter your new password"
        />
        <br></br>
        <label for="cnpass">Confirm password: </label>
        <input
          type="password"
          className="tbox"
          name="cnpass"
          placeholder="confirm your new password"
        />
        <br></br>
        <button type="submit" className="btn_profile" value="save changes">
          Cancel
        </button>
        <button type="submit" className="btn_profile" value="save changes">
          change password
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
