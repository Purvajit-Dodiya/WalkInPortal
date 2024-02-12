import React from "react";

const JobRolesDetails = (props) => {
  console.log("in job roles", props);
  const jobRoleDetails = props.roles.map((role) => {
    return (
      <details className="pad" key={role.id}>
        <summary className="details_header">
          <h3>{role.role_name}</h3>
          <img src="/src/icons/expand_less_black_24dp.svg" alt="" />
        </summary>
        <div className="listing">
          <div className="general-instruction-tab ">
            <label>Compensation</label>
            <ul>
              <li>Rs. {role.gross_compensation} lpa</li>
            </ul>
          </div>
          <div className="general-instruction-tab ">
            <label>Description</label>
            <ul>
              <li>{role.role_description}</li>
            </ul>
          </div>
          <div className="general-instruction-tab ">
            <label>Requirements</label>
            <ul>
              <li>{role.role_requirements}</li>
            </ul>
          </div>
        </div>
      </details>
    );
  });
  console.log(jobRoleDetails);
  return <div>{jobRoleDetails}</div>;
};

export default JobRolesDetails;
