import React from "react";
import PropertiesList from "../components/PropertiesList";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import "./HomePage.css"

const HomePage = () => {
  return (
    <div className="home-container">
      <Header></Header>   
      <SearchBar></SearchBar>
      <Categories></Categories>
      <PropertiesList />
    </div>
  );
};

export default HomePage;