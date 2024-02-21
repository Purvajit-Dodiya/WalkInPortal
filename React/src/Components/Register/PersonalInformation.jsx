import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, CheckboxWithLabel, SimpleFileUpload } from "formik-mui";
import * as Yup from "yup";
import ProfilePhoto from "./ProfilePhoto";
function PersonalInformation(props) {
  const personalInfoValidation = Yup.object({
    firstname: Yup.string().required().label("First Name"),
    lastname: Yup.string().required().label("Last Name"),
    email: Yup.string().required().label("Last Name"),
    phoneNumber: Yup.string().required().label("Last Name"),
    preferredjobrole: Yup.array()
      .min(1, "At least one Job Role needs to be selected")
      .required("At least one Job Role needs to be selected")
      .label("Preferred Jobrole"),
  });
  function handleSubmit(values, helpers) {
    console.log("values");
    props.next(values);
  }
  return (
    <Formik
      validationSchema={personalInfoValidation}
      initialValues={props.userData}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        console.log("values", values);
        return (
          <Form>
            <section className="container ">
              <div className="half">
                <div className="rows input_container">
                  <Field
                    margin="normal"
                    fullWidth
                    variant="standard"
                    component={TextField}
                    label="First Name*"
                    name="firstname"
                  ></Field>
                </div>
                <div className="rows input_container">
                  <Field
                    margin="normal"
                    fullWidth
                    variant="standard"
                    component={TextField}
                    label="Last Name*"
                    name="lastname"
                  ></Field>
                </div>

                <div className="rows input_container">
                  <Field
                    margin="normal"
                    fullWidth
                    variant="standard"
                    component={TextField}
                    label="Email*"
                    name="email"
                  ></Field>
                </div>

                <div className="rows input_container">
                  <Field
                    fullWidth
                    variant="standard"
                    component={TextField}
                    label="Phone Number*"
                    name="phoneNumber"
                  ></Field>
                </div>
                <div className="input_container">
                  <label htmlFor="resume" className="upload_label">
                    <img src="src/icons/Upload_black_24dp.svg" alt="up" />
                    UPLOAD RESUME
                  </label>
                  <input
                    hidden={values.resume ? "" : "hidden"}
                    id="resume"
                    name="resume"
                    type="file"
                    onChange={(e) => {
                      setFieldValue("resume", e.target.files[0]);
                    }}
                  />
                </div>
                <div className="rows input_container">
                  <Field
                    fullWidth
                    variant="standard"
                    component={TextField}
                    label="Enter Portfolio URL (if any)"
                    name="portfolioUrl"
                  ></Field>
                </div>
                <div className="rows input_container">
                  <label className="static_input_label">
                    Preferred Job Role *
                  </label>
                  <Field
                    color="success"
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name="preferredjobrole"
                    value="Istructional Designer"
                    Label={{ label: "Istructional Designer" }}
                  ></Field>
                  <Field
                    color="success"
                    component={CheckboxWithLabel}
                    type="checkbox"
                    value="Software Engineer"
                    name="preferredjobrole"
                    Label={{ label: "Software Engineer" }}
                  ></Field>
                  <Field
                    color="success"
                    component={CheckboxWithLabel}
                    type="checkbox"
                    value="Software Quality Engineer"
                    name="preferredjobrole"
                    Label={{ label: "Software Quality Engineer" }}
                  ></Field>
                  <ErrorMessage
                    name="preferredjobrole"
                    component="div"
                    className="error_message"
                  />
                </div>
                <div className="rows input_container">
                  <label className="static_input_label">
                    If You Are Registering Via A Referral, Please Mention Full
                    Name Of The Employee Who Referred You
                  </label>
                  <Field
                    fullWidth
                    variant="standard"
                    component={TextField}
                    name="referredby"
                  ></Field>
                </div>
                <div className="rows input_container">
                  <Field
                    color="success"
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name="recieveJobUpdates"
                    Label={{ label: "Send me job related updates via mail" }}
                  ></Field>
                </div>
              </div>
              <div className="half right_top">
                <div className="pad profile">
                  <label htmlFor="profilePhoto" style={{ cursor: "pointer" }}>
                    <ProfilePhoto file={values.profilePhoto} />
                  </label>
                  <label htmlFor="profilePhoto" className="upload_label">
                    UPLOAD DISPLAY PICTURE
                  </label>
                  <label htmlFor="profilePhoto" className="static_input_label">
                    Max. image size: 5 MB
                  </label>
                  <input
                    hidden
                    type="file"
                    name="profilePhoto"
                    id="profilePhoto"
                    onChange={(e) => {
                      setFieldValue("profilePhoto", e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </section>
            {props.final ? (
              ""
            ) : (
              <div className="center">
                <button className="button" type="submit">
                  Next
                </button>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default PersonalInformation;
