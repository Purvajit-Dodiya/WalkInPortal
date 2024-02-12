import React from "react";
import upload from "/src/icons/Upload_black_24dp.svg";

const ApplicationForm = (props) => {
  function timeSlotsRender() {
    return props.timeSlots.map((slot) => {
      console.log("called", props.applicationData.timeSlot == slot.id);
      return (
        <div>
          <input
            type="radio"
            name="timeSlot"
            id={slot.id}
            value={slot.id}
            onChange={props.handleChange}
            checked={props.applicationData.timeSlot == slot.id}
          />
          <label htmlFor={slot.id}>{slot.slotTime}</label>
        </div>
      );
    });
  }

  return (
    <div class="application_form">
      <h3>Time Slots & Preferences</h3>
      <div class="vertical_tab">
        <label className="static_input_label">Select a Time Slot :</label>
        {timeSlotsRender()}
      </div>
      <hr />
      <div className="pad">
        <label className="static_input_label">Select Your Preference :</label>
        {props.roles.instructionalDesigner && (
          <div className="checkbox_container">
            <input
              type="checkbox"
              id="prefferedIstructionalDesigner"
              className="checkbox"
              name="prefferedIstructionalDesigner"
              onChange={props.handleChange}
              checked={props.applicationData.prefferedIstructionalDesigner}
            />
            <label
              class="checkbox_label"
              htmlFor="prefferedIstructionalDesigner"
            >
              Istructional Designer
            </label>
          </div>
        )}
        {props.roles.softwareEngineer && (
          <div className="checkbox_container">
            <input
              type="checkbox"
              id="prefferedSoftwareEngineer"
              className="checkbox"
              name="prefferedSoftwareEngineer"
              onChange={props.handleChange}
              checked={props.applicationData.prefferedSoftwareEngineer}
            />
            <label class="checkbox_label" htmlFor="prefferedSoftwareEngineer">
              Software Engineer
            </label>
          </div>
        )}
        {props.roles.softwareQualityEngineer && (
          <div className="checkbox_container">
            <input
              type="checkbox"
              id="prefferedSoftwareQualityEngineer"
              className="checkbox"
              name="prefferedSoftwareQualityEngineer"
              onChange={props.handleChange}
              checked={props.applicationData.prefferedSoftwareQualityEngineer}
            />
            <label
              class="checkbox_label"
              htmlFor="prefferedSoftwareQualityEngineer"
            >
              Software Quality Engineer
            </label>
          </div>
        )}
      </div>
      <hr class="second-hr" />
      <div class="upload-box">
        <div className="pad">
          <label htmlFor="resume" className="upload_label">
            <img src={upload} alt="up" />
            UPLOAD RESUME
          </label>
          <input
            type="file"
            name="resume"
            id="resume"
            onChange={props.handleChange}
            file={props.applicationData.resume}
            className="file_upload"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
