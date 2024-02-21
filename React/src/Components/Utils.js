import Cookies from "js-cookie";

export const checkLoggedIn = () => {
  const token = Cookies.get("walkInToken");

  if (!token) {
    window.location.href = "/login";
    return false;
  }

  return true;
};
