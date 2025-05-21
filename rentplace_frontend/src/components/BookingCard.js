import React from "react";
import { observer } from "mobx-react-lite";
import { MapPin } from "lucide-react";
import "./BookingCard.css";
import {declension} from "../store/declension";
import propertyImage from "../assets/property1.png";

const BookingCard = ({ property }) => {

  const getImageUrl = (images = []) => {
    const previewImg = images.find((img) => img.previewImage === true);
    const chosenImg = previewImg || images[0];
    return chosenImg ? chosenImg.url : propertyImage;
  };

  return (
    <div className={`property-card favorite`}>
      <div className="property-image-container">
        <img
          src={getImageUrl(property.imagesDTOs)}
          alt={property.title}
          className="property-image"
        />
      </div>
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-description">
          {property.area} м²
          · {property.maxGuests} {declension(property.maxGuests, ['гость', 'гостя', 'гостей'])} {""}
          · {property.bedrooms} {declension(property.bedrooms, ['спальня', 'спальни', 'спален'])} {""}
          · {property.sleepingPlaces} {declension(property.sleepingPlaces, ['кровать', 'кровати', 'кроватей'])}
        </p>
        <div className="property_address_price_reservation">
          <div className="property-address">
            <MapPin className="map_icon" />
            <span>{property.address}</span>
          </div>
          <div className="property-price">
            <span>
              <span>{property.cost} </span>
              <span>₽</span>
              <span> за сутки</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(BookingCard);