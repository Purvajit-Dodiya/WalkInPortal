import React from "react";
import { Link } from "react-router-dom";
import location_icon from "/src/icons/location_on_black_24dp.svg";
import instructionalIcon from "/src/icons/Instructional Designer.svg";
import softwareQualityIcon from "/src/icons/Software Quality Engineer.svg";
import upload from "/src/icons/Upload_black_24dp.svg";

const ListingDisplay = (props) => {
  const timestamp = props.data.StartDate;
  const date = new Date(timestamp);
  console.log(date);
  console.log(props.apply);
  const rolesDisplay = props.data.roles.map((x) => {
    console.log(x.role.role_name);
    return (
      <div className="job_role">
        <div className="img_container">
          <img src={instructionalIcon} alt="" />
        </div>
        <h5>{x.role.role_name}</h5>
      </div>
    );
  });

  // const instructionalDesigner =
  //   props.data.offeredRoles
  //     .split(", ")
  //     .filter((word) => word.trim() === "Instructional Designer").length > 0;
  // const softwareEngineer =
  //   props.data.offeredRoles
  //     .split(", ")
  //     .filter((word) => word.trim() === "Software Engineer").length > 0;
  // const softwareQualityEngineer =
  //   props.data.offeredRoles
  //     .split(", ")
  //     .filter((word) => word.trim() === "Software Quality Engineer").length > 0;
  // const instructionalDesigner = false;
  // console.log(formattedDate);
  return (
    <section className="listing">
      <div className="tab apply_tab">
        <h1>{props.data.listing_name}</h1>
        {props.apply && (
          <button onClick={props.handleForm} className="apply button">
            APPLY
          </button>
        )}
      </div>
      <div className="tab">
        <div className="date_time">
          <label>Date & Time :</label>
          <p>
            {props.data.StartDate} to {props.data.EndDate}
          </p>
        </div>
        <div className="location">
          <img src={location_icon} alt="location" />
          <p>{props.data.City}</p>
        </div>
      </div>
      <hr />
      <label>Job Roles :</label>
      {/* <div className="tab">
        {instructionalDesigner && (
          <div className="job_role">
            <div className="img_container">
              <img src={instructionalIcon} alt="" />
            </div>
            <h5>Instructional Designer</h5>
          </div>
        )}
        {softwareEngineer && (
          <div className="job_role">
            <div className="img_container">
              <img src={softwareQualityIcon} alt="" />
            </div>
            <h5>Software Engineer</h5>
          </div>
        )}
        {softwareQualityEngineer && (
          <div className="job_role">
            <div className="img_container">
              <img src={softwareQualityIcon} alt="" />
            </div>
            <h5>Software Quality Engineer</h5>
          </div>
        )}
      </div> */}
      <div className="tab">{rolesDisplay}</div>

      {props.apply === false && (
        <div className="button_tab">
          <Link to={`/listing/${props.data.listing_id}`}>
            <button className="button">VIEW MORE DETAILS</button>
          </Link>
          {/* <button className="button">VIEW MORE DETAILS</button> */}
        </div>
      )}
    </section>
  );
};

export default ListingDisplay;
