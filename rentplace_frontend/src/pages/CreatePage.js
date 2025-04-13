import React from "react";
import Header from "../components/Header";
import RecentFirst from "../components/RecentFirst";
import Categories from "../components/Categories";
import "./CreatePage.css"

const CreatePage = () => {
  return (
    <div className="booking">
      <Header></Header>
      <RecentFirst></RecentFirst>
      <Categories></Categories>
      <div className="cards_container">
        <p>У вас нет активных объявлений о сдаче жилья</p>
      </div>
    </div>
  );
};

export default CreatePage;