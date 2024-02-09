import React, { Component } from "react";
import Input from "../Input";
function PersonalInfoForm(props) {
  return (
    <section className="form personal_info">
      <div className="half">
        <Input
          type="text"
          name="lastname"
          handleChange={props.handleChange}
          value={props.userDetails.lastname}
          label="Last Name*"
        />
        <Input
          type="text"
          name="email"
          handleChange={props.handleChange}
          value={props.userDetails.email}
          label="Email ID*"
        />
        <Input
          type="number"
          name="phoneNumber"
          handleChange={props.handleChange}
          value={props.userDetails.phoneNumber}
          label="Phone Number*"
        />
        <div className="pad">
          <label htmlFor="resume" className="upload_label">
            <img src="src/icons/Upload_black_24dp.svg" alt="up" />
            UPLOAD RESUME
          </label>
          <input
            type="file"
            name="resume"
            id="resume"
            onChange={props.handleChange}
            file={props.userDetails.resume}
            className={`file_upload ${
              props.userDetails.resume == null ? "display_none" : ""
            }`}
          />
        </div>

        <Input
          type="text"
          name="portfolioUrl"
          handleChange={props.handleChange}
          value={props.userDetails.portfolioUrl}
          label="Enter Portfolio URL (if any)"
        />
        <div className="pad">
          <label className="static_input_label">Preferred Job Roles*</label>
          <div className="checkbox_container">
            <input
              type="checkbox"
              id="prefferedIstructionalDesigner"
              className="checkbox"
              name="prefferedIstructionalDesigner"
              onChange={props.handleChange}
              checked={props.userDetails.prefferedIstructionalDesigner}
            />
            <label
              class="checkbox_label"
              htmlFor="prefferedIstructionalDesigner"
            >
              Istructional Designer
            </label>
          </div>
          <div className="checkbox_container">
            <input
              type="checkbox"
              id="prefferedSoftwareEngineer"
              className="checkbox"
              name="prefferedSoftwareEngineer"
              onChange={props.handleChange}
              checked={props.userDetails.prefferedSoftwareEngineer}
            />
            <label class="checkbox_label" htmlFor="prefferedSoftwareEngineer">
              Software Engineer
            </label>
          </div>
          <div className="checkbox_container">
            <input
              type="checkbox"
              id="prefferedSoftwareQualityEngineer"
              className="checkbox"
              name="prefferedSoftwareQualityEngineer"
              onChange={props.handleChange}
              checked={props.userDetails.prefferedSoftwareQualityEngineer}
            />
            <label
              class="checkbox_label"
              htmlFor="prefferedSoftwareQualityEngineer"
            >
              Software Quality Engineer
            </label>
          </div>
        </div>

        <Input
          type="text"
          name="referredby"
          handleChange={props.handleChange}
          value={props.userDetails.referredby}
          label="If You Are Registering Via A Referral, Please Mention Full Name Of
          The Employee Who Referred You"
        />
        <div className="checkbox_container">
          <input
            type="checkbox"
            id="recieveJobUpdates"
            className="checkbox"
            name="recieveJobUpdates"
            onChange={props.handleChange}
            checked={props.userDetails.recieveJobUpdates}
          />
          <label class="checkbox_label" htmlFor="recieveJobUpdates">
            Send me job related updates via mail
          </label>
        </div>
      </div>
      <div className="half right_top">
        <div className="pad profile">
          <img
            className="profile_photo_display"
            src={
              props.userDetails.profilePhoto === null
                ? "src/icons/customer_man_user_account_profile_icon.svg"
                : URL.createObjectURL(props.userDetails.profilePhoto)
            }
            alt="up"
          />

          <label htmlFor="profilePhoto" className="upload_label">
            UPLOAD DISPLAY PICTURE
          </label>
          <label htmlFor="profilePhoto" className="static_input_label">
            Max. image size: 5 MB
          </label>
          <input
            type="file"
            name="profilePhoto"
            id="profilePhoto"
            onChange={props.handleChange}
            file={props.userDetails.profilePhoto}
            accept="image/png,image/jpg"
            className="file_upload display_none"
          />
        </div>
      </div>
    </section>
  );
}

export default PersonalInfoForm;
