
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";
import axios from "./axios";
import "./checkout.css";
import Cart_item from "./components/cart_item";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function Checkout(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [Error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeded, setsucceded] = useState(false);
  const history = useHistory();
  const [clientsecret, setclientsecret] = useState(true);
  const [processing, setprocessing] = useState("");
  let price_total = 0;

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/checkout/create?total=${price_total * 100}`,
      });
      setclientsecret(response.data.clientsecret);
    };

    getClientSecret();
  }, [props.Cart]);
  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setprocessing(true);

    const payload = await stripe
      .confirmCardPayment(clientsecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(props.user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: props.Cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setsucceded(true);
        setError(null);
        setprocessing(false);

        history.replace("/orders");
      });
  };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="checkout">
      <h1 className="center"> Checkout ({props.Cart.length} items)</h1>
      <hr />

      <section className="address">
        <h3 className="title1">Delivery Address</h3>
        <div className="add1">
          <p>test123@gmail.com</p>
          <p>52C , Park Street</p>
          <p>Chennai</p>
        </div>
      </section>
      <hr />
      <section className="address">
        <h3 className="title1">Review items and Summary</h3>
        <div className="add1">
          <section className="items_in_cart">
            {props.Cart.map((value) => {
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
            })}
          </section>
        </div>
      </section>
      <hr />
      <section className="address">
        <h3 className="title1">Payment</h3>
        <div className="add1">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />

            <div className="price1">
              <p className="total hei">
                {props.Cart.forEach((element) => {
                  price_total += element.price;
                })}
                Total Price :<strong>Rs{price_total}</strong>
              </p>
            </div>
            <button disabled={processing || disabled || succeded}>
              <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
            </button>
            {Error && <div>{Error}</div>}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Checkout;

{
}
