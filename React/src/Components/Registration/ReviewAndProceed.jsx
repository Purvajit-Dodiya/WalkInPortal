import React from "react";
import ProgessBar from "./ProgessBar";
import Stagechange from "./Stagechange";
import EducationQualificationForm from "./EducationQualificationForm";
import ProfessionalQualifications from "./ProfessionalQualifications";
import PersonalInfoForm from "./PersonalInfoForm";
import { registerMutation } from "/src/Graphql/Mutation.graphql";
import { useQuery, useMutation, gql } from "@apollo/client";

function ReviewAndProceed(props) {
  const [registerMutationFn, { error }] = useMutation(registerMutation, {
    variables: {
      input: {
        // aggregatePercentage: 60,
        aggregatePercentage: parseInt(props.userDetails.aggregatePercentage),
        // applicationType: "Experienced",
        applicationType: props.userDetails.applicantType,
        // appliedBefore: false,
        appliedBefore: props.userDetails.appearedBefore == "No" ? false : true,
        // roleApplied: null,
        roleApplied:
          props.userDetails.appearedBefore == "No"
            ? null
            : props.userDetails.roleApplied,
        // collegeId: "1",
        collegeId: props.userDetails.college,
        // collegeLocation: "ahmedabad",
        collegeLocation: props.userDetails.collegeLocation,
        // currentCTC: 35000,
        currentCTC: parseInt(props.userDetails.currentCTC),
        // expectedCTC: 65000,
        expectedCTC: parseInt(props.userDetails.expectedCTC),
        // educationQualification: "1",
        educationQualification: props.userDetails.qualification,
        // email: "register15@gmail.com",
        email: props.userDetails.email,
        // firstName: "register",
        firstName: props.userDetails.firstname,
        // lastName: "register",
        lastName: props.userDetails.lastname,
        // onNoticePeriod: true,
        onNoticePeriod: props.userDetails.onNoticePeriod == "No" ? false : true,
        // durationOfNoticePeriod: 3,
        durationOfNoticePeriod: parseInt(
          props.userDetails.durationOfNoticePeriod
        ),
        // endDateOfNotice: "2024-02-15",
        endDateOfNotice: props.userDetails.endOfNoticePeriod
          ? props.userDetails.endOfNoticePeriod.toString()
          : "",

        // otherExpertiseTechnologies: "django",
        otherExpertiseTechnologies:
          props.userDetails.expertiseInTechnologieotherTechnology,
        // otherTechnologies: "django",
        otherTechnologies:
          props.userDetails.familiarTechnologiesotherTechnology,
        // passingYear: 2021,
        passingYear: parseInt(props.userDetails.yearOfPassing),
        // password: "mypass",
        password: "mypass",
        // phoneNumber: "9512511323",
        phoneNumber: props.userDetails.phoneNumber,
        // portfolioURL: "text.com",
        portfolioURL: props.userDetails.portfolioUrl,
        // profilePhoto: "test.jpg",
        profilePhoto: props.userDetails.profilePhoto.name,
        // receiveUpdates=true;
        receiveUpdates: props.userDetails.recieveJobUpdates,
        haveReferral: props.userDetails.referredby ? true : false,
        referralEmployeeName: props.userDetails.referredby,
        // resume: "test.pdfccc",
        resume: props.userDetails.resume.name
          ? props.userDetails.resume.name
          : "test",

        // stream: "cse",
        stream: props.userDetails.stream,
        // yearsOfExperience: 3,
        yearsOfExperience: parseInt(props.userDetails.yearsOfExperiece),
        technologiesExpertise: "React",
        technologiesFamiliar: "React",
        preferredJobRole: "Software Engineer,Software Quality Engineer",
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
  function register() {
    console.log(props.userDetails);
    registerMutationFn();
  }
  function prevPage() {
    ///validate form on this page
    //no need of validation
    props.prevStage();
  }
  return (
    <section>
      <ProgessBar stage={props.stage} register={register} />
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
    </section>
  );
}

export default ReviewAndProceed;
