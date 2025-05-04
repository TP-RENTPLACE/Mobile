import React from "react";
import { useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import "./CreateStep1.css"
import allcategories from "../store/createdata"
import BigBlueButton from "../components/BigBlueButton";

const CreateStep1 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/create-ad/step2"); // Абсолютный путь
  };

  return (
    <div className="create-ad-container">
      <HeadWithText props="Новое объявление"/>
      <p>Выберите наиболее подходящую категорию для вашего жилья</p>
      <div className="list">
        {allcategories.map(([Icon, label], index) => (
          <div key={index} className="item">
            <Icon size={20} color="black" />
            {label}
          </div>
        ))}
      </div>

      <BigBlueButton props="Далее" fix={"fixed"} onClick={handleNext}/>
    </div>
  );
};

export default CreateStep1;