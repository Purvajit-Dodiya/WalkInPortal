import React from "react";
import logo from "../icons/Zeus-LMS-logo.svg"

export default function Header() {
  return (
    <header className="header">
      <img src={logo} className="header_logo" alt="LOGO" />
    </header>
  );
}
