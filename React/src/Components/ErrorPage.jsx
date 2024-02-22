import React from "react";
// import { useHistory } from "react-router-dom";

const ErrorPage = () => {
  const history = useHistory();

  //   /

  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <button className="button">Go to Home</button>
    </div>
  );
};

export default ErrorPage;
