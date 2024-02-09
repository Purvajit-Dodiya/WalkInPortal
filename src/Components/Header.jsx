import React from "react";
import logo from "../icons/Zeus-LMS-logo.svg";
import userImg from "../icons/customer_man_user_account_profile_icon.svg";

export default function Header() {
  const authenticated = true; //handle user authentication
  return (
    <header className="header">
      <img src={logo} className="header_logo" alt="LOGO" />
      <div className="user_profile">
        <img src={userImg} alt="User Profile" />
      </div>
    </header>
  );
}
