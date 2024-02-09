import React, { Component } from "react";
import ProgessBar from "./ProgessBar";
import Stagechange from "./Stagechange";
import PersonalInfoForm from "./PersonalInfoForm";
function PersonalInformation(props) {
  //   console.log("hi", props.stage);
  function nextPage() {
    ///validate form on this page
    props.nextStage();
  }

  return (
    <section>
      <ProgessBar stage={props.stage} />
      <PersonalInfoForm
        handleChange={props.handleChange}
        userDetails={props.userDetails}
      />
      <Stagechange nextPage={nextPage} />
    </section>
  );
}

export default PersonalInformation;
