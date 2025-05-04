import React from "react";
import "./Description.css"

const Description = ({ description }) => {
  return (
    <div className="description">
      <h1>Описание</h1>
      <span>{description}</span>
      <div className="showMore">Показать полностью</div>
    </div>
  );
};

export default Description;
