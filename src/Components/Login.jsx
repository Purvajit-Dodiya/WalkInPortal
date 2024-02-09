import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function Login() {
  const [loginDetails, setLoginDetails] = React.useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  // console.log(loginDetails);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setLoginDetails((prevLoginDetails) => {
      return {
        ...prevLoginDetails,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const [showPassword, setShowPassword] = React.useState(false);
  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(loginDetails);
  }

  return (
    <div className="head_body_footer">
      <Header />
      <div className="login_container">
        <form onSubmit={handleSubmit} className="login_form">
          <h1>Log in</h1>
          <div className="input">
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={loginDetails.email}
              className="input_field"
              required
            />
            <label className="input_label">Email ID*</label>
          </div>
          <div className="forgot_container">
            <a className="link" href="#">
              FORGOT EMAIL ID?
            </a>
          </div>
          <div className="input">
            <input
              type={showPassword ? "test" : "password"}
              name="password"
              onChange={handleChange}
              value={loginDetails.password}
              className="input_field"
              id="password"
              required
            />
            <label className="input_label">Password*</label>
            <button
              type="button"
              className="showpassword"
              id="showpassword"
              name="showpassword"
              onClick={toggleShowPassword}
            >
              <img src="src/icons/visibility_black_24dp.svg" alt="" />
            </button>
          </div>
          <div className="forgot_container">
            <a className="link " href="#">
              FORGOT PASSWORD?
            </a>
          </div>
          <div className="checkbox_container">
            <input
              type="checkbox"
              id="rememberMe"
              className="checkbox"
              name="rememberMe"
              onChange={handleChange}
              checked={loginDetails.rememberMe}
            />
            <label class="checkbox_label" for="rememberMe">
              Remember Me
            </label>
          </div>

          <div className="form_group">
            <button className="login_button" type="submit">
              LOG IN
            </button>
          </div>
          <div className="form_group register">
            <p>Not registered yet?</p>
            <Link className="link" to="/register">
              CREATE AN ACCOUNT
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
