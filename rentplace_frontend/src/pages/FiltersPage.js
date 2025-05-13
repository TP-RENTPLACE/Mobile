import React, { useState } from "react";
import "./FiltersPage.css";
import HeadWithText from "../components/HeadWithText";
import { Building, WavesLadder, Waves } from "lucide-react";
import BigBlueButton from "../components/BigBlueButton";
import Slider from "@mui/material/Slider";

const FiltersPage = ({ products, onFilterApply }) => {
  const [sortOption, setSortOption] = useState("recent");
  const [value, setValue] = useState([20, 80]);

  // Состояния для активных элементов
  const [rentPeriod, setRentPeriod] = useState("За сутки"); // или другое значение по умолчанию
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeGuests, setActiveGuests] = useState("Любое");
  const [activeBeds, setActiveBeds] = useState("Любое");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resetAll = () => {
    setActiveCategory(null);
    setActiveGuests("Любое");
    setActiveBeds("Любое");
    setRentPeriod("За сутки"); // Добавьте эту строку
    setValue([20, 80]);
    setSortOption("recent");
  };

  return (
    <div className="filters-page">
      <HeadWithText props={"Фильтры"} />

      <div className="apartment_type">
        <div className="head">
          <h4>Категории жилья</h4>
          <div onClick={resetAll}>Сбросить все</div>
        </div>
        <div className="type">
          <div
            className={`type_item ${
              activeCategory === "Квартиры" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("Квартиры")}
          >
            <Building />
            <span>Квартиры</span>
          </div>
          <div
            className={`type_item ${
              activeCategory === "Дома с бассейном" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("Дома с бассейном")}
          >
            <WavesLadder />
            <span>Дома с бассейном</span>
          </div>
          <div
            className={`type_item ${
              activeCategory === "Рядом с морем" ? "active" : ""
            }`}
            onClick={() => setActiveCategory("Рядом с морем")}
          >
            <Waves />
            <span>Рядом с морем</span>
          </div>
        </div>
      </div>

      <div className="sort">
        <h3>Сортировка</h3>
        <label className="sort-option">
          <input
            type="radio"
            name="sort"
            value="recent"
            checked={sortOption === "recent"}
            onChange={() => setSortOption("recent")}
          />
          <span>Сначала недавние</span>
        </label>

        <label className="sort-option">
          <input
            type="radio"
            name="sort"
            value="high-price"
            checked={sortOption === "high-price"}
            onChange={() => setSortOption("high-price")}
          />
          <span>Сначала дорогие</span>
        </label>

        <label className="sort-option">
          <input
            type="radio"
            name="sort"
            value="low-price"
            checked={sortOption === "low-price"}
            onChange={() => setSortOption("low-price")}
          />
          <span>Сначала дешевые</span>
        </label>
      </div>

      <div className="rent-payment">
        <h3>Арендная плата, ₽</h3>
        <div className="daily-monthly">
          <div
            className={`daily-monthly_item ${
              rentPeriod === "За сутки" ? "active" : ""
            }`}
            onClick={() => setRentPeriod("За сутки")}
          >
            За сутки
          </div>
          <div
            className={`daily-monthly_item ${
              rentPeriod === "В месяц" ? "active" : ""
            }`}
            onClick={() => setRentPeriod("В месяц")}
          >
            В месяц
          </div>
        </div>
      </div>

      <div className="slide">
        <Slider
          value={value}
          onChange={handleChange}
          min={0}
          max={100000}
          valueLabelDisplay="auto"
          color="#007AFF"
          sx={{
            color: "#007AFF",
            height: "1px",
            "& .MuiSlider-thumb": {
              backgroundColor: "#fff",
              border: "1px solid #007AFF",
              borderRadius: "50%",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              width: "20px",
              height: "20px",
            },
            "& .MuiSlider-track": {
              backgroundColor: "#007AFF",
            },
            "& .MuiSlider-rail": {
              opacity: 1,
              backgroundColor: "#007AFF",
            },
          }}
        />
        <div className="range">
          <div className="range-item">
            <span>От</span>
            <div>{value[0]}</div>
          </div>
          <div className="divider"></div>
          <div className="range-item">
            <span>До</span>
            <div>{value[1]}</div>
          </div>
        </div>
      </div>

      <div className="guests-number">
        <h3>Количество гостей</h3>
        <div className="scroll-container">
          <div className="buts">
            <div
              className={`number_item1 ${
                activeGuests === "Любое" ? "active" : ""
              }`}
              onClick={() => setActiveGuests("Любое")}
            >
              Любое
            </div>
            <div
              className={`number_item ${activeGuests === "1" ? "active" : ""}`}
              onClick={() => setActiveGuests("1")}
            >
              1
            </div>
            <div
              className={`number_item ${activeGuests === "2" ? "active" : ""}`}
              onClick={() => setActiveGuests("2")}
            >
              2
            </div>
            <div
              className={`number_item ${activeGuests === "3" ? "active" : ""}`}
              onClick={() => setActiveGuests("3")}
            >
              3
            </div>
            <div
              className={`number_item ${activeGuests === "4" ? "active" : ""}`}
              onClick={() => setActiveGuests("4")}
            >
              4
            </div>
            <div
              className={`number_item1 ${
                activeGuests === "5 и более" ? "active" : ""
              }`}
              onClick={() => setActiveGuests("5 и более")}
            >
              5 и более
            </div>
            <div style={{ minWidth: "16px", height: "1px" }}></div>
          </div>
        </div>
      </div>

      <div className="beds-number">
        <h3>Количество кроватей</h3>
        <div className="scroll-container">
          <div className="buts">
            <div
              className={`number_item1 ${
                activeBeds === "Любое" ? "active" : ""
              }`}
              onClick={() => setActiveBeds("Любое")}
            >
              Любое
            </div>
            <div
              className={`number_item ${activeBeds === "1" ? "active" : ""}`}
              onClick={() => setActiveBeds("1")}
            >
              1
            </div>
            <div
              className={`number_item ${activeBeds === "2" ? "active" : ""}`}
              onClick={() => setActiveBeds("2")}
            >
              2
            </div>
            <div
              className={`number_item ${activeBeds === "3" ? "active" : ""}`}
              onClick={() => setActiveBeds("3")}
            >
              3
            </div>
            <div
              className={`number_item ${activeBeds === "4" ? "active" : ""}`}
              onClick={() => setActiveBeds("4")}
            >
              4
            </div>
            <div
              className={`number_item1 ${
                activeBeds === "5 и более" ? "active" : ""
              }`}
              onClick={() => setActiveBeds("5 и более")}
            >
              5 и более
            </div>
            <div style={{ minWidth: "16px", height: "1px" }}></div>
          </div>
        </div>
      </div>

      <BigBlueButton fix="fixed" props="Применить" botom="bottom" />
    </div>
  );
};

export default FiltersPage;
