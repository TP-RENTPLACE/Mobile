import React from "react";
import "./Facilities.css";

const Facilities = ({facilities}) => {
  return (
    <div className="conveniences">
      <h2>Основные удобства</h2>
      <div className="list">
        {facilities.map((facility) => (
          <div key={facility.facilityId} className="item">
            <img
                src={facility.imageDTO?.url}
                alt={facility.name}
            />
            {facility.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;