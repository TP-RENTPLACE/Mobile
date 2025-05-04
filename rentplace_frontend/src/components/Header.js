import React from "react";
import { useLocation } from "react-router-dom"; // Импортируем хук для определения текущего маршрута
import "./Header.css";

const Header = () => {
  const location = useLocation(); // Получаем текущий маршрут

  // Определяем текст в зависимости от маршрута
  const getHeaderText = () => {
    switch (location.pathname) {
      case "/":
        return "rentplace"; // Текст для главной страницы
      case "/favorites":
        return "Избранное"; // Текст для страницы избранного
      case "/bookings":
        return "Мои брони"; // Текст для страницы бронирований
      case "/create":
        return "Сдать жилье"; // Текст для страницы создания объявления
      case "/profile":
        return "Профиль"; // Текст для страницы профиля
      default:
        return "Rentplace"; // Дефолтный текст
    }
  };
  const getImage = () => {
    switch (location.pathname) {
      case "/profile":
        return ""; 
      default:
        return <img src="./images/profile.png" alt="Profile" />; 
    }
  };

  return (
    <div className="upper_header">
      <div className="logo">
        <img src="./images/logo.png" alt="Rentplace Logo" />
        <span className="header-text">{getHeaderText()}</span> {/* Добавляем текст */}
      </div>
      <div className="profile">
        {getImage()}
      </div>
    </div>
  );
};

export default Header;