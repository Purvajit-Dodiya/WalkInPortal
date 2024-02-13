import React, { Component } from "react";

function Technologies(props) {
  return (
    <div className="pad full">
      <label className="static_input_label">{props.title}</label>
      <div className="checkbox_container">
        <input
          type="checkbox"
          id={props.js_n}
          className="checkbox"
          name={props.js_n}
          onChange={props.handleChange}
          checked={props.js}
        />
        <label className="checkbox_label" htmlFor={props.js_n}>
          Javascript
        </label>
      </div>
      <div className="checkbox_container">
        <input
          type="checkbox"
          id={props.ajs_n}
          className="checkbox"
          name={props.ajs_n}
          onChange={props.handleChange}
          checked={props.ajs}
        />
        <label className="checkbox_label" htmlFor={props.ajs_n}>
          Angular JS
        </label>
      </div>
      <div className="checkbox_container">
        <input
          type="checkbox"
          id={props.react_n}
          className="checkbox"
          name={props.react_n}
          onChange={props.handleChange}
          checked={props.react}
        />
        <label className="checkbox_label" htmlFor={props.react_n}>
          React
        </label>
      </div>
      <div className="checkbox_container">
        <input
          type="checkbox"
          id={props.nodejs_n}
          className="checkbox"
          name={props.nodejs_n}
          onChange={props.handleChange}
          checked={props.nodejs}
        />
        <label className="checkbox_label" htmlFor={props.nodejs_n}>
          Node JS
        </label>
      </div>
      <div className="checkbox_container">
        <input
          type="checkbox"
          id={props.other_n}
          className="checkbox"
          name={props.other_n}
          onChange={props.handleChange}
          checked={props.other}
        />
        <label className="checkbox_label" htmlFor={props.other_n}>
          Others
        </label>
      </div>
      <div className="input">
        <input
          type="text"
          name={props.othertxt_n}
          onChange={props.handleChange}
          value={props.othertxt}
          className="input_field"
          required
        />
        <label className="static_input_label">If others, please mention</label>
      </div>
    </div>
  );
}

export default Technologies;
