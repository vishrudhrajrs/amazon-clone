import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { auth } from "../firebase";

function Header(props) {
  const signinhandle = () => {
    if (props.auth) {
      auth.signOut();
    }
  };
  return (
    <div className="parent">
      <div className="header">
        <Link to="/home">
          <img
            src="https://bloximages.chicago2.vip.townnews.com/kenoshanews.com/content/tncms/assets/v3/editorial/0/56/05663cea-77e2-5e21-8a79-53e9a96e9acc/5f1f3d4695a1a.image.jpg"
            className="logo"
          />
        </Link>
        <div className="header_search">
          <input className="header_input" type="text" />
          <SearchIcon className="search" />
        </div>
        <div className="header_nav">
          <div className="header__option1 " id="ms">
            <span className="header_option_line">Hello Guest</span>
            <Link className="link" exact to={!props.auth && "/"}>
              <span onClick={signinhandle} ClassName="option_signin">
                {props.auth ? "Sign Out" : "Sign In"}
              </span>
            </Link>
          </div>

          <Link to="/orders" className="link">
            <div className="header__option">
              <span className="header_option_line">Returns</span>
              <span ClassName="option_signin">&Orders</span>
            </div>
          </Link>
          <div className="header__option">
            <span className="header_option_line">Your</span>
            <span ClassName="option_signin">Prime</span>
          </div>
          <span className="small">
            <Link to="/cart">
              <ShoppingBasketIcon className="cart" />
            </Link>
            <div className="header__option1">
              <Link to="/cart" className="link">
                <span ClassName="option_signin">{props.num}</span>
              </Link>
            </div>
          </span>
        </div>
      </div>
      <div className="header_search1">
        <input className="header_input" type="text" />
        <SearchIcon className="search" />
      </div>
    </div>
  );
}

export default Header;
