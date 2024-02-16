import React from "react";
import PersonalInformation from "./PersonalInformation";
import Qualifications from "./Qualifications";
import ReviewAndProceed from "./ReviewAndProceed";
import Header from "../Header";
import Cookies from "js-cookie";

function Register() {
  const isLoggedIn = () => {
    const token = Cookies.get("walkInToken");

    if (!token) {
      return false;
    }

    return true;
  };
  if (isLoggedIn() === true) {
    console.log("to home");
    window.location.href = "/";
  }
  const [stage, setstage] = React.useState(1);
  function nextStage() {
    // console.log("next");
    setstage((prev) => prev + 1);
  }

  function prevStage() {
    setstage((prev) => prev - 1);
  }
  const [userDetails, setUserDetails] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    resume: "test",
    portfolioUrl: "",
    prefferedIstructionalDesigner: false,
    prefferedSoftwareEngineer: false,
    prefferedSoftwareQualityEngineer: false,
    profilePhoto: null,
    referredby: "",
    recieveJobUpdates: true,
    aggregatePercentage: null,
    yearOfPassing: null,
    qualification: "",
    stream: "",
    college: "",
    otherCollege: "",
    collegeLocation: "",
    applicantType: "fresher",
    familiarTechnologiesjavascript: false,
    familiarTechnologiesangularJS: false,
    familiarTechnologiesreact: false,
    familiarTechnologiesnodeJS: false,
    familiarTechnologiesother: false,
    familiarTechnologiesotherTechnology: "",
    appearedBefore: "No",
    roleApplied: "",
    yearsOfExperiece: "",
    currentCTC: "",
    expectedCTC: "",
    expertiseInTechnologiejavascript: false,
    expertiseInTechnologieangularJS: false,
    expertiseInTechnologiereact: false,
    expertiseInTechnologienodeJS: false,
    expertiseInTechnologieother: false,
    expertiseInTechnologieotherTechnology: "",
    onNoticePeriod: "No",
    endOfNoticePeriod: "",
    durationOfNoticePeriod: "",
  });

  // console.log(userDetails);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    // console.log("name", name, checked);

    setUserDetails((prevUserDetails) => {
      if (type === "file") {
        console.log(event.target.files[0]);
        return {
          ...prevUserDetails,
          [name]: event.target.files[0],
        };
      }
      return {
        ...prevUserDetails,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function renderSwitch() {
    switch (stage) {
      case 1:
        return (
          <PersonalInformation
            stage={stage}
            nextStage={nextStage}
            handleChange={handleChange}
            userDetails={userDetails}
          />
        );
      case 2:
        return (
          <Qualifications
            stage={stage}
            nextStage={nextStage}
            prevStage={prevStage}
            handleChange={handleChange}
            userDetails={userDetails}
          />
        );
      case 3:
        return (
          <ReviewAndProceed
            stage={stage}
            prevStage={prevStage}
            handleChange={handleChange}
            userDetails={userDetails}
          />
        );
      default:
        return (
          <PersonalInformation
            stage={stage}
            nextStage={nextStage}
            handleChange={handleChange}
          />
        );
    }
  }
  return (
    <div className="head_body">
      <Header />
      {renderSwitch()}
    </div>
  );
}

export default Register;
