// components/PropertyDetails.js
import React from 'react';
import './PropertyDetails.css';

const PropertyDetails = ({ details }) => {
  if (!details) {
    return <div>Детали недоступны</div>;
  }

  return (
    <div className="propertyDetails">
      <span>{details.area}</span>
      <span>{details.rooms}</span>
      <span>{details.guests}</span>
      <span>{details.bedrooms}</span>
      <span>{details.beds}</span>
    </div>
  );
};

export default PropertyDetails;