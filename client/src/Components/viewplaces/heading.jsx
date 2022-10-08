import React from "react";
function Heading(props){
    return(
        <h1 style={{textAlign: "center", fontSize: "50px"}}>{props.category}</h1>
    )
}
export default Heading;