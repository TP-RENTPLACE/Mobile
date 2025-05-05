import React from "react";
import "./Description.css"

const Description = ({ property }) => {
    console.log(property);
  return (
    <div className="description">
      <h1>Описание</h1>
      <span>{property.description}</span>
      <div className="showMore">Показать полностью</div>
    </div>
  );
};

export default Description;