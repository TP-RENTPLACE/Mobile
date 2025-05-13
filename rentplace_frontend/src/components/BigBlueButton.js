import React from "react";
import "./BigBlueButton.css";

function BigBlueButton({ onClick, props, fix,inverted,fullwidth,botom }) {
  return (
    <div className={`button-container`}>
      <button className={`big-blue-button ${fix} ${inverted} ${fullwidth} ${botom}`} onClick={onClick} >
        <span>{props}</span>
      </button>
    </div>
  );
}

export default BigBlueButton;
