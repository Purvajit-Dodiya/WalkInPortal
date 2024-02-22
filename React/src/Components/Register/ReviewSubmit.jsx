import React from "react";
import PersonalInformation from "./PersonalInformation";
import Qualification from "./Qualification";
import { Formik, Form } from "formik";
import Editlogo from "../../icons/angled_pen_icon.svg";
const ReviewSubmit = (props) => {
  return (
    <div>
      <div className="edit_container">
        Personal Information
        <button
          className="edit"
          onClick={() => {
            props.changeToSpecificStep(0);
          }}
        >
          <img className="edit_logo" src={Editlogo} alt="" />
          Edit
        </button>
      </div>
      <fieldset disabled>
        <PersonalInformation
          next={props.handleNextStep}
          userData={props.userData}
          setUserData={props.setUserData}
          final={true}
        />
      </fieldset>
      <div className="edit_container">
        Qualifications
        <button
          className="edit"
          onClick={() => {
            props.changeToSpecificStep(1);
          }}
        >
          <img className="edit_logo" src={Editlogo} alt="" />
          Edit
        </button>
      </div>
      <fieldset disabled>
        <Qualification
          prev={props.handlePrevStep}
          next={props.handleNextStep}
          userData={props.userData}
          final={true}
        />
      </fieldset>

      <div className="center">
        <button className="button" type="button" onClick={() => props.prev({})}>
          PREVIOUS
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
