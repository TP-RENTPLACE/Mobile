import React from "react";
import Header from "../components/Header";
import RecentFirst from "../components/RecentFirst";
import Categories from "../components/Categories";
import "./BookingsPage.css";
import BottomNavigation from "../components/BottomNavigation";
import BookingCard from "../components/BookingCard";

const BookingsPage = () => {
  const property = {
    id: 1,
    image: './images/property1.png',
    title: 'Вилла с панорамным видом',
    from:19,
    to:20,
    months:"августа",
    address: 'Лоо, Таллинская улица, 93',
    price: '59 000',
  }
  return (
    <>
      <div className="booking">
        <Header></Header>
        <RecentFirst></RecentFirst>
        <Categories></Categories>
        <div className="cards_container">
          {/* <p>У вас нет активных броней</p> */}
          <BookingCard property={property}/>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default BookingsPage;
