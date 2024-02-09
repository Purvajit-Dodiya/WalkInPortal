import React, { Component } from "react";
import Technologies from "./Technologies";
import Input from "../Input";
function ExperiecedForm(props) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;

  return (
    <section className="expericed_form">
      <Input
        type="number"
        name="yearsOfExperiece"
        handleChange={props.handleChange}
        value={props.userDetails.yearsOfExperiece}
        label="Years Of Experiece*"
      />
      <Input
        type="number"
        name="currentCTC"
        handleChange={props.handleChange}
        value={props.userDetails.currentCTC}
        label="Current CTC* (In Rupees)"
      />
      <Input
        type="number"
        name="expectedCTC"
        handleChange={props.handleChange}
        value={props.userDetails.expectedCTC}
        label="Expected CTC* (In Rupees)"
      />
      <Technologies
        handleChange={props.handleChange}
        title="Select All The Technologies You Expertise In*"
        js_n="expertiseInTechnologiesjavascript"
        js={props.userDetails.expertiseInTechnologiesjavascript}
        ajs_n="expertiseInTechnologiesangularJS"
        ajs={props.userDetails.expertiseInTechnologiesangularJS}
        react_n="expertiseInTechnologiesreact"
        react={props.userDetails.expertiseInTechnologiesreact}
        nodejs_n="expertiseInTechnologiesnodeJS"
        nodejs={props.userDetails.expertiseInTechnologiesnodeJS}
        other_n="expertiseInTechnologiesother"
        other={props.userDetails.expertiseInTechnologiesother}
        othertxt_n="expertiseInTechnologiesotherTechnology"
        othertxt={props.userDetails.expertiseInTechnologiesotherTechnology}
      />
      <div>
        <input
          type="radio"
          id="onNoticePeriodyes"
          name="onNoticePeriod"
          value="Yes"
          checked={props.userDetails.onNoticePeriod === "Yes"}
          onChange={props.handleChange}
        />
        <label htmlFor="onNoticePeriodyes">Yes</label>
        <input
          type="radio"
          id="onNoticePeriodno"
          name="onNoticePeriod"
          value="No"
          checked={props.userDetails.onNoticePeriod === "No"}
          onChange={props.handleChange}
        />
        <label htmlFor="onNoticePeriodno">No</label>
      </div>

      <Input
        type="date"
        name="endOfNoticePeriod"
        handleChange={props.handleChange}
        value={props.userDetails.endOfNoticePeriod}
        min={today}
        label="If Yes, when will your notice period end?*"
      />
      <Input
        type="text"
        name="endOfNoticePeriod"
        handleChange={props.handleChange}
        value={props.userDetails.endOfNoticePeriod}
        min={today}
        label="How long is your notice period?* (Mention in months)"
      />
    </section>
  );
}

export default ExperiecedForm;
