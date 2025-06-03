import React from 'react';
import './PropertyDetails.css';
import {declension} from "../store/declension";

const PropertyDetails = ({ property }) => {
    if (!property) {
        return <div>Детали недоступны</div>;
    }

    return (
        <div className="propertyDetails">
            <span>{property.area} м²</span>
            <span>{property.rooms} {declension(property.rooms, ['комната', 'комнаты', 'комнат'])}</span>
            <span>{property.maxGuests} {declension(property.maxGuests, ['гость', 'гостя', 'гостей'])}</span>
            <span>{property.bedrooms} {declension(property.bedrooms, ['спальня', 'спальни', 'спален'])}</span>
            <span>{property.sleepingPlaces} {declension(property.sleepingPlaces, ['кровать', 'кровати', 'кроватей'])}</span>
        </div>
    );
};

export default PropertyDetails;