import React from "react";

function Prerequisites(props) {
  const display = props.data.map((data) => {
    return (
      <div className="general-instruction-tab ">
        <label>{data.title}</label>
        <ul>
          <li>{data.description}</li>
        </ul>
      </div>
    );
  });
  return <div className="listing details_tab">{display}</div>;
}

export default Prerequisites;
