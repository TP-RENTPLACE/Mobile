import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Heart } from "lucide-react";
import { MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PropertyCard.css";
import propertyImage from "../assets/placeholder-image.webp";
import FavoritesService from "../api/favoritesService";
import { toast } from "react-hot-toast";

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const hideFavButtonPaths = ["/create"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      const isValidToken = Boolean(
        token && token !== "null" && token !== "undefined"
      );
      setIsLoggedIn(isValidToken);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!isLoggedIn) return;

      try {
        const favorites = await FavoritesService.getAll();
        const isPropFavorite = favorites.some(
          (fav) => fav.propertyId === property.propertyId
        );
        setIsFavorite(isPropFavorite);
      } catch (err) {
        toast.error("Авторизуйтесь чтобы получить доступ", err);
      }
    };
    checkFavorite();
  }, [property.propertyId, isLoggedIn, location.pathname]);

  const handleClick = () => {
    navigate(`/announcement/${property.propertyId}`, { state: { property } });
  };

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.error(
        "Войдите или зарегистрируйтесь чтобы добавить объявление в избранное"
      );
      return;
    }
    const originalState = isFavorite;
    try {
      setIsFavorite(!originalState);

      if (originalState) {
        await FavoritesService.removeFromFavorites(property.propertyId);
      } else {
        await FavoritesService.addToFavorites(property.propertyId);
      }

      setIsFavorite(!originalState);
    } catch (error) {
      setIsFavorite(originalState);
      toast.error(`Ошибка: ${error.message}`);
    }
  };

  const getImageUrl = (images = []) => {
    const previewImg = images.find((img) => img.previewImage === true);
    const chosenImg = previewImg || images[0];
    return chosenImg ? chosenImg.url : null;
  };
  
  const imageUrl = getImageUrl(property.imagesDTOs);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setImageLoaded(true);
    };

    img.onerror = () => {};
  }, [imageUrl]);

  return (
    <div
      className={`property-card ${
        location.pathname === "/favorites" ? "favorite" : ""
      }`}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="property-image-container">
        <img
          src={propertyImage}
          alt="placeholder"
          className="property-image placeholder"
          style={{ display: imageLoaded ? "none" : "block" }}
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt={property.title}
            className="property-image-big"
            loading="lazy"
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        )}
        {!hideFavButtonPaths.includes(location.pathname) && (
          <button
            className={`favorite-button ${isFavorite ? "active" : ""}`}
            onClick={handleToggleFavorite}
          >
            <Heart className="favorite-button_icon" />
          </button>
        )}
      </div>
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-description">
          {property.area} м² · {property.maxGuests} гостей · {property.bedrooms}{" "}
          спальни · {property.sleepingPlaces} кровати
        </p>
        <div
          className={`${
            location.pathname === "/favorites"
              ? "property_address_price_reservation"
              : "property_adress_price"
          }`}
        >
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
