import React from "react";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  let history = useNavigate();
  function handleClick() {
    history("/");
  }
  return (
    <div className="error_container">
      <h2>404 - Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <button className="button" onClick={handleClick}>
        GO TO HOME
      </button>
    </div>
  );
};

export default ErrorPage;
