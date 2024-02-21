import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, CheckboxWithLabel, SimpleFileUpload } from "formik-mui";
import ExperiencedForm from "./ExperiencedForm";
import NoticePeriod from "./NoticePeriod";
const ProfessionalQualifications = (props) => {
  return (
    <div>
      {props.experienced && <ExperiencedForm />}
      <div className="rows input_container">
        <label className="static_input_label">Preferred Job Role *</label>
        <Field
          color="success"
          component={CheckboxWithLabel}
          type="checkbox"
          name="familiarTechnologies"
          value="Javascript"
          Label={{ label: "Javascript" }}
        ></Field>
        <Field
          color="success"
          component={CheckboxWithLabel}
          type="checkbox"
          value="React"
          name="familiarTechnologies"
          Label={{ label: "React" }}
        ></Field>
        <Field
          color="success"
          component={CheckboxWithLabel}
          type="checkbox"
          value="Angular JS"
          name="familiarTechnologies"
          Label={{ label: "Angular JS" }}
        ></Field>
        <Field
          color="success"
          component={CheckboxWithLabel}
          type="checkbox"
          value="Node JS"
          name="familiarTechnologies"
          Label={{ label: "Node JS" }}
        ></Field>
        <Field
          color="success"
          component={CheckboxWithLabel}
          type="checkbox"
          value="familiarTechnologiesother"
          name="familiarTechnologiesother"
          Label={{ label: "Other" }}
        ></Field>
        <Field
          margin="normal"
          fullWidth
          variant="standard"
          component={TextField}
          label="If others, please mention"
          name="familiarTechnologiesotherTechnology"
        ></Field>
        <ErrorMessage
          name="familiarTechnologies"
          component="div"
          className="error_message"
        />
      </div>
      {props.experienced && (
        <NoticePeriod values={props.values} setdate={props.setdate} />
      )}

      <label className="static_input_label">
        Have You Appeared For Any Test By Zeus in the past 12 months?*
      </label>
      <div className="radio_group">
        <label className="radio_label">
          <Field
            className="radio"
            type="radio"
            name="appearedBefore"
            value="Yes"
          />
          Yes
        </label>
        <label className="radio_label">
          <Field
            className="radio"
            type="radio"
            name="appearedBefore"
            value="No"
          />
          No
        </label>
        <Field
          margin="normal"
          fullWidth
          variant="standard"
          component={TextField}
          label="If Yes, which role did you apply for?"
          name="roleApplied"
        ></Field>
      </div>
    </div>
  );
};

export default ProfessionalQualifications;
