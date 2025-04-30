// pages/EmailInputPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import "./EmailInputPage.css"
import BigBlueButton from "../components/BigBlueButton";

const EmailInputPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Переход к следующему шагу (подтверждение кода)
    navigate("/auth/code");
  };

  return (
    <>
      {" "}
      <div className="auth-page">
        <HeadWithText props="Вход/Регистрация" />
        <div className="auth-page_body">
          <h1>Введите почту. На нее будет отправлено письмо с кодом.</h1>
          <input type="email" placeholder="Введите вашу почту" />
          <BigBlueButton onClick={handleNext} props="Далее"/>
          
        </div>
      </div>
    </>
  );
};

export default EmailInputPage;
