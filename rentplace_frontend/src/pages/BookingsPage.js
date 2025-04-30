import React from "react";
import Header from "../components/Header";
import RecentFirst from "../components/RecentFirst";
import Categories from "../components/Categories";
import "./BookingsPage.css";
import BottomNavigation from "../components/BottomNavigation";

const BookingsPage = () => {
  return (
    <>
      <div className="booking">
        <Header></Header>
        <RecentFirst></RecentFirst>
        <Categories></Categories>
        <div className="cards_container">
          <p>У вас нет активных броней</p>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default BookingsPage;
