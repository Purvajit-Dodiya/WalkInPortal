import React from "react";
import logo from "../icons/Zeus-LMS-logo.svg";
import userImg from "../icons/customer_man_user_account_profile_icon.svg";
import { Link } from "react-router-dom";
export default function Header() {
  const authenticated = true; //handle user authentication
  return (
    <header className="header">
      <Link to={"/"}>
        <img src={logo} className="header_logo" alt="LOGO" />
      </Link>
      <div className="user_profile">
        <img src={userImg} alt="User Profile" />
      </div>
    </header>
  );
}
