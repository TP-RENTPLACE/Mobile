// components/PropertyDetails.js
import React from 'react';
import './PropertyDetails.css';

const PropertyDetails = ({ property }) => {
  if (!property) {
    return <div>Детали недоступны</div>;
  }

  return (
    <div className="propertyDetails">
      <span>{property.area} м²</span>
      <span>{property.rooms} комнат</span>
      <span>{property.maxGuests} гостей</span>
      <span>{property.bedrooms} спален</span>
      <span>{property.sleepingPlaces} кроватей</span>
    </div>
  );
};

export default PropertyDetails;