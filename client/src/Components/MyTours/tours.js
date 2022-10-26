import React, { useContext } from "react";
import Header from "../Navbar/Header";
import {store} from "../../App.js";

const Tours = () => {
  const { cartItems, setCartItems} = useContext(store);

  const removeItems = (key) => {
    const newset = cartItems.filter((ob, a) => a !== key);
    setCartItems([...newset]);
  };
  
  return (
    <div>
      <Header user={true}/>
      {cartItems.length === 0 ? (
        <h1>Cart is Empty</h1>
      ) : (
        <div>
          <div className="item-class">
            {cartItems
              ? cartItems.map((item, key) => {
                  return (
                    <div className="item-box" key={key}>
                      <p>{item.from}</p>
                      <p>{item.to}</p>
                      <div className="addtocart">
                        <button
                          onClick={() => {
                            removeItems(key);
                          }}
                          className="btn btn-primary"
                        >
                          Remove{" "}
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>

          </div>
      )}
    </div>
  );
};

export default Tours;
