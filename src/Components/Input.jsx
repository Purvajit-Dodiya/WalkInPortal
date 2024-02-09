import React, { Component } from "react";

function Input(props) {
  return (
    <div
      className={`input ${
        props.className != undefined ? "" + props.className : ""
      }`}
    >
      <input
        type={props.type}
        name={props.name}
        onChange={props.handleChange}
        value={props.value}
        id={props.name}
        className="input_field"
        required={props.required}
        min={props.min != undefined ? props.min : ""}
      />
      <label className="static_input_label">{props.label}</label>
    </div>
  );
}

export default Input;
