import React from "react";
import Loginpage from "./login_page.js";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/Home";
import "./App.css";
import Card from "./components/card";
import Cartpage from "./cartpage";
import { auth } from "./firebase";
import Orders from "./Orders";
import Checkout from "./checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const [Cart, setCart] = useState([]);
  const [user, setUser] = useState("");
  const promise = loadStripe(
    "pk_test_51HQTP0Gp9K9dRX3Vo4UflXHBJ7AfETGVE4GTlfvyGr9pibxsKXWs2GGmie4TOzLSoqu9LOJETZqeV6q8oCwGtF3y008zIp7c62"
  );

  const removeitem = (items) => {
    setCart(
      Cart.filter((item) => {
        return item.id !== items;
      })
    );
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser("");
      }
      console.log("User", user);
    });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Loginpage />
          </Route>
          <Route path="/home">
            <Header num={Cart.length} auth={user} />
            <Home />
            <div className="row">
              <Card
                name="Percy Jackson and the lighting thief: Part 1 of the Percy Jackson
        Series-Rick Roardian"
                url="https://images-na.ssl-images-amazon.com/images/I/81qOXsLCmhL.jpg"
                price="300"
                Cart={Cart}
                setCart={setCart}
              />
              <Card
                name="Mi Notebook 14 Intel Core i5-10210U 10th Gen Thin and Light Laptop"
                price="46,990"
                url="https://m.media-amazon.com/images/I/71mYRzElTAL._AC_UY218_.jpg"
                Cart={Cart}
                setCart={setCart}
              />
              <Card
                name="Amazon Echo (3rd Gen) – Improved sound, powered by Dolby (Black)"
                url="https://m.media-amazon.com/images/I/7128HRanJgL._AC_UY218_.jpg"
                price="9,749"
                Cart={Cart}
                setCart={setCart}
              />
            </div>
            <div className="row">
              <Card
                name="Noise Colorfit Pro 2 Full Touch Control Smart Watch Jet Black"
                url="https://m.media-amazon.com/images/I/6113mS+xhyL._AC_UL320_.jpg"
                price="3,499"
                Cart={Cart}
                setCart={setCart}
              />
              <Card
                name="GLAMFLOX Multipurpose Foldable Laptop Table with Cup Holder, Study Table, Bed Table, Breakfast Table, Foldable..."
                url="https://m.media-amazon.com/images/I/713IOUxR1XL._AC_UL320_.jpg"
                price="999"
                Cart={Cart}
                setCart={setCart}
              />
            </div>
          </Route>
          <Route path="/cart">
            <Cartpage
              Cart={Cart}
              num={Cart.length}
              removeitem={removeitem}
              auth={user}
            />
          </Route>
          <Route path="/orders">
            <Header num={Cart.length} auth={user} />
            <Orders user={user} />
          </Route>
          <Route path="/checkout">
            <Header num={Cart.length} auth={user} />
            <Elements stripe={promise}>
              <Checkout Cart={Cart} setcart={setCart} user={user} />
            </Elements>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
