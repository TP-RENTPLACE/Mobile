import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchAddress, setSearchAddress] = useState("");

  useEffect(() => {
    const address = localStorage.getItem("searchAddress");
    setSearchAddress(address?.trim() || "");
  }, []);

  const handleClickFilters = () => navigate("/filters");
  const handleClickSearch = () => navigate("/destination");

  return (
      <div className="search">
        <div className="search-bar" onClick={handleClickSearch}>
        <span className="search-icon">
          <Search />
        </span>
          <input
              type="text"
              value={searchAddress || "Куда хотите отправиться?"}
              readOnly
              className={searchAddress ? "has-value" : "placeholder"}
          />
        </div>
        <div className="filters-icon" onClick={handleClickFilters}>
          <SlidersHorizontal />
        </div>
      </div>
  );
};

export default SearchBar;