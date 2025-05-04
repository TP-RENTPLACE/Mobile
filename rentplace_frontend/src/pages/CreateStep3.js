import React from "react";
import { useNavigate } from "react-router-dom";
import BigBlueButton from "../components/BigBlueButton";
import HeadWithText from "../components/HeadWithText";
import CreateAdGallery from "../components/CreateAdGallery";
import "./CreateStep3.css";
import { Camera } from 'lucide-react';

const CreateStep3 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/create-ad/step4"); // Абсолютный путь
  };

  return (
    <div className="create-ad-container">
      <HeadWithText props="Новое объявление" />
      <p>Добавьте фотографии жилья</p>
      <div className="images-container">
        <div className="img-item">
          <img src="../images/CreateAd1.png" alt="Фото 1" />
        </div>
        <div className="img-item">
          <img src="../images/CreateAd1.png" alt="Фото 1" />
        </div>

        
      </div>

      <button className="addphoto">
        <Camera className="camicon"/>
        <span>Добавить фото</span>
      </button>
      {/* <CreateAdGallery/> */}
      <BigBlueButton props="Далее" fix="fixed" onClick={handleNext} />
    </div>
  );
};

export default CreateStep3;
