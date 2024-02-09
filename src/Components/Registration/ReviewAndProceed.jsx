import React from "react";
import ProgessBar from "./ProgessBar";
import Stagechange from "./Stagechange";
import EducationQualificationForm from "./EducationQualificationForm";
import ProfessionalQualifications from "./ProfessionalQualifications";
import PersonalInfoForm from "./PersonalInfoForm";
function ReviewAndProceed(props) {
  function prevPage() {
    ///validate form on this page
    //no need of validation
    props.prevStage();
  }
  return (
    <div>
      <ProgessBar stage={props.stage} />
      <fieldset disabled="disabled">
        <PersonalInfoForm
          handleChange={props.handleChange}
          userDetails={props.userDetails}
        />
      </fieldset>
      <fieldset disabled="disabled">
        <EducationQualificationForm
          handleChange={props.handleChange}
          userDetails={props.userDetails}
        />
      </fieldset>
      <fieldset disabled="disabled">
        <ProfessionalQualifications
          handleChange={props.handleChange}
          userDetails={props.userDetails}
        />
      </fieldset>
      <Stagechange prevPage={prevPage} />
    </div>
  );
}

export default ReviewAndProceed;
