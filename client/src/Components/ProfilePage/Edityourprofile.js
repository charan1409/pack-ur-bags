import React from 'react';

function Edityourprofile(model) {
    return (
        <div>
            <form action="/profile/edit" method="post" class="editform">
                <label for="username">Username:</label>
                <input type="text" class="tbox" name="username" placeholder="Enter your username" value="<%=user.username%>"><br></br></input>
                <label for="upname">Name: </label>
                <input type="text" class="tbox" name="upname" placeholder="Enter your name" value="<%=user.name%>"><br></br></input>
                <label for="upgender">Gender:</label>
                <input type="radio" name="upgender" id="male" value="male" checked></input>
                <input type="radio" name="upgender" id="male" value="male"></input>
                <label for="male">male</label>
                <input type="radio" name="upgender" id="female" value="female" checked></input>
                <input type="radio" name="upgender" id="female" value="female"></input>
                <label for="female">female</label><br></br>
                <label for="upphone">Phone number:</label>
                <input type="text" class="tbox" name="upphone" placeholder="Enter your phone number" value="<%=user.phone%>"><br></br></input>
                <a href="/profile/profile" class="cancelbtn">cancel</a>
                <button type="submit" class="btn" value="save changes">save changes</button>


                <label for="username">{model.username}</label>
                <input type="text" class="tbox" name="Username" >Enter your username</input>
            </form>
        </div>
    )
}


export default Edityourprofile;