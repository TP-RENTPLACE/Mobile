import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import "./CreateStep4.css"
import BigBlueButton from "../components/BigBlueButton";

const CreateStep4 = () => {
  const [formData, setFormData] = useState({
    description: "",
    priceType: "monthly", // monthly или daily
    price: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceTypeChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      priceType: type,
    }));
  };

  const handleNext = () => {
    navigate("/create-ad/step5"); // Абсолютный путь
  };

  return (
    <div className="create-ad-container">
      <HeadWithText props="Новое объявление"/>
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
      <BigBlueButton props="Сгенерировать описание с помощью AI" inverted="inverted"/>
      <label>
        <span>Арендная плата, ₽</span>
        <div className="rent-price">
          <button
            onClick={() => handlePriceTypeChange("daily")}
            style={{
              borderColor:
                formData.priceType === "daily" ? "#007bff" : "#c1c1c1",
            }}
          >
            За сутки
          </button>
          <button
            onClick={() => handlePriceTypeChange("monthly")}
            style={{
              borderColor:
                formData.priceType === "monthly" ? "#007bff" : "#c1c1c1",
            }}
          >
            В месяц
          </button>
        </div>
        <input
          type="number"
          name="price"
          placeholder="Укажите сумму"
          value={formData.price}
          onChange={handleInputChange}
        />
      </label>
      <BigBlueButton props="Далее" fix="fixed" onClick={handleNext}/>
    </div>
  );
};

export default CreateStep4;