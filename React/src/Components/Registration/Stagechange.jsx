import React, { Component } from "react";

function Stagechange(props) {
  return (
    <div className="center">
      {props.prevPage && (
        <button className="button" type="button" onClick={props.prevPage}>
          PREVOUS
        </button>
      )}
      {props.nextPage && <button className="button">NEXT</button>}
    </div>
  );
}

export default Stagechange;
