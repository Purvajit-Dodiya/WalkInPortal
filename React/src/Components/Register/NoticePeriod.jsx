import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Select,
  CheckboxWithLabel,
  SimpleFileUpload,
} from "formik-mui";
import MenuItem from "@mui/material/MenuItem";
import ResponsiveDatePickers from "./ResponsiveDatePickers";

const NoticePeriod = (props) => {
  return (
    <div>
      <label className="static_input_label">
        Are you currently on notice period?*
      </label>
      <div className="radio_group">
        <label className="radio_label">
          <Field
            className="radio"
            type="radio"
            name="onNoticePeriod"
            value="Yes"
          />
          Yes
        </label>
        <label className="radio_label">
          <Field
            className="radio"
            type="radio"
            name="onNoticePeriod"
            value="No"
          />
          No
        </label>
        <div style={{ display: "flex", width: "100%" }}>
          <div className="input_container" style={{ flex: "1" }}>
            <ResponsiveDatePickers
              values={props.values}
              setdate={props.setdate}
            />
          </div>

          <div className="input_container" style={{ flex: "1" }}>
            <Field
              readOnly={props.values.onNoticePeriod == "Yes" ? false : true}
              style={{ width: "600px" }}
              variant="standard"
              name="durationOfNoticePeriod"
              component={Select}
              label="How long is your notice period?* (Mention in months)"
            >
              <MenuItem value="1">1 months</MenuItem>
              <MenuItem value="2">2 months</MenuItem>
              <MenuItem value="3">3 months</MenuItem>
              <MenuItem value="4">4 months</MenuItem>
              <MenuItem value="5">5 months</MenuItem>
              <MenuItem value="6">6 months</MenuItem>
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticePeriod;
