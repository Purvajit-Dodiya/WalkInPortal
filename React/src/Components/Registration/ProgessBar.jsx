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
          <button className="button">
            <Link className="link" to="/login">
              CANCEL
            </Link>
          </button>
          <button
            className={`button ${props.stage != 3 ? " disabled_btn" : ""}`}
            disabled={props.stage != 3 ? true : false}
          >
            CREATE
          </button>
        </div>
      </div>
      <div className="step_container">
        <span className="decoration"></span>
        <div className={`step ${props.stage >= 1 ? " active" : " "}`}>
          <div className="step_number">
            {props.stage > 1 ? (
              <img src="src/icons/angled_pen_icon.svg" />
            ) : (
              "1"
            )}
          </div>
          <div className="step_title">Personal Information</div>
        </div>
        <div className={`step ${props.stage >= 2 ? " active" : " "}`}>
          <div className="step_number">
            {props.stage > 2 ? (
              <img src="src/icons/angled_pen_icon.svg" />
            ) : (
              "2"
            )}
          </div>
          <div className="step_title">Qualifications</div>
        </div>
        <div className={`step ${props.stage == 3 ? " active" : " "}`}>
          <div className="step_number">3</div>
          <div className="step_title">Review and Proceed</div>
        </div>
      </div>
    </>
  );
}

export default ProgessBar;