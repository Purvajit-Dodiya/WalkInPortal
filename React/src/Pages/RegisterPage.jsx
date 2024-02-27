import React, { useState } from "react";
import { Card, CardContent, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import PersonalInformation from "../Components/Register/PersonalInformation";
import Qualification from "../Components/Register/Qualification";
import Header from "../Components/Header";
import * as Yup from "yup";
import dayjs from "dayjs";
import ProgessBar from "../Components/Register/ProgessBar";
import ReviewSubmit from "../Components/Register/ReviewSubmit";
import { registerMutation } from "/src/Graphql/Mutation.graphql";
import { useQuery, useMutation, gql } from "@apollo/client";
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
  applicantType: "Fresher",
  familiarTechnologies: [],
  familiarTechnologiesother: "",
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
  const [userData, setUserData] = useState(data);
  console.log(userData);
  const [currentStep, setCurrentStep] = useState(0);
  const [registerMutationFn, { error }] = useMutation(registerMutation, {
    variables: {
      input: {
        // aggregatePercentage: 60,
        aggregatePercentage: parseInt(userData.aggregatePercentage),
        // applicationType: "Experienced",
        applicationType: userData.applicantType,
        // appliedBefore: false,
        appliedBefore: userData.appearedBefore == "No" ? false : true,
        // roleApplied: null,
        roleApplied:
          userData.appearedBefore == "No" ? null : userData.roleApplied,
        // collegeId: "1",
        collegeId: userData.college,
        // collegeLocation: "ahmedabad",
        collegeLocation: userData.collegeLocation,
        // currentCTC: 35000,
        currentCTC: parseInt(userData.currentCTC),
        // expectedCTC: 65000,
        expectedCTC: parseInt(userData.expectedCTC),
        // educationQualification: "1",
        educationQualification: userData.qualification,
        // email: "register15@gmail.com",
        email: userData.email,
        // firstName: "register",
        firstName: userData.firstname,
        // lastName: "register",
        lastName: userData.lastname,
        // onNoticePeriod: true,
        onNoticePeriod: userData.onNoticePeriod == "No" ? false : true,
        // durationOfNoticePeriod: 3,
        durationOfNoticePeriod: parseInt(
          userData.durationOfNoticePeriod.slice(0, 1)
        ),
        // endDateOfNotice: "2024-02-15",
        endDateOfNotice:
          userData.onNoticePeriod == "Yes"
            ? userData.endOfNoticePeriod.toString()
            : null,

        // otherExpertiseTechnologies: "django",
        otherExpertiseTechnologies:
          userData.expertiseInTechnologiesotherTechnology,
        // otherTechnologies: "django",
        otherTechnologies: userData.familiarTechnologiesotherTechnology,
        // passingYear: 2021,
        passingYear: parseInt(userData.yearOfPassing),
        // password: "mypass",
        password: "mypass",
        // phoneNumber: "9512511323",
        phoneNumber: userData.phoneNumber,
        // portfolioURL: "text.com",
        portfolioURL: userData.portfolioUrl,
        // profilePhoto: "test.jpg",
        profilePhoto: userData.profilePhoto.name,
        // receiveUpdates=true;
        receiveUpdates: userData.recieveJobUpdates,
        haveReferral: userData.referredby ? true : false,
        referralEmployeeName: userData.referredby,
        // resume: "test.pdfccc",
        resume: userData.resume.name ? userData.resume.name : "test",

        // stream: "cse",
        stream: userData.stream,
        // yearsOfExperience: 3,
        yearsOfExperience: parseInt(userData.yearsOfExperiece),
        technologiesExpertise: userData.expertiseInTechnologies.join(","),
        technologiesFamiliar: userData.familiarTechnologies.join(","),
        preferredJobRole: userData.preferredjobrole.join(","),
      },
    },
    onCompleted: (data) => {
      console.log("Register mutaion", data);
      alert("Registration Complete");
      window.location.href = "/login";
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          alert(message);
        });
      if (networkError) console.log(`[Network error]: ${networkError}`);
    },
  });
  const makegqlcall = (d) => {
    console.log("Submit req to gql:", d);
    console.log(userData.preferredjobrole.join(","));
    registerMutationFn();
    console.log("Done");
  };
  const handleNextStep = (newData, final = false) => {
    console.log(final);
    console.log("step", currentStep);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  function changeToSpecificStep(step) {
    setCurrentStep(step);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
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
      final={currentStep == 3 ? true : false}
    />,
    <ReviewSubmit
      userData={userData}
      prev={handlePrevStep}
      submit={handleNextStep}
      changeToSpecificStep={changeToSpecificStep}
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
