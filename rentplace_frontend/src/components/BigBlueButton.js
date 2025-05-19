import React from "react";
import "./BigBlueButton.css";

function BigBlueButton({ onClick, props, fix,inverted, fullwidth, bottom }) {
  return (
    <div className={`button-container`}>
      <button className={`big-blue-button ${fix} ${inverted} ${fullwidth} ${bottom}`} onClick={onClick} >
        <span className="big-blue-button-span">{props}</span>
      </button>
    </div>
  );
}

export default BigBlueButton;