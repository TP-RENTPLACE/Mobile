import React from "react";
import "./BigBlueButton.css";

function BigBlueButton({ onClick, props, fix,inverted,isfullwidth }) {
  return (
    <div className={`button-container`}>
      <button className={`big-blue-button ${fix} ${inverted}`} onClick={onClick} >
        <span>{props}</span>
      </button>
    </div>
  );
}

export default BigBlueButton;
