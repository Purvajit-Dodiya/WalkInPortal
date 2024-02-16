import React, { Component } from "react";
import ProgessBar from "./ProgessBar";
import Stagechange from "./Stagechange";

import EducationQualificationForm from "./EducationQualificationForm";
import ProfessionalQualifications from "./ProfessionalQualifications";
function Qualifications(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    ///validate form on this page

    props.nextStage();
  };
  function prevPage() {
    //no need of validation
    props.prevStage();
  }
  return (
    <section>
      <ProgessBar stage={props.stage} />
      <form onSubmit={handleSubmit}>
        <EducationQualificationForm
          handleChange={props.handleChange}
          userDetails={props.userDetails}
        />
        <ProfessionalQualifications
          handleChange={props.handleChange}
          userDetails={props.userDetails}
        />

        <Stagechange prevPage={prevPage} nextPage={true} />
      </form>
    </section>
  );
}

export default Qualifications;
