import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import BigBlueButton from "../components/BigBlueButton";

const CreateStep5 = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/"); // Вернуться на главную страницу
  };

  return (
    <div className="create-ad-container">
      <HeadWithText props="Новое объявление" />
      <div className="center">
        <p>
          Ваше объявление отправлено на рассмотрение. В течение 7 рабочих дней
          мы уведомим вас о его статусе.
        </p>
        <p>Спасибо, что выбрали rentplace!</p>
      </div>

      <BigBlueButton props="Готово" fix="fixed" onClick={handleDone}/>
    </div>
  );
};

export default CreateStep5;
