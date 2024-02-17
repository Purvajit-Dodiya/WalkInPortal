import React, { Component } from "react";
import Technologies from "./Technologies";
import ExperiecedForm from "./ExperiecedForm";
import Input from "../Input";

function ProfessionalQualifications(props) {
  return (
    <section>
      <div className="form_heading">Professional Qualifications</div>
      <section className="container">
        <div className="input">
          <div>
            <input
              type="radio"
              className="radio"
              id="fresher"
              name="applicantType"
              value="fresher"
              checked={props.userDetails.applicantType === "fresher"}
              onChange={props.handleChange}
            />
            <label className="radio_label" htmlFor="fresher">
              Fresher
            </label>
            <input
              type="radio"
              className="radio"
              id="experienced"
              name="applicantType"
              value="experienced"
              checked={props.userDetails.applicantType === "experienced"}
              onChange={props.handleChange}
            />
            <label className="radio_label" htmlFor="experienced">
              Experienced
            </label>
          </div>
          <label className="static_input_label">Applicant Type*</label>
        </div>
      </section>
      <div className="pad"></div>
      <section className="container">
        <div>
          {props.userDetails.applicantType === "experienced" && (
            <ExperiecedForm
              userDetails={props.userDetails}
              handleChange={props.handleChange}
            />
          )}
          <Technologies
            handleChange={props.handleChange}
            title="Select All The Technologies You Are Familiar In"
            js_n="familiarTechnologiesjavascript"
            js={props.userDetails.familiarTechnologiesjavascript}
            ajs_n="familiarTechnologiesangularJS"
            ajs={props.userDetails.familiarTechnologiesangularJS}
            react_n="familiarTechnologiesreact"
            react={props.userDetails.familiarTechnologiesreact}
            nodejs_n="familiarTechnologiesnodeJS"
            nodejs={props.userDetails.familiarTechnologiesnodeJS}
            other_n="familiarTechnologiesother"
            other={props.userDetails.familiarTechnologiesother}
            othertxt_n="familiarTechnologiesotherTechnology"
            othertxt={props.userDetails.familiarTechnologiesotherTechnology}
          />
          <div>
            <div className="input">
              <Input
                type="text"
                name="roleApplied"
                handleChange={props.handleChange}
                value={props.userDetails.roleApplied}
                label="If Yes, which role did you apply for?"
                required={props.userDetails.appearedBefore === "Yes"}
              />
              <div>
                <input
                  type="radio"
                  className="radio"
                  id="appearedBeforeyes"
                  name="appearedBefore"
                  value="Yes"
                  checked={props.userDetails.appearedBefore === "Yes"}
                  onChange={props.handleChange}
                />
                <label className="radio_label" htmlFor="appearedBeforeyes">
                  Yes
                </label>
                <input
                  type="radio"
                  className="radio"
                  id="appearedBeforeno"
                  name="appearedBefore"
                  value="No"
                  checked={props.userDetails.appearedBefore === "No"}
                  onChange={props.handleChange}
                />
                <label className="radio_label" htmlFor="appearedBeforeno">
                  No
                </label>
              </div>
              <label className="static_input_label">
                Have You Appeared For Any Test By Zeus in the past 12 months?*
              </label>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ProfessionalQualifications;
