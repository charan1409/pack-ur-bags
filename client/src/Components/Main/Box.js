import React, {useEffect} from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';
import "./main.css";

const Box = (props) => {
    useEffect(() => {
        Aos.init({
          duration: 800,
          // delay: 50
        });
    }, []);
  const isBtn = props.btn;
  const style_name = props.styleName;
  return (
    <div className="box" data-aos = "zoom-in">

      {style_name.length > 0 ? (
        <i className={`fas ${style_name}`}></i>
      ) : (
        <img src={props.img} alt="image_loading" />
      )}

      <div className="content">
        <h3>{props.place}</h3>
        <p>{props.data}</p>

        {isBtn && (
          <a href={props.link} className="btn">
            see more
          </a>
        )}
      </div>
    </div>
  );
};

export default Box;
