import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { useContext } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { loginMutation } from "/src/Graphql/Mutation.graphql";

export default function Login(props) {
  const { login } = useContext(AuthContext);
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
  const [loginMutationFn] = useMutation(loginMutation, {
    variables: {
      email: loginDetails.email.trim(),
      password: loginDetails.password.trim(),
    },
    onCompleted: (data) => {
      console.log("mutaion", data.login);
      login(data.login.token, data.login.email);
      window.location.href = "/";
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginDetails);
    const email = loginDetails.email;
    const password = loginDetails.password;
    loginMutationFn();

    // try {
    //   // Call the /login endpoint to authenticate user and retrieve token
    //   const response = await fetch("http://localhost:3000/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to login");
    //   }

    //   const data = await response.json();
    //   console.log("response", data);
    //   const authToken = data.token;

    //   // Set the retrieved token in state
    //   console.log("authToken", authToken);
    //   login(authToken, email);
    //   window.location.href = "/listing/1";
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

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
            <button className="login_button " type="submit">
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
