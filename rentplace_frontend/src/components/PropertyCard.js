import React from "react";
import { observer } from "mobx-react-lite";
import favoritesStore from "../store/favoritesStore";
import { Heart } from "lucide-react";
import { MapPin } from "lucide-react";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  const isFavorite = favoritesStore.isFavorite(property.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      favoritesStore.removeFromFavorites(property.id);
    } else {
      favoritesStore.addToFavorites(property);
    }
  };

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img
          src={property.image}
          alt={property.title}
          className="property-image"
        />
        <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          onClick={handleToggleFavorite}
        >
          <Heart className="favorite-button_icon" />
        </button>
      </div>
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-description">
          {property.area} м² · {property.guests} гостей · {property.bedrooms}{" "}
          спальни · {property.beds} кровати
        </p>
        <div className="property_adress_price">
          <div className="property-address">
            <MapPin className="map_icon" />
            <span>{property.address}</span>
          </div>
          <div className="property-price">
            <span>
              <span>{property.price} ₽</span>
              <span> за сутки</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(PropertyCard);