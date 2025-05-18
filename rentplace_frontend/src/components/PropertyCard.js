import React from "react";
import { observer } from "mobx-react-lite";
import favoritesStore from "../store/favoritesStore";
import { Heart } from "lucide-react";
import { MapPin } from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  const isFavorite = favoritesStore.isFavorite(property.id);
  const location = useLocation();
  const navigate = useNavigate();
  const hideFavButtonPaths = ['/create'];

  const handleClick = () => {
    navigate(`/announcement/${property.propertyId}`, {state: { property } });
  }

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      favoritesStore.removeFromFavorites(property.id);
    } else {
      favoritesStore.addToFavorites(property);
    }
  };

  const getImageUrl = (images = []) => {
    const chosenImg = images[0];
    if (!chosenImg) {
      return "/assets/image.png";
    }
    if (chosenImg.url) {
      return chosenImg.url;
    }
  };

  return (
    <div
        className={`property-card ${location.pathname === "/favorites" ? "favorite" : ""}`}
        onClick={handleClick}
        style={{cursor: "pointer"}}
    >
      <div className="property-image-container">
        <img
          src={getImageUrl(property.imagesDTOs)}
          alt={property.title}
          className="property-image-big"
        />
        {!hideFavButtonPaths.includes(location.pathname) && <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          onClick={handleToggleFavorite}
        >
          <Heart className="favorite-button_icon" />
        </button>}
      </div>
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-description">
          {property.area} м² · {property.maxGuests} гостей · {property.bedrooms}{" "}
          спальни · {property.sleepingPlaces} кровати
        </p>
        <div className="property_adress_price">
          <div className="property-address">
            <MapPin className="map_icon" />
            <span className="address-text">{property.address}</span>
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

export default observer(PropertyCard);