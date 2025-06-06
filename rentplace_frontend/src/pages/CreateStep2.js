import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import "./CreateStep2.css"
import FacilityTable from "../components/FacilityTable";
import BigBlueButton from "../components/BigBlueButton";
import { getAllFacilities } from "../store/allFacilities";
import { toast } from "react-hot-toast";
import { MapPin } from 'lucide-react';

const VALIDATION_RULES = {
  TITLE_MAX_LENGTH: 100,
  ADDRESS_MAX_LENGTH: 200,
  MIN_NUMBER_VALUE: 0,
  MAX_REASONABLE_AREA: 1000,
  MAX_REASONABLE_GUESTS: 500,
  MAX_REASONABLE_ROOMS: 500,
  MAX_REASONABLE_BEDROOMS: 500,
  MAX_REASONABLE_BEDS: 500,
  MIN_LETTERS_COUNT: 3,
  TITLE_MIN_LENGTH: 5,
  ADDRESS_MIN_LENGTH: 10,
  SYMBOLS_REGEX: /[^\p{L}\d\s]/gu,
  DIGITS_ONLY_REGEX: /^\d+$/,
};

const CreateStep2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousData = location.state || {};
  const [cache, setCache] = useState({});
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    getAllFacilities().then(setAllFacilities).catch(toast.error);
  }, []);

  const fetchAddressSuggestions = async (query) => {
    const encodedQuery = encodeURIComponent(query);

    if (encodedQuery in cache) {
      setAddressSuggestions(cache[encodedQuery]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://geocode-maps.yandex.ru/v1/?apikey=e0bb9270-d90c-43c9-871b-b084b6db3402&geocode=${encodedQuery}&lang=ru_RU&format=json`
      );
      const data = await response.json();

      const filteredSuggestions = data.response.GeoObjectCollection.featureMember
        .filter(
          (item) => item.GeoObject.metaDataProperty.GeocoderMetaData.Address.country_code === "RU"
        )
        .map((item) => {
          const address = item.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;
          const addressWithoutCountry = address.replace(/^Россия, /, '');
          return { ...item, addressWithoutCountry };
        });

      setCache((prevCache) => ({ ...prevCache, [encodedQuery]: filteredSuggestions }));
      setAddressSuggestions(filteredSuggestions);
    } catch (error) {
      toast.error("Ошибка при запросе данных:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setFormData({ ...formData, address: query });

    if (query.length >= 2) {
      fetchAddressSuggestions(query);
    } else {
      setAddressSuggestions([]);
    }
  };

  const handleAddressSelect = (address) => {
    setFormData({ ...formData, address: address });
    setShowSuggestions(false);
  };

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

  const validate = () => {
    const errors = [];
    const {
      title, address, area, maxGuests, rooms,
      bedrooms, sleepingPlaces, facilities
    } = formData;

    if (!title.trim()) {
      errors.push("Название: поле обязательно");
    } else {
      if (title.length < VALIDATION_RULES.TITLE_MIN_LENGTH) {
        errors.push(`Название: минимум ${VALIDATION_RULES.TITLE_MIN_LENGTH} символов`);
      }
      if (VALIDATION_RULES.DIGITS_ONLY_REGEX.test(title)) {
        errors.push("Название: не может состоять только из цифр");
      }
      if (title.replace(VALIDATION_RULES.SYMBOLS_REGEX, '').length < VALIDATION_RULES.MIN_LETTERS_COUNT) {
        errors.push(`Название: должно содержать минимум ${VALIDATION_RULES.MIN_LETTERS_COUNT} буквы`);
      }
    }

    if (!address.trim()) {
      errors.push("Адрес: поле обязательно");
    } else {
      if (address.length < VALIDATION_RULES.ADDRESS_MIN_LENGTH) {
        errors.push(`Адрес: минимум ${VALIDATION_RULES.ADDRESS_MIN_LENGTH} символов`);
      }
      if (VALIDATION_RULES.DIGITS_ONLY_REGEX.test(address)) {
        errors.push("Адрес: не может состоять только из цифр");
      }
      const lettersCount = address.replace(VALIDATION_RULES.SYMBOLS_REGEX, '')
        .replace(/\d/g, '')
        .trim().length;
      if (lettersCount < VALIDATION_RULES.MIN_LETTERS_COUNT) {
        errors.push(`Адрес: должно содержать минимум ${VALIDATION_RULES.MIN_LETTERS_COUNT} буквы`);
      }
    }

    const numberChecks = [
      { name: "area", value: area, label: "Общая площадь", max: VALIDATION_RULES.MAX_REASONABLE_AREA },
      { name: "maxGuests", value: maxGuests, label: "Количество гостей", max: VALIDATION_RULES.MAX_REASONABLE_GUESTS },
      { name: "rooms", value: rooms, label: "Количество комнат", max: VALIDATION_RULES.MAX_REASONABLE_ROOMS },
      { name: "bedrooms", value: bedrooms, label: "Количество спален", max: VALIDATION_RULES.MAX_REASONABLE_BEDROOMS },
      { name: "sleepingPlaces", value: sleepingPlaces, label: "Количество кроватей", max: VALIDATION_RULES.MAX_REASONABLE_BEDS },
    ];

    numberChecks.forEach(({ name, value, label, max }) => {
      if (!value || isNaN(Number(value))) {
        errors.push(`${label}: введите число`);
      } else if (Number(value) <= VALIDATION_RULES.MIN_NUMBER_VALUE) {
        errors.push(`${label}: должно быть положительным`);
      } else if (max && Number(value) > max) {
        errors.push(`${label}: слишком большое значение (максимум ${max})`);
      }
    });

    if (!facilities || facilities.length === 0) {
      errors.push("Выберите хотя бы одно удобство");
    }

    if (errors.length > 0) {
      toast.error(errors.join("\n"));
      return false;
    }

    return true;
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };


  const handleNext = () => {
    if (!validate()) return;


    const allData = {
      ...previousData,
      ...formData
    };

    navigate("/create-ad/step3", { state: allData });
  };

  return (
    <div className="create-ad-container">
      <HeadWithText props="Новое объявление" />
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
            onChange={handleSearchQueryChange}
            onFocus={handleInputFocus}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && addressSuggestions.length > 0 && (
            <div className="input-wrapper">
              <div className="suggestions-dropdown">
                {addressSuggestions.map((place, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleAddressSelect(place.addressWithoutCountry)}
                  >
                    <MapPin />
                    <span>{place.addressWithoutCountry}</span>

                  </div>
                ))}
              </div>
            </div>
          )}
        </label>
        <label>
          <span>Общая площадь, м²</span>

          <input
            type="number"
            name="area"
            placeholder="Общая площадь"
            value={formData.area}
            onChange={handleInputChange}
            onWheel={(e) => e.target.blur()}
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
            onWheel={(e) => e.target.blur()}
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
            onWheel={(e) => e.target.blur()}
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
            onWheel={(e) => e.target.blur()}
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
            onWheel={(e) => e.target.blur()}
          />
        </label>

      </form>
      <FacilityTable facilities={allFacilities} title="Удобства" selected={formData.facilities} onToggle={handleFacilityChange} />

      <p className="last"></p>
      <BigBlueButton props="Далее" fix="fixed" onClick={handleNext} />
    </div>
  );
};

export default CreateStep2;