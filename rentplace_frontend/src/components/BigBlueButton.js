import React from "react";
import "./BigBlueButton.css";

function BigBlueButton({ onClick, props, fix,inverted, fullwidth, bottom,top }) {
  return (
    <div className={`button-container`}>
      <button style={{"bottom":top+"px",}} className={`big-blue-button ${fix} ${inverted} ${fullwidth} ${bottom}`} onClick={onClick} >
        <span className="big-blue-button-span">{props}</span>
      </button>
    </div>
  );
}

export default BigBlueButton;