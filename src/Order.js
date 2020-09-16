import React from "react";
import "./Order.css";
import moment from "moment";
import Cart_item from "./components/cart_item";

function Order({ order }) {
  return (
    <div className="orderm">
      <h2>Order</h2>
      <div className="order">
        <p>{moment.unix(order.data.created).format("MMMM Do YYYY,h:mma")}</p>
        {order.data.cart.map((value) => {
          return (
            <div className="orders_page">
              <Cart_item
                id={value.id}
                name={value.name}
                url={value.url}
                price={value.price}
                removeitem={value.removeitem}
                hidden
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Order;
