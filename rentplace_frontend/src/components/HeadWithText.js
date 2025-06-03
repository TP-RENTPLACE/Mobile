import React from "react";
import "./HeadWithText.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HeadWithText = ({props}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="head-with-text">
        <ArrowLeft className="icon" onClick={() => navigate(-1)}/>
        <span>{props}</span>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default HeadWithText;
