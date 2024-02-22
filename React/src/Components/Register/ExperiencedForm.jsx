import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, CheckboxWithLabel, SimpleFileUpload } from "formik-mui";
const ExperiencedForm = (props) => {
  return (
    <div>
      <div className="">
        <Field
          margin="normal"
          fullWidth
          variant="standard"
          component={TextField}
          label="Years of Experience"
          name="yearsOfExperiece"
          required={props.experienced}
        ></Field>
        <ErrorMessage name="yearsOfExperiece">Error</ErrorMessage>
      </div>
      <div className="">
        <Field
          margin="normal"
          fullWidth
          variant="standard"
          component={TextField}
          label="Current CTC* (In Rupees)"
          name="currentCTC"
          required={props.experienced}
        ></Field>
      </div>
      <div className="">
        <Field
          margin="normal"
          fullWidth
          variant="standard"
          component={TextField}
          label="Expected CTC* (In Rupees)"
          name="expectedCTC"
          required={props.experienced}
        ></Field>
      </div>
      <div className="rows ">
        <label className="static_input_label">Preferred Job Role *</label>
        <Field
          color="success"
          component={CheckboxWithLabel}
          type="checkbox"
          name="expertiseInTechnologies"
          value="Javascript"
          Label={{ label: "Javascript" }}
        ></Field>
        <Field
          color="success"
          component={CheckboxWithLabel}
          type="checkbox"
          value="React"
          name="expertiseInTechnologies"
          Label={{ label: "React" }}
        ></Field>
        <Field
          color="success"
          component={CheckboxWithLabel}
          type="checkbox"
          value="Angular JS"
          name="expertiseInTechnologies"
          Label={{ label: "Angular JS" }}
        ></Field>
        <Field
          color="success"
          component={CheckboxWithLabel}
          type="checkbox"
          value="Node JS"
          name="expertiseInTechnologies"
          Label={{ label: "Node JS" }}
        ></Field>
        <Field
          color="success"
          component={CheckboxWithLabel}
          type="checkbox"
          value="expertiseInTechnologiesother"
          name="expertiseInTechnologiesother"
          Label={{ label: "Other" }}
        ></Field>
        <Field
          margin="normal"
          fullWidth
          variant="standard"
          component={TextField}
          label="If others, please mention"
          name="expertiseInTechnologiesotherTechnology"
          required={props.values.expertiseInTechnologiesother ? "required" : ""}
        ></Field>
        <ErrorMessage
          name="expertiseInTechnologies"
          component="div"
          className="error_message"
        />
      </div>
    </div>
  );
};

export default ExperiencedForm;
