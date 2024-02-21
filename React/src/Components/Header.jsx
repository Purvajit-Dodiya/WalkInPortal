import React from "react";
import logo from "../icons/Zeus-LMS-logo.svg";
import userImg from "../icons/customer_man_user_account_profile_icon.svg";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../AuthProvider";
export default function Header(props) {
  const { logout } = React.useContext(AuthContext);
  return (
    <header className="header">
      <Link to={"/"}>
        <img src={logo} className="header_logo" alt="LOGO" />
      </Link>
      {props.user && (
        <div className="user_profile">
          <h2>
            {Cookies.get("walkInEmail")
              ? Cookies.get("walkInEmail").slice(0, 1).toUpperCase()
              : "U"}
          </h2>
          <button className="logout_button button" onClick={logout}>
            LOGOUT
          </button>
        </div>
      )}
    </header>
  );
}
