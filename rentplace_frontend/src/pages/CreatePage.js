import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; // Импортируем хук для навигации
import RecentFirst from "../components/RecentFirst";
import Categories from "../components/Categories";
import "./CreatePage.css";
import BigBlueButton from "../components/BigBlueButton";
import BottomNavigation from "../components/BottomNavigation";

const CreatePage = () => {
  const navigate = useNavigate(); // Инициализируем хук

  // Функция для обработки клика по кнопке
  const handleButtonClick = () => {
    navigate("/create-ad"); // Переход на путь /create-ad
  };

  return (
    <>
      <div className="booking">
        <Header></Header>
        <RecentFirst></RecentFirst>
        <Categories></Categories>
        <div className="cards_container">
          <p>У вас нет активных объявлений о сдаче жилья</p>
        </div>
        {/* Передаем функцию в кнопку */}
        <BigBlueButton props="Разместить объявление" fix="fixed" onClick={handleButtonClick} />
      </div>
      <BottomNavigation />
    </>
  );
};

export default CreatePage;