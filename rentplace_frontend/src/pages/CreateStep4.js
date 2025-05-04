import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import "./CreateStep4.css";
import BigBlueButton from "../components/BigBlueButton";

const CreateStep4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousData = location.state || {};


  const [formData, setFormData] = useState({
    description: "",
    longTermRent: true, // true — в месяц, false — за сутки
    cost: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRentTypeChange = (isMonthly) => {
    setFormData((prev) => ({
      ...prev,
      longTermRent: isMonthly,
    }));
  };

  const handleNext = () => {
    console.log("Данные шага 4:", formData);
    const allData = {
      ...previousData,
      ...formData,
    };

    navigate("/create-ad/step5", { state: allData });
  };

  return (
      <div className="create-ad-container">
        <HeadWithText props="Новое объявление" />
        <p>Составьте описание и укажите цену</p>

        <label>
          <span>Описание</span>
          <textarea
              name="description"
              placeholder="Составьте или сгенерируйте описание для вашего жилья"
              value={formData.description}
              onChange={handleInputChange}
          />
        </label>

        <BigBlueButton
            props="Сгенерировать описание с помощью AI"
            inverted="inverted"
        />

        <label>
          <span>Арендная плата, ₽</span>
          <div className="rent-price">
            <button
                className={!formData.longTermRent ? "active" : ""}
                onClick={() => handleRentTypeChange(false)}
            >
              За сутки
            </button>
            <button
                className={formData.longTermRent ? "active" : ""}
                onClick={() => handleRentTypeChange(true)}
            >
              В месяц
            </button>
          </div>
          <input
              type="number"
              name="cost"
              placeholder="Укажите сумму"
              value={formData.cost}
              onChange={handleInputChange}
          />
        </label>

        <BigBlueButton props="Далее" fix="fixed" onClick={handleNext} />
      </div>
  );
};

export default CreateStep4;