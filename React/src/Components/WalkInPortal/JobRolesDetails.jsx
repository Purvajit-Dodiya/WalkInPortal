import React from "react";

const JobRolesDetails = (props) => {
  // console.log("in job roles", props);
  const jobRoleDetails = props.roles.map((jobrole) => {
    // console.log("each role", jobrole);
    // console.log("each role role", jobrole.role);
    return (
      <details className="pad-top" key={jobrole.role.id}>
        <summary className="details_header">
          <h3>{jobrole.role.role_name}</h3>
          <img src="/src/icons/expand_less_black_24dp.svg" alt="" />
        </summary>
        <div className="listing">
          <div className="general-instruction-tab ">
            <label>Compensation</label>
            <ul>
              <li>Rs. {jobrole.role.gross_compensation} lpa</li>
            </ul>
          </div>
          <div className="general-instruction-tab ">
            <label>Description</label>
            <ul>
              <li>{jobrole.role.role_description}</li>
            </ul>
          </div>
          <div className="general-instruction-tab ">
            <label>Requirements</label>
            <ul>
              <li>{jobrole.role.role_requirements}</li>
            </ul>
          </div>
        </div>
      </details>
    );
  });
  // console.log(jobRoleDetails);
  return <div>{jobRoleDetails}</div>;
};

export default JobRolesDetails;
