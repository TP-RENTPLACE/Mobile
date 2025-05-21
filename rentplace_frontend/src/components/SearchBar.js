import React, { useState } from "react";
import "./SearchBar.css";
import { Search } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FiltersPage from "../pages/FiltersPage";

const SearchBar = () => {
  const navigate = useNavigate();
  const [showFullscreenFilters, setShowFullscreenFilters] = useState(false);

  const handleClickFilters = () => {
    navigate("/filters");
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
            readOnly
          />
        </div>
        <div className="filters-icon" onClick={handleClickFilters}>
          <SlidersHorizontal />
        </div>
      </div>
    </>
  );
};

export default SearchBar;