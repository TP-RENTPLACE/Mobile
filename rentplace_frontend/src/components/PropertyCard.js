
import React, {useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import { Heart } from "lucide-react";
import { MapPin } from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import "./PropertyCard.css";
import propertyImage from "../assets/property1.png"
import FavoritesService from "../api/favoritesService";
import {toast} from "react-hot-toast";

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const hideFavButtonPaths = ['/create'];

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favorites = await FavoritesService.getAll();
        setIsFavorite(favorites.some(fav => fav.propertyId === property.propertyId));
      } catch (err) {
        console.error("Ошибка при проверке избранного", err);
      }
    };
    checkFavorite();
  }, [property.propertyId]);

  const handleClick = () => {
    navigate(`/announcement/${property.propertyId}`, {state: { property } });
  }

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    try {
      if (isFavorite) {
        await FavoritesService.removeFromFavorites(property.propertyId);
      } else {
        await FavoritesService.addToFavorites(property.propertyId);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      toast.error("Ошибка при добавлении/удалении из избранного", err);
    }
  };

  const getImageUrl = (images = []) => {
    const previewImg = images.find((img) => img.previewImage === true);
    const chosenImg = previewImg || images[0];
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
          src={getImageUrl(property.imagesDTOs) || propertyImage}
          alt={propertyImage}
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
        <div className={`${location.pathname === "/favorites" ? "property_address_price_reservation" : "property_adress_price"}`}>
          <div className="property-address">
            <MapPin className="map_icon" />
            <span className="address-text">{property.address}</span>
          </div>
          <div className="property-price">
            <span>
              <span>{property.cost} </span>
              <span>₽</span>
              <span> {property.longTermRent ? "в месяц" : "за сутки"}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(PropertyCard);
