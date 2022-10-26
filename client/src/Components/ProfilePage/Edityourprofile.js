import React from 'react';

function Edityourprofile(model) {
    return (
        <div>
            <form action="/profile/edit" method="post" class="editform">
                <label for="username">Username:</label>
                <input type="text" className="tbox" name="username" placeholder="Enter your username" /><br></br>
                <label for="upname">Name: </label>
                <input type="text" className="tbox" name="upname" placeholder="Enter your name" /><br></br> 
                <label for="upgender">Gender:</label>
                <input type="radio" name="upgender" id="male" value="male" /> 
                <label for="male">male</label>
                <input type="radio" name="upgender" id="female" value="female" /> 
                <label for="female">female</label><br></br>
                <label for="upphone">Phone number:</label>
                <input type="text" className="tbox" name="upphone" placeholder="Enter your phone number" /><br></br> 
                <a href="/profile/profile" className="cancelbtn">cancel</a>
                <button type="submit" className="btn_profile" value="save changes">save changes</button>            
            </form>
        </div>
    )
}


export default Edityourprofile;