import React, { useState } from "react";
import "./SearchBar.css";
import { Search } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FiltersPage from "../pages/FiltersPage"; // Убедитесь, что путь правильный

const SearchBar = () => {
  const navigate = useNavigate();
  const [showFullscreenFilters, setShowFullscreenFilters] = useState(false);

  const handleClickFilters = () => {
    setShowFullscreenFilters(true);
  };

  const handleCloseFilters = () => {
    setShowFullscreenFilters(false);
  };

  const handleClickSearch = () => {
    navigate("/destination");
  };

  return (
    <>
      <div className="search">
        <div className="search-bar" onClick={handleClickSearch}>
          <span className="search-icon">
            <Search />
          </span>
          <input 
            type="text" 
            placeholder="Куда хотите отправиться?" 
            readOnly // Чтобы не открывалась клавиатура при клике
          />
        </div>
        <div className="filters-icon" onClick={handleClickFilters}>
          <SlidersHorizontal />
        </div>
      </div>

      {/* Fullscreen Filters Overlay */}
      {showFullscreenFilters && (
        <div className="fullscreen-filters-overlay">
          <div className="fullscreen-filters-container">
            <FiltersPage onClose={handleCloseFilters} />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;