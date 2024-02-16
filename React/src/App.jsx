import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Registration/Register";
import WalkInHome from "./Components/WalkInPortal/WalkInHome";
import IndividualListing from "./Components/WalkInPortal/IndividualListing";
import SuccessPage from "./Components/WalkInPortal/SuccessPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WalkInHome />}></Route>
        {/* <Route exact path="/listing" element={<IndividualListing />}></Route> */}
        <Route exact path="/login" element={<Login />}></Route>
        <Route path="/listing/:id" element={<IndividualListing />} />
        <Route path="/success/:id" element={<SuccessPage />} />
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
