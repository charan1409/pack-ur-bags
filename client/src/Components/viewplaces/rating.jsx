import React from "react";
function Rating(props){
    return(
        <div className="rating">
            <p>Rating:{props.rate}/5</p>
        </div>
    )
}
export default Rating;