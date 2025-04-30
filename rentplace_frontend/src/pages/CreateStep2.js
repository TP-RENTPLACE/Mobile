import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import "./CreateStep2.css"
import CategoryTable from "../components/CategoryTable";
import BigBlueButton from "../components/BigBlueButton";

const CreateStep2 = () => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    area: "",
    guests: "",
    rooms: "",
    beds: "",
    amenities: [],
  });
  const categories1 = [
    "Кондиционер",
    "Холодильник",
    "Микроволновка",
    "Стиральная машина",
    "Утюг",
    "Телевизор",
    "Плита",
    "Посудомоечная машина",
    "Фен",
  ];
  const categories2 = [
    "Wi-Fi",
    "Телевидение",
    
  ];
  const categories3 = [
    "Постельное белье",
    "Полотенца",
    "Средства гигиены",
  ];

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prevData) => {
      if (prevData.amenities.includes(amenity)) {
        return {
          ...prevData,
          amenities: prevData.amenities.filter((a) => a !== amenity),
        };
      } else {
        return {
          ...prevData,
          amenities: [...prevData.amenities, amenity],
        };
      }
    });
  };

  const handleNext = () => {
    navigate("/create-ad/step3"); // Абсолютный путь
  };

  return (
    <div className="create-ad-container">
      <HeadWithText props="Новое объявление"/>
      <p>Укажите основную информацию</p>
      <form>
        <label>
          
          <span>Название</span>
          <input
            type="text"
            name="title"
            placeholder="Укажите название"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Адрес</span> 
          <input
            type="text"
            name="address"
            placeholder="Населенный пункт, улица и номер дома"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Общая площадь, м²</span>
          
          <input
            type="number"
            name="area"
            placeholder="Общая площадь"
            value={formData.area}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Количество гостей</span>
          
          <input
            type="number"
            name="area"
            placeholder="Выбрать"
            value={formData.area}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Количество комнат</span>
          
          <input
            type="number"
            name="area"
            placeholder="Выбрать"
            value={formData.area}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Количество спален</span>
          
          <input
            type="number"
            name="area"
            placeholder="Выбрать"
            value={formData.area}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Количество кроватей</span>
          
          <input
            type="number"
            name="area"
            placeholder="Выбрать"
            value={formData.area}
            onChange={handleInputChange}
          />
        </label>
        
      </form>
      <CategoryTable categories={categories1} title="Техника"/>
      <CategoryTable categories={categories2} title="Интернет и ТВ"/>
      <CategoryTable categories={categories3} title="Комфорт"/>
      <p className="last"></p>
      <BigBlueButton props="Далее" fix="fixed" onClick={handleNext}/>
    </div>
  );
};

export default CreateStep2;