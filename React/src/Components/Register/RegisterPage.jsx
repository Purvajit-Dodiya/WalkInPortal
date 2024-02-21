import React, { useState } from "react";
import { Card, CardContent, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import PersonalInformation from "./PersonalInformation";
import Qualification from "./Qualification";
import Header from "../Header";
import * as Yup from "yup";
import dayjs from "dayjs";
import ProgessBar from "./ProgessBar";
import ReviewSubmit from "./ReviewSubmit";
const data = {
  firstname: "",
  lastname: "",
  email: "",
  phoneNumber: "",
  resume: "",
  portfolioUrl: "",
  preferredjobrole: [],
  profilePhoto: "",
  referredby: "",
  recieveJobUpdates: true,
  aggregatePercentage: null,
  yearOfPassing: "",
  qualification: "",
  stream: "",
  checked: "",
  college: "",
  otherCollege: "",
  collegeLocation: "",
  applicantType: "fresher",
  familiarTechnologies: [],
  familiarTechnologiesother: [],
  familiarTechnologiesotherTechnology: "",
  appearedBefore: "No",
  roleApplied: "",
  yearsOfExperiece: "",
  currentCTC: "",
  expectedCTC: "",
  expertiseInTechnologies: [],
  expertiseInTechnologiesother: [],
  expertiseInTechnologiesotherTechnology: "",
  onNoticePeriod: "No",
  endOfNoticePeriod: "2024-02-22",
  durationOfNoticePeriod: "",
};

const RegisterPage = (props) => {
  const makegqlcall = (d) => {
    console.log("Submit req to gql:", d);
  };
  const [userData, setUserData] = useState(data);
  console.log(userData);
  const [currentStep, setCurrentStep] = useState(0);
  const handleNextStep = (newData, final = false) => {
    console.log(final);
    console.log("step", currentStep);
    if (currentStep === 2) {
      makegqlcall(userData);
      return;
    }
    setUserData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };
  const steps = [
    <PersonalInformation
      next={handleNextStep}
      userData={userData}
      setUserData={setUserData}
    />,
    <Qualification
      prev={handlePrevStep}
      next={handleNextStep}
      userData={userData}
    />,
    <ReviewSubmit
      userData={userData}
      prev={handlePrevStep}
      submit={handleNextStep}
    />,
  ];

  return (
    <div>
      <Header />
      <ProgessBar step={currentStep} submit={handleNextStep} />
      {steps[currentStep]}
    </div>
  );
};

export default RegisterPage;
