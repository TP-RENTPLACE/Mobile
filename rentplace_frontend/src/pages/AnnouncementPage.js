import React from "react";
import ImageSlider from "../components/ImageSlider";
import PropertyDetails from "../components/PropertyDetails";
import Description from "../components/Description";
import defaultImage from "../../src/assets/Avatar.png";
import "./AnnouncementPage.css";
import Facilities from "../components/Facilities";
import HeadWithText from "../components/HeadWithText";
import BigBlueButton from "../components/BigBlueButton";
import BottomNavigation from "../components/BottomNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { sendMetrik } from "../utils/metrics";

const AnnouncementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { property } = location.state || {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  if (!property) {
    return <div>Объявление не найдено</div>;
  }

  const handleBookClick = () => {
    navigate("/booking-form", { state: { property } });
  };

  const ownerImageUrl = property?.ownerDTO?.imageDTO?.url || defaultImage;

  return (
    <div className="announcement-page">
      <HeadWithText props="Объявление" />
      <ImageSlider images={property.imagesDTOs || []} />
      <h1>{property.title}</h1>

      <PropertyDetails property={property} />

      <Description property={property} />

      <div className="location">
        <h1>Расположение</h1>
        <div className="cont">
          <MapPin className="address-icon" />
          <span className="address">{property.address}</span>
        </div>
      </div>

      <Facilities facilities={property.facilitiesDTOs || []} />

      <div className="owner">
        <h1>Хозяин</h1>
        <div className="owner_data">
          <img src={ownerImageUrl} alt="Owner" />
          <div className="owner_name_email">
            <div className="owner_name">
              {property?.ownerDTO?.name || "Имя не указано"}{" "}
              {property?.ownerDTO?.surname || ""}
            </div>
            <div className="owner_email">
              {property?.ownerDTO?.email || "Email не указан"}
            </div>
          </div>
        </div>
        <div className="from-date">Участник rentplace с 2025 года</div>
      </div>

      {isLoggedIn ? (
        <BigBlueButton
          props="Выбрать даты"
          fix="fixed"
          onClick={handleBookClick}
        />
      ) : (
        <BigBlueButton
          props="Войти / Зарегистрироваться"
          fix="fixed"
          onClick={() => {
            sendMetrik('reachGoal','click_login_register_button');
            navigate("/auth/email", {
              state: { returnTo: location.pathname, property },
            });
          }}
        />
      )}
    </div>
  );
};

export default AnnouncementPage;
