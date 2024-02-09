import React, { Component } from "react";
import Input from "../Input";
function EducationQualificationForm(props) {
  return (
    <section>
      <div className="form form_heading">Educational Qualifications</div>
      <div className="form educational_qualifications">
        <Input
          className="col1"
          type="number"
          name="aggregatePercentage"
          handleChange={props.handleChange}
          value={props.userDetails.aggregatePercentage}
          label="Aggregate Percentage*"
        />
        <div className="input col1">
          <select
            name="yearOfPassing"
            value={props.userDetails.yearOfPassing}
            id="yearOfPassing"
            className="input_field"
            onChange={props.handleChange}
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
          <select
            name="qualification"
            value={props.userDetails.qualification}
            id="qualification"
            className="input_field"
            onChange={props.handleChange}
          >
            <option value="">--choose qualification--</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">Ph.D.</option>
            <option value="associate">Associate Degree</option>
            <option value="diploma">Diploma</option>
          </select>
          <label className="static_input_label">Qualification</label>
        </div>
        <div className="input col35">
          <select
            name="stream"
            value={props.userDetails.stream}
            id="stream"
            className="input_field"
            onChange={props.handleChange}
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
          <select
            name="college"
            value={props.userDetails.college}
            id="college"
            className="input_field"
            onChange={props.handleChange}
          >
            <option value="">--choose college--</option>
            <option value="nirma">Nirma Institute of Technology (NIRMA)</option>
            <option value="ld">L.D. College of Engineering</option>
            <option value="msu">Maharaja Sayajirao University (MSU)</option>
            <option value="pit">Pune Institute of Technology (PIT)</option>
            <option value="vjti">
              Veermata Jijabai Technological Institute (VJTI)
            </option>
          </select>
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
        />
      </div>
    </section>
  );
}

export default EducationQualificationForm;
