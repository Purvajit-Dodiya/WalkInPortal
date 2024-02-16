import React, { Component } from "react";
import ProgessBar from "./ProgessBar";
import Stagechange from "./Stagechange";
import PersonalInfoForm from "./PersonalInfoForm";
function PersonalInformation(props) {
  //   console.log("hi", props.stage);
  const handleSubmit = async (e) => {
    e.preventDefault();
    ///validate form on this page
    if (
      props.userDetails.prefferedIstructionalDesigner &&
      props.userDetails.prefferedSoftwareEngineer &&
      props.userDetails.prefferedSoftwareQualityEngineer
    ) {
      console.log(props.userDetails);
    }

    props.nextStage();
  };

  return (
    <div>
      <ProgessBar stage={props.stage} />
      <form onSubmit={handleSubmit}>
        <PersonalInfoForm
          handleChange={props.handleChange}
          userDetails={props.userDetails}
        />
        <Stagechange nextPage={handleSubmit} />
      </form>
    </div>
  );
}

export default PersonalInformation;
