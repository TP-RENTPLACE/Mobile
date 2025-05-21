import React, { useState, useEffect } from "react";
import "./FiltersPage.css";
import HeadWithText from "../components/HeadWithText";
import BigBlueButton from "../components/BigBlueButton";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
import CategoryService from "../api/categoryService";
import FacilityTable from "../components/FacilityTable";
import {getAllFacilities} from "../store/allFacilities";
import {loadSelectedCategories, saveSelectedCategories} from "../store/categoryStorage";

const FiltersPage = () => {
  const [sortOption, setSortOption] = useState("MOST_RECENT");
  const [value, setValue] = useState([20, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeGuests, setActiveGuests] = useState("Любое");
  const [activeBeds, setActiveBeds] = useState("Любое");
  const [activeBedrooms, setActiveBedrooms] = useState("Любое");
  const [activeRooms, setActiveRooms] = useState("Любое");
  const [isLongTermRent, setIsLongTermRent] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const [facilities, setFacilities] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  useEffect(() => {
    const savedFiltersRaw = localStorage.getItem("appliedFilters");
    const savedFilters = savedFiltersRaw ? JSON.parse(savedFiltersRaw) : null;
    const storedCategories = loadSelectedCategories();
    const storedAddress = localStorage.getItem("searchAddress") || "";

    if (savedFilters) {
      setSortOption(savedFilters.sortType || "MOST_RECENT");
      setIsLongTermRent(savedFilters.hasOwnProperty("isLongTermRent") ? savedFilters.isLongTermRent : undefined);
      setValue([savedFilters.minPrice ?? 0, savedFilters.maxPrice ?? 100000]);
      setActiveGuests(savedFilters.guestsAmount == null ? "Любое" : savedFilters.guestsAmount >= 5 ? "5 и более" : String(savedFilters.guestsAmount));
      setActiveBeds(savedFilters.bedsAmount == null ? "Любое" : savedFilters.bedsAmount >= 5 ? "5 и более" : String(savedFilters.bedsAmount));
      setActiveBedrooms(savedFilters.bedrooms == null ? "Любое" : savedFilters.bedrooms >= 5 ? "5 и более" : String(savedFilters.bedrooms));
      setActiveRooms(savedFilters.rooms == null ? "Любое" : savedFilters.rooms >= 5 ? "5 и более" : String(savedFilters.rooms));
      setSelectedCategories(savedFilters.categoryIds ?? storedCategories);
      setSelectedFacilities(savedFilters.facilityIds ?? []);
      setAddress(savedFilters?.address ?? storedAddress);
    } else {
      setSelectedCategories(storedCategories);
      setActiveGuests("Любое");
      setActiveBeds("Любое");
      setActiveBedrooms("Любое");
      setActiveRooms("Любое");
      setIsLongTermRent(undefined);
      setValue([20, 100000]);
      setSortOption("MOST_RECENT");
      setSelectedFacilities([]);
      setAddress(storedAddress);
    }
  }, []);



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await CategoryService.getAll();
        setCategories(result);
      } catch (err) {
        console.error("Ошибка загрузки категорий", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    getAllFacilities().then(setFacilities).catch(console.error);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleApplyFilters = () => {
    const guestsValue = activeGuests === "Любое" ? null : activeGuests === "5 и более" ? 5 : parseInt(activeGuests);
    const bedsValue = activeBeds === "Любое" ? null : activeBeds === "5 и более" ? 5 : parseInt(activeBeds);
    const bedroomsValue = activeBedrooms === "Любое" ? null : activeBedrooms === "5 и более" ? 5 : parseInt(activeBedrooms);
    const roomsValue = activeRooms === "Любое" ? null : activeRooms === "5 и более" ? 5 : parseInt(activeRooms);

    const filters = {
      sortType: sortOption,
      ...(value[0] !== undefined && { minPrice: value[0] }),
      ...(value[1] !== undefined && { maxPrice: value[1] }),
      ...(guestsValue !== null && { guestsAmount: guestsValue }),
      ...(bedsValue !== null && { bedsAmount: bedsValue }),
      ...(bedroomsValue !== null && { bedrooms: bedroomsValue }),
      ...(roomsValue !== null && { rooms: roomsValue }),
      ...(selectedCategories.length > 0 && { categoryIds: selectedCategories }),
      ...(selectedFacilities.length > 0 && { facilityIds: selectedFacilities }),
      ...(isLongTermRent !== undefined && { isLongTermRent }),
      ...(address && { address }),
    };

    saveSelectedCategories(selectedCategories);
    localStorage.setItem("appliedFilters", JSON.stringify(filters));
    navigate("/", { state: { filters } });
  };


  const resetAll = () => {
    setActiveGuests("Любое");
    setActiveBeds("Любое");
    setActiveBedrooms("Любое");
    setActiveRooms("Любое");
    setValue([20, 100000]);
    setSortOption("MOST_RECENT");
    setIsLongTermRent(undefined);
    localStorage.removeItem("appliedFilters");
    localStorage.removeItem("selectedCategoryIds");
    setSelectedFacilities([]);
    setSelectedCategories([]);
    setAddress("");
  };


  const handleToggleFacility = (id) => {
    setSelectedFacilities((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleToggleCategory = (id) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
      return updated;
    });
  };


  return (
      <div className="filters-page">
        <HeadWithText props={"Фильтры"} />

        <div className="apartment_type">
          <div className="head">
            <h4>Категории жилья</h4>
            <div className="reset-button" onClick={resetAll}>Сбросить все</div>
          </div>
          <div className="type">
            {categories.map((category) => (
                <div
                    key={category.categoryId}
                    className={`type_item ${selectedCategories.includes(category.categoryId) ? "active" : ""}`}
                    onClick={() => handleToggleCategory(category.categoryId)}
                >
                  <img src={category.imageUrl || 1} alt={category.categoryId} />
                  <span>{category.name}</span>
                </div>
            ))}
          </div>
        </div>

        <div className="sort">
          <h3>Сортировка</h3>
          {["MOST_RECENT", "MOST_EXPENSIVE", "MOST_CHEAP"].map(option => (
              <label className="sort-option" key={option}>
                <input
                    type="radio"
                    name="sort"
                    value={option}
                    checked={sortOption === option}
                    onChange={() => setSortOption(option)}
                />
                <span>
              {option === "MOST_RECENT" ? "Сначала недавние" :
                  option === "MOST_EXPENSIVE" ? "Сначала дорогие" :
                      "Сначала дешевые"}
            </span>
              </label>
          ))}
        </div>

        <div className="rent-payment">
          <h3>Арендная плата, ₽</h3>
          <div className="daily-monthly">
            <div
                className={`daily-monthly_item ${!isLongTermRent && isLongTermRent !== undefined ? "active" : ""}`}
                onClick={() => setIsLongTermRent(false)}
            >
              За сутки
            </div>
            <div
                className={`daily-monthly_item ${isLongTermRent ? "active" : ""}`}
                onClick={() => setIsLongTermRent(true)}
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
                "& .MuiSlider-track": { backgroundColor: "#007AFF" },
                "& .MuiSlider-rail": { opacity: 1, backgroundColor: "#007AFF" }
              }}
          />
          <div className="range">
            <div className="range-item">
              <span>От</span>
              <div>{value[0]}</div>
            </div>
            <div className="divider" />
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
              {["Любое", "1", "2", "3", "4", "5 и более"].map((g) => (
                  <div
                      key={`guests-${g}`}
                      className={`number_item ${activeGuests === g ? "active" : ""}`}
                      onClick={() => setActiveGuests(g)}
                  >
                    {g}
                  </div>
              ))}
            </div>
          </div>
        </div>

        <div className="beds-number">
          <h3>Количество кроватей</h3>
          <div className="scroll-container">
            <div className="buts">
              {["Любое", "1", "2", "3", "4", "5 и более"].map((b) => (
                  <div
                      key={`beds-${b}`}
                      className={`number_item ${activeBeds === b ? "active" : ""}`}
                      onClick={() => setActiveBeds(b)}
                  >
                    {b}
                  </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bedrooms-number">
          <h3>Количество спален</h3>
          <div className="scroll-container">
            <div className="buts">
              {["Любое", "1", "2", "3", "4", "5 и более"].map((val) => (
                  <div
                      key={`bedrooms-${val}`}
                      className={`number_item ${activeBedrooms === val ? "active" : ""}`}
                      onClick={() => setActiveBedrooms(val)}
                  >
                    {val}
                  </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rooms-number">
          <h3>Количество комнат</h3>
          <div className="scroll-container">
            <div className="buts">
              {["Любое", "1", "2", "3", "4", "5 и более"].map((val) => (
                  <div
                      key={`rooms-${val}`}
                      className={`number_item ${activeRooms === val ? "active" : ""}`}
                      onClick={() => setActiveRooms(val)}
                  >
                    {val}
                  </div>
              ))}
            </div>
          </div>
        </div>

        <FacilityTable facilities={facilities} title="Удобства" selected={selectedFacilities} onToggle={handleToggleFacility}/>
        <div className="bott"></div>

        <BigBlueButton fix="fixed" props="Применить" onClick={handleApplyFilters} />
      </div>
  );
};

export default FiltersPage;