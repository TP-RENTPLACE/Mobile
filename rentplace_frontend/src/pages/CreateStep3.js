import React from "react";
import { useNavigate } from "react-router-dom";
import BigBlueButton from "../components/BigBlueButton";
import HeadWithText from "../components/HeadWithText";
import CreateAdGallery from "../components/CreateAdGallery";

const CreateStep3 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/create-ad/step4"); // Абсолютный путь
  };

  return (
    <div className="create-ad-container">
      <HeadWithText props="Новое объявление"/>
      <p>Добавьте фотографии жилья</p>
      {/* <div>
        <img src="placeholder-image.jpg" alt="Фото 1" />
        <img src="placeholder-image.jpg" alt="Фото 2" />
      </div>
      <button>Добавить фото</button> */}
      <CreateAdGallery/>
      <BigBlueButton props="Далее" fix="fixed" onClick={handleNext}/>
    </div>
  );
};

export default CreateStep3;