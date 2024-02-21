import React, { Component } from "react";
import { Link } from "react-router-dom";
function ProgessBar(props) {
  return (
    <>
      <div className="create_container">
        <div className="back_arrow">
          <a href="/">
            <img src="src/icons/arrow_upward_black_24dp.svg" />
          </a>
        </div>
        <p>Create an account</p>
        <div className="action">
          <Link to="/login">
            <button className="button">CANCEL</button>
          </Link>
          <button
            className={`button ${props.step != 2 ? " disabled_btn" : ""}`}
            disabled={props.step != 2 ? true : false}
            onClick={() => {
              props.submit({}, true);
            }}
          >
            CREATE
          </button>
        </div>
      </div>
      <div className="step_container">
        <span className="decoration"></span>
        <div className={`step ${props.step >= 0 ? " active" : " "}`}>
          <div className="step_number">
            {props.step > 0 ? <img src="src/icons/angled_pen_icon.svg" /> : "1"}
          </div>
          <div className="step_title">Personal Information</div>
        </div>
        <div className={`step ${props.step >= 1 ? " active" : " "}`}>
          <div className="step_number">
            {props.step > 1 ? <img src="src/icons/angled_pen_icon.svg" /> : "2"}
          </div>
          <div className="step_title">Qualifications</div>
        </div>
        <div className={`step ${props.step == 2 ? " active" : " "}`}>
          <div className="step_number">3</div>
          <div className="step_title">Review and Proceed</div>
        </div>
      </div>
    </>
  );
}

export default ProgessBar;
