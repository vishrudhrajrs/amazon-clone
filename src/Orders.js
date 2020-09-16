import React from "react";
import { useState, useEffect } from "react";
import Order from "./Order";
import "./orders.css";
import { db } from "./firebase";
import "./orders.css";

function Orders(props) {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    if (props.user) {
      db.collection("users")
        .doc(props.user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setorders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setorders([]);
    }
    console.log(setorders);
  });
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="order">
        {/* {orders.map((order) => {
          <Order order={order} />;
        })} */}
        {orders.map((order) => {
          return <Order order={order} />;
        })}
      </div>
    </div>
  );
}

export default Orders;
