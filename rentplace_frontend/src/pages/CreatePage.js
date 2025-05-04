import React, {useState} from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; // Импортируем хук для навигации
import RecentFirst from "../components/RecentFirst";
import Categories from "../components/Categories";
import "./CreatePage.css";
import BigBlueButton from "../components/BigBlueButton";
import BottomNavigation from "../components/BottomNavigation";
import MyPropertyList from "../components/MyPropertyList";

const CreatePage = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("PUBLISHED");

  // Функция для обработки клика по кнопке
  const handleButtonClick = () => {
    navigate("/create-ad"); // Переход на путь /create-ad
  };

  return (
    <>
      <div className="booking">
        <Header></Header>
        <RecentFirst></RecentFirst>
        <Categories onCategoryChange={setFilterStatus} />
        <MyPropertyList filterStatus={filterStatus} />
        {/* Передаем функцию в кнопку */}
        <BigBlueButton props="Разместить объявление" fix="fixed" onClick={handleButtonClick} />
      </div>
      <BottomNavigation />
    </>
  );
};

export default CreatePage;