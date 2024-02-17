import React, { Component } from "react";
import Input from "../Input";
import Colleges from "./Selections/Colleges";
import EducationQualification from "./Selections/EducationQualification";

function EducationQualificationForm(props) {
  return (
    <section>
      <div className="form_heading">Educational Qualifications</div>
      <div className="container educational_qualifications">
        <Input
          className="col1"
          type="number"
          name="aggregatePercentage"
          handleChange={props.handleChange}
          value={props.userDetails.aggregatePercentage}
          label="Aggregate Percentage*"
          required
        />
        <div className="input col1">
          <select
            name="yearOfPassing"
            value={props.userDetails.yearOfPassing}
            id="yearOfPassing"
            className="input_field"
            onChange={props.handleChange}
            required
          >
            <option value="">--choose year--</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <label className="static_input_label">Year of Passing*</label>
        </div>

        <div className="input col13">
          <EducationQualification
            handleChange={props.handleChange}
            qualification={props.userDetails.qualification}
          />
          <label className="static_input_label">Qualification</label>
        </div>
        <div className="input col35">
          <select
            name="stream"
            value={props.userDetails.stream}
            id="stream"
            className="input_field"
            onChange={props.handleChange}
            required
          >
            <option value="">--choose stream--</option>

            <option value="cs">Computer Science</option>
            <option value="it">Information Technology</option>
            <option value="commerce">Commerce</option>
            <option value="medical">Medical</option>
          </select>
          <label className="static_input_label">Stream*</label>
        </div>
        <div className="input col13">
          <Colleges
            college={props.userDetails.college}
            handleChange={props.handleChange}
          />
          <label className="static_input_label">College*</label>
        </div>

        <Input
          className="col35"
          type="text"
          name="otherCollege"
          handleChange={props.handleChange}
          value={props.userDetails.otherCollege}
          label="If others, please enter your college name"
        />
        <Input
          className="col1"
          type="text"
          name="collegeLocation"
          handleChange={props.handleChange}
          value={props.userDetails.collegeLocation}
          label="Where is your college located?*"
          required
        />
      </div>
    </section>
  );
}

export default EducationQualificationForm;
