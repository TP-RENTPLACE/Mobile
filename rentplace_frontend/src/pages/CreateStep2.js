import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import "./CreateStep2.css"
import FacilityTable from "../components/FacilityTable";
import BigBlueButton from "../components/BigBlueButton";
import {getAllFacilities} from "../store/allFacilities";

const CreateStep2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousData = location.state || {};

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    area: "",
    maxGuests: "",
    rooms: "",
    bedrooms: "",
    sleepingPlaces: "",
    facilities: [],
  });

  const [allFacilities, setAllFacilities] = useState([]);

  useEffect(() => {
    getAllFacilities().then(setAllFacilities).catch(console.error);
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFacilityChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(id)
          ? prev.facilities.filter((f) => f !== id)
          : [...prev.facilities, id],
    }));
  };


  const handleNext = () => {
    console.log("ШАГ 2 — Сформированные данные:");
    console.log(formData);

    const allData = {
      ...previousData,
      ...formData
    };

    // передаём данные дальше (например, через context / store / localStorage)
    navigate("/create-ad/step3", {state: allData});
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
            name="maxGuests"
            placeholder="Выбрать"
            value={formData.maxGuests}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Количество комнат</span>
          
          <input
            type="number"
            name="rooms"
            placeholder="Выбрать"
            value={formData.rooms}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Количество спален</span>
          
          <input
            type="number"
            name="bedrooms"
            placeholder="Выбрать"
            value={formData.bedrooms}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Количество кроватей</span>
          
          <input
            type="number"
            name="sleepingPlaces"
            placeholder="Выбрать"
            value={formData.sleepingPlaces}
            onChange={handleInputChange}
          />
        </label>
        
      </form>
      <FacilityTable facilities={allFacilities} title="Техника" selected={formData.facilities} onToggle={handleFacilityChange}/>

      <p className="last"></p>
      <BigBlueButton props="Далее" fix="fixed" onClick={handleNext}/>
    </div>
  );
};

export default CreateStep2;