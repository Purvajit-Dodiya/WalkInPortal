import React, { Component } from "react";
import ProgessBar from "./ProgessBar";
import Stagechange from "./Stagechange";

import EducationQualificationForm from "./EducationQualificationForm";
import ProfessionalQualifications from "./ProfessionalQualifications";
function Qualifications(props) {
  function nextPage() {
    ///validate form on this page
    props.nextStage();
  }
  function prevPage() {
    //no need of validation
    props.prevStage();
  }
  return (
    <section>
      <ProgessBar stage={props.stage} />

      <EducationQualificationForm
        handleChange={props.handleChange}
        userDetails={props.userDetails}
      />
      <ProfessionalQualifications
        handleChange={props.handleChange}
        userDetails={props.userDetails}
      />

      <Stagechange nextPage={nextPage} prevPage={prevPage} />
    </section>
  );
}

export default Qualifications;
