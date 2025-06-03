import React from "react";
import Categories from "./Categories";
import "./Head.css";
import Header from "./Header";
import SearchBar from "./SearchBar";

const Head = () => {
  return (
    <div className="header">
      <Header />
      <SearchBar />
      <Categories />
    </div>
  );
};

export default Head;
