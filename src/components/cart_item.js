import React from "react";
import "./cart_item.css";

function Cart_item(props) {
  return (
    <div>
      <div className="itemt">
        <div className="itemi">
          <div>
            <img className="cart_img" src={props.url} />
          </div>
          <div className="cart_s">
            <div className="cart_info">
              {props.name}
              {!props.hidden && (
                <div>
                  <span className="stock">InStock</span>
                  <button
                    className="basket1"
                    onClick={() => {
                      props.removeitem(props.id);
                    }}
                  >
                    Remove From Cart
                  </button>
                </div>
              )}
            </div>
            <p className="cart_price">Rs. {props.price}</p>
          </div>
        </div>
        <hr className="cart_hr" />
      </div>
    </div>
  );
}

export default Cart_item;
