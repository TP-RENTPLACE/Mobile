import React from "react";
import { observer } from "mobx-react-lite";
import favoritesStore from "../store/favoritesStore";
import { Heart } from "lucide-react";
import { MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";
import "./BookingCard.css";

const BookingCard = ({ property }) => {
  const isFavorite = favoritesStore.isFavorite(property.id);
  const location = useLocation();
  const handleToggleFavorite = () => {
    if (isFavorite) {
      favoritesStore.removeFromFavorites(property.id);
    } else {
      favoritesStore.addToFavorites(property);
    }
  };

  const getImageUrl = (images = []) => {
    const previewImg = images.find((img) => img.previewImage === false && img.imageId === 2);
    const chosenImg = previewImg || images[0];
    if (!chosenImg) {
      return "/assets/image.png";
    }
    if (chosenImg.url) {
      return chosenImg.url;
    }
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
          {property.from}-{property.to} {property.months}
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