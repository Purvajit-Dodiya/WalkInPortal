import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MenuItem from "@mui/material/MenuItem";
import { FormControlLabel, Radio, LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import {
  TextField,
  CheckboxWithLabel,
  SimpleFileUpload,
  Select,
  RadioGroup,
} from "formik-mui";
import * as Yup from "yup";
import Colleges from "./Selections/Colleges";
import EducationQualifications from "./Selections/EducationQualification";
import ProfessionalQualifications from "./ProfessionalQualifications";
import { setLocale } from "yup";
setLocale({
  mixed: {
    notType: "the ${path} is obligatory",
    required: "the field ${path} is obligatory",
    oneOf: "the field ${path} must have one of the following values: ${values}",
  },
});

function Qualification(props) {
  const qualificationValidation = Yup.object({
    aggregatePercentage: Yup.number("Enter Digits")
      .min(0, "Aggregate percentage must be greater than or equal to 0")
      .max(100, "Aggregate percentage must be less than or equal to 100")
      .required("Aggregate percentage is required"),
    yearOfPassing: Yup.number().required("Select year of passing"),
    stream: Yup.string().required("Select your Strem"),
    college: Yup.string().required("Select your College"),
    qualification: Yup.string().required("Select your Qualification"),
    collegeLocation: Yup.string().required("College location is required"),
    applicantType: Yup.string().required("Applicant type is required"),
  });
  function handleSubmit(values) {
    console.log(values);
    props.next(values);
  }
  console.log("qual");
  return (
    <Formik
      validationSchema={qualificationValidation}
      initialValues={{
        ...props.userData,
        endOfNoticePeriod: dayjs(props.userData.endOfNoticePeriod).format(
          "YYYY-MM-DD"
        ),
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        // console.log(values);
        return (
          <Form>
            <details
              open
              className=""
              style={{
                margin: "0px 24px",
              }}
            >
              <summary className="details_header">
                <h3>Educational Qualifications</h3>
                <img src="/src/icons/expand_less_black_24dp.svg" alt="" />
              </summary>

              <div className="educational_qualifications ">
                <div className=" col1">
                  <Field
                    fullWidth
                    variant="standard"
                    component={TextField}
                    label="Aggregate Percentage"
                    name="aggregatePercentage"
                    required
                  ></Field>
                </div>

                <div className=" col1">
                  <Field
                    readOnly={props.final}
                    variant="standard"
                    name="yearOfPassing"
                    component={Select}
                    label="Year of Passing*"
                    required
                  >
                    <MenuItem value={2019}>2019</MenuItem>
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2021}>2021</MenuItem>
                  </Field>
                </div>
                <EducationQualifications final={props.final} />

                <div className=" col35">
                  <Field
                    readOnly={props.final}
                    className="select"
                    variant="standard"
                    name="stream"
                    component={Select}
                    label="Stream*"
                    required
                  >
                    <MenuItem value="cs">Computer Science</MenuItem>
                    <MenuItem value="it">Information Technology</MenuItem>
                    <MenuItem value="commerce">Commerce</MenuItem>
                    <MenuItem value="medical">Medical</MenuItem>
                  </Field>
                </div>
                <Colleges final={props.final} />
                <div className=" col35">
                  <Field
                    className="select"
                    variant="standard"
                    component={TextField}
                    label="If others, please enter your college name"
                    name="otherCollege"
                  ></Field>
                </div>
                <div className=" col1">
                  <Field
                    fullWidth
                    variant="standard"
                    component={TextField}
                    label="Where is your college located?"
                    name="collegeLocation"
                    required
                  ></Field>
                </div>
              </div>
            </details>
            <details
              open
              className="pad-top"
              style={{
                margin: "0px 24px",
              }}
            >
              <summary className="details_header">
                <h3>Professional Qualifications</h3>
                <img src="/src/icons/expand_less_black_24dp.svg" alt="" />
              </summary>
              <div className="professional_qualifications">
                <label className="static_input_label">Applicant Type*</label>
                <div className="radio_group">
                  <label className="radio_label">
                    <Field
                      className="radio"
                      type="radio"
                      name="applicantType"
                      value="Fresher"
                    />
                    Fresher
                  </label>
                  <label className="radio_label">
                    <Field
                      className="radio"
                      type="radio"
                      name="applicantType"
                      value="Experienced"
                    />
                    Experienced
                  </label>
                </div>
              </div>
            </details>
            <div
              className="professional_qualifications "
              style={{ margin: "10px 24px" }}
            >
              <ProfessionalQualifications
                setdate={setFieldValue}
                values={values}
                experienced={
                  values.applicantType == "Experienced" ? true : false
                }
                final={props.final}
              />
            </div>
            {props.final ? (
              ""
            ) : (
              <div className="center">
                <button
                  className="button"
                  type="button"
                  onClick={() => props.prev(values)}
                >
                  PREVIOUS
                </button>
                <button className="button" type="submit">
                  NEXT
                </button>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default Qualification;
