import React from "react";

function Prerequisites(props) {
  const display = props.data.map((data) => {
    return (
      <div className="general-instruction-tab ">
        <label>{data.information_heading}</label>
        <ul>
          <li>{data.information}</li>
        </ul>
      </div>
    );
  });
  return <div className="details_tab">{display}</div>;
}

export default Prerequisites;
