import React from "react";
import PersonalInformation from "./PersonalInformation";
import Qualification from "./Qualification";
import { Formik, Form } from "formik";
const ReviewSubmit = (props) => {
  return (
    <div>
      <fieldset disabled>
        <PersonalInformation
          next={props.handleNextStep}
          userData={props.userData}
          setUserData={props.setUserData}
          final={true}
        />

        <Qualification
          prev={props.handlePrevStep}
          next={props.handleNextStep}
          userData={props.userData}
          final={true}
        />
      </fieldset>
      <div className="center">
        <button className="button" type="button" onClick={() => props.prev({})}>
          Previous
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
