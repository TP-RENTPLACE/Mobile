import React from "react";
// import BookingHeader from './BookingHeader';
// import BookingDetails from './BookingDetails';
// import GuestInfo from './GuestInfo';
// import PriceBreakdown from './PriceBreakdown';
// import ConfirmButton from './ConfirmButton';
import HeadWithText from "../components/HeadWithText";
import PropertyCard from "../components/PropertyCard";
import BigBlueButton from "../components/BigBlueButton";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
  const property = {
    id: 1,
    image: "./images/property1.png",
    title: "Вилла с панорамным видом",
    rating: 4.96,
    reviews: 217,
    area: 360,
    guests: 6,
    bedrooms: 3,
    beds: 3,
    address: "Лоо, Таллинская улица, 93",
    price: "59 000",
  };
  return (
    <div className="booking-confirmation">
      <HeadWithText props="Подтверждение бронирования" />
      <PropertyCard property={property} isfav={true} />
      <div className="living-date">
        <span>Дата проживания</span>
        <div className="living-date_date">
          <span>3 февраля - 7 февраля</span>
          <div className="change">Изменить</div>
        </div>
      </div>
      <div className="your-data">
        <span>Ваши данные</span>
        <input type="text" placeholder="Имя" />
        <input type="text" placeholder="Фамилия" />
      </div>
      <div className="price-count">
        <span className="head">Расчет стоимости</span>
        <div className="price-count_item">
          <span>Стоимость проживания</span>
          <span>90000₽</span>
        </div>
        <div className="price-count_item">
          <span>Комиссия сервиса</span>
          <span>4500₽</span>
        </div>
      </div>
      <div className="summarize">
        <div className="summarize_item-sum">
          <span>Итого</span>
          <span>94500₽</span>
        </div>
        <div className="summarize_item">
          <span>Предоплата</span>
          <span>18900₽</span>
        </div>
        <div className="summarize_item">
          <span>Оплата при заселении</span>
          <span>75600₽</span>
        </div>
      </div>
      <BigBlueButton props={"Подтвердить бронирование"} fix={"fixed"} />
      {/* <BookingHeader 
        title="Подтверждение бронирования"
        property="Hillside из территории Огня-Песне"
        details="4 гостин - 3 спальни - 3 недели"
        link="https://www.facebook.com/office/2018/01/1"
        address="Мыслитель Аллайский проезд: 3/1"
      /> */}

      {/* <BookingDetails 
        dates="3 февраля - 7 февраля"
      /> */}

      {/* <GuestInfo 
        firstName="Борис"
        lastName="Назаров"
      /> */}

      {/* <PriceBreakdown 
        items={[
          { label: "Стоимость проживания", value: "90000 ₽" },
          { label: "Комиссия сервиса", value: "4500 ₽" },
          { label: "Итого", value: "94500 ₽", isTotal: true },
          { label: "Предоплата", value: "18900 ₽" },
          { label: "Оплата при заселении", value: "75600 ₽" }
        ]}
      />
      
      <ConfirmButton text="Подтвердить бронирование" /> */}
    </div>
  );
};

export default BookingConfirmation;
