import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/RegisterPage.jsx";
import WalkInHome from "./Pages/WalkInHome.jsx";
import IndividualListing from "./Pages/IndividualListing.jsx";
import SuccessPage from "./Pages/SuccessPage.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WalkInHome />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route path="/listing/:id" element={<IndividualListing />} />
        <Route path="/success/:id" element={<SuccessPage />} />
        <Route exact path="/register" element={<Register />}></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
