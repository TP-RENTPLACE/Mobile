import React from "react";
import "./HeadWithText.css";
import { ArrowLeft } from "lucide-react";

const HeadWithText = ({props}) => {
  return (
    <div>
      <div className="head-with-text">
        <ArrowLeft className="icon" />
        <span>{props}</span>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default HeadWithText;
