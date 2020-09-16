import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import "./login_page.css";
import { auth } from "./firebase";

import amazon from "./amazon_logo.jpg";

function Loginpage() {
  const history = useHistory();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(Email, Password)
      .then((auth) => {
        if (auth) {
          console.log("Working");
          history.push("/home");
        }
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(Email, Password)
      .then((auth) => {
        if (auth) {
          history.push("/home");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="bg">
      <div className="wid">
        <span className="logo_container">
          <img
            src="https://images.fonearena.com/blog/wp-content/uploads/2014/07/Amazon-India-logo.jpg"
            className="login_logo"
          />
        </span>
        <div className="form">
          <p className="login">Login</p>
          <p className="email">Email or mobile number</p>
          <input
            className="emailbox"
            type="input"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className="email">Password</p>
          <input
            className="emailbox"
            type="password"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" onClick={signin} className="signin">
            Continue
          </button>
          <p className="terms">
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>
          <p className="help">
            <a
              href="https://www.amazon.in/gp/help/customer/account-issues/ref=ap_login_with_otp_claim_collection?ie=UTF8"
              className="link1"
            >
              Other ways to sign in
            </a>
          </p>
        </div>
        <hr className="new" />
        <p className="acc">New Account</p>
        <button className="cacc" onClick={register}>
          Create your account
        </button>
      </div>
    </div>
  );
}

export default Loginpage;
