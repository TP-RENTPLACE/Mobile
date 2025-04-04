import React from 'react';
import './SearchBar.css';
import { Search } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';


const SearchBar = () => {
  return (
    <div className="search">
      <div className="search-bar">
        <span className="search-icon">
          <Search />
        </span>
        <input type="text" placeholder="Куда хотите отправиться?" />
      </div>
      <div className="filters-icon">
        <SlidersHorizontal />
      </div>
    </div>
  );
};

export default SearchBar;