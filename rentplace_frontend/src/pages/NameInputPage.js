// pages/NameInputPage.js
import React from "react";
import HeadWithText from "../components/HeadWithText";
import BigBlueButton from "../components/BigBlueButton";
import "./NameInputPage.css";

const NameInputPage = () => {
  const handleComplete = () => {
    // Здесь можно добавить логику завершения регистрации
    alert("Регистрация завершена!");
  };

  return (
    <>
      {" "}
      <div className="auth-page">
        <HeadWithText props="Вход/Регистрация" />
        <div className="auth-page_body">
          <h1>Укажите имя и фамилию</h1>
          <span>Имя</span>
          <input type="email" placeholder="Имя" />
          <span>Фамилия</span>
          <input type="email" placeholder="Фамилия" />
          <BigBlueButton onClick={handleComplete} props="Далее"/>
          
        </div>
      </div>
    </>
  );
};

export default NameInputPage;
