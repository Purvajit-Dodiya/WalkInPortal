import React from "react";
import upload from "/src/icons/Upload_black_24dp.svg";

const ApplicationForm = (props) => {
  function timeSlotsRender() {
    // console.log("application from timeSlots", props.timeSlots);
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
          <label htmlFor={slot.id}>
            {slot.start_time} to {slot.end_time}
          </label>
        </div>
      );
    });
  }

  function prefferedRoleRender() {
    const checkbox = props.roles.map((jobrole) => {
      let name = "";
      if (jobrole.role.role_id == "2") {
        name = "prefferedIstructionalDesigner";
      } else if (jobrole.role.role_id == "1") {
        name = "prefferedSoftwareEngineer";
      } else {
        name = "prefferedSoftwareQualityEngineer";
      }
      return (
        <div className="checkbox_container">
          <input
            type="checkbox"
            id={name}
            className="checkbox"
            name={name}
            onChange={props.handleChange}
            checked={props.applicationData[name]}
          />
          <label className="checkbox_label" htmlFor={name}>
            {jobrole.role.role_name}
          </label>
        </div>
      );
    });
    return checkbox;
  }

  return (
    <div className="application_form">
      <h3>Time Slots & Preferences</h3>
      <div className="vertical_tab">
        <label className="static_input_label">Select a Time Slot :</label>
        {timeSlotsRender()}
      </div>
      <hr />

      <div className="pad">
        <label className="static_input_label">Select Your Preference :</label>
        {prefferedRoleRender()}
      </div>

      <hr className="second-hr" />
      <div className="upload-box">
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
