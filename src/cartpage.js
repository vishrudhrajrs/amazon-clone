import React from "react";
import Header from "./components/header";
import Cart_item from "./components/cart_item";
import "./components/cart_page.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Cartpage(props) {
  let price_total = 0;
  let history = useHistory();
  return (
    <div className="background">
      <Header num={props.num} auth={props.auth} />
      <div className="cartpage">
        <div className="s1">
          <div className="item">
            <h2 className="shop">Shopping Cart</h2>
            <span className="tprice">price</span>
          </div>
          <hr className="carthr" />

          {props.Cart.length !== 0 ? (
            props.Cart.map((value) => {
              return (
                <div>
                  <Cart_item
                    id={value.id}
                    name={value.name}
                    url={value.url}
                    price={value.price}
                    removeitem={props.removeitem}
                  />
                </div>
              );
            })
          ) : (
            <div className="notfound">
              <h1 className="nothing">Your Cart is Empty</h1>
              <Link to="/home" className="continue">
                <h3>continue Shopping</h3>
              </Link>
            </div>
          )}
        </div>
        <hr className="cart_hr" />
        <div className="s2">
          <img
            className="assure"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
          />

          <div className="subtotal">
            <p className="total">
              {props.Cart.forEach((element) => {
                price_total += element.price;
              })}
              Sub Total ({props.num} items) :<strong>Rs {price_total}</strong>
            </p>
            <div>
              <input type="checkbox" className="gift" />
              <span className="gift1">This order contains a gift</span>
            </div>

            <button
              className="proceed"
              onClick={() => {
                props.Cart.length
                  ? history.push("./checkout")
                  : alert("cart is empty");
              }}
            >
              Proceed to buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;
