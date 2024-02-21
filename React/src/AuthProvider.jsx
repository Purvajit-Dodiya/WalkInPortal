import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("walkInToken") || null);
  const [userEmail, setUserEmail] = useState(
    Cookies.get("walkInEmail") || null
  );

  const login = (token, email) => {
    Cookies.set("walkInToken", token, { expires: 1 / 24 }); // expires in 1 hour (1/24 of a day)
    setToken(token);
    Cookies.set("walkInEmail", email, { expires: 1 / 24 }); // expires in 1 hour
    setUserEmail(email);
  };

  const logout = () => {
    Cookies.remove("walkInToken");
    setToken(null);
    Cookies.remove("walkInEmail");
    setUserEmail(null);
    window.location.href = "/login";
  };
  return (
    <AuthContext.Provider value={{ token, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
