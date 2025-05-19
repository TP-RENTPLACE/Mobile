import React, { useState } from "react";
import "./BookingForm.css";
import BigBlueButton from "../components/BigBlueButton";
import HeadWithText from "../components/HeadWithText";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { property } = location.state || {};

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [months, setMonths] = useState("");

  if (!property) return <div>Объявление не найдено</div>;

  const isLongTerm = property.longTermRent;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate) {
      toast.error("Выберите дату начала проживания");
      return;
    }

    if (isLongTerm) {
      if (!months || Number(months) <= 0) {
        toast.error("Введите корректное количество месяцев");
        return;
      }
    } else {
      if (!endDate) {
        toast.error("Выберите дату окончания проживания");
        return;
      }

      if (new Date(endDate) <= new Date(startDate)) {
        toast.error("Дата окончания должна быть позже даты начала");
        return;
      }
    }

    let calculatedEndDate = endDate;

    if (isLongTerm) {
      const start = new Date(startDate);
      start.setMonth(start.getMonth() + Number(months));
      calculatedEndDate = start.toISOString().split("T")[0];
    }

    const bookingInfo = {
      propertyId: property.propertyId,
      startDate,
      endDate: calculatedEndDate,
      costInPeriod: property.cost,
      longTermRent: isLongTerm,
      property,
    };

    navigate("/booking-confirmation", { state: bookingInfo });
  };

  return (
      <div className="booking-form">
        <div className="head">
          <HeadWithText props="Выберите даты" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="column-name">Дата начала проживания</label>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {isLongTerm ? (
              <div className="input-group">
                <label className="column-name">Количество месяцев</label>
                <input
                    type="number"
                    min="1"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                />
              </div>
          ) : (
              <div className="input-group">
                <label className="column-name">Дата окончания проживания</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                />
              </div>
          )}

          <BigBlueButton props="Далее" fix="fixed" />
        </form>
      </div>
  );
};

export default BookingForm;