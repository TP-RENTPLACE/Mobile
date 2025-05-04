// components/Conveniences.js
import React from "react";
import "./Conveniences.css";

const Conveniences = ({conveniences}) => {
  return (
    <div className="conveniences">
      <h2>Основные удобства</h2>
      <div className="list">
        {conveniences.map(([Icon, label], index) => (
          <div key={index} className="item">
            <Icon size={20} color="black" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conveniences;