import React from "react";
import { useState } from "react";
import "./product.css";

function Card(props) {
  const [Id, setId] = useState("0");
  return (
    <div className="Product">
      <p className="info">
        {props.name}
        <p className="price">Rs {props.price}</p>
      </p>
      <img src={props.url} className="cover" />
      <button
        className="basket"
        onClick={() => {
          setId(Id + 1);
          props.setCart(
            props.Cart.concat({
              id: { Id },
              name: props.name,
              url: props.url,
              price: Number(props.price.replace(/,/g, "")),
            })
          );
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Card;
