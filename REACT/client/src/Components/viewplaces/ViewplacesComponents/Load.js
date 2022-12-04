import React from "react";
function Load(props) {
  return (
    <div className="button">
      <a href={props.id} className="place-btn">
        {props.name}
      </a>
      {/* <a href={`/places/viewplace/${props.id}`} className="place-btn">See More</a>
          <a href="/book/book" className="place-btn">Book Now</a> */}
    </div>
  );
}
export default Load;
