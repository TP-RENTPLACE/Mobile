import React, { useState } from "react";
import "./BookingForm.css";
import BigBlueButton from "../components/BigBlueButton";
import HeadWithText from "../components/HeadWithText";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { property } = location.state || {};

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [months, setMonths] = useState("");

  if (!property) return <div>Объявление не найдено</div>;

  const isLongTerm = property.longTermRent;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  const nextDayString = nextDay.toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate) {
      toast.error("Выберите дату начала проживания");
      return;
    }

    let calculatedEndDate = endDate;
    let days = 0;
    let costInPeriod = 0;

    if (isLongTerm) {
      if (!months || Number(months) <= 0 || Number(months) > 12) {
        toast.error("Введите корректное количество месяцев (от 1 до 12)");
        return;
      }

      const start = new Date(startDate);
      calculatedEndDate = new Date(
        start.getFullYear(),
        start.getMonth() + Number(months),
        start.getDate()
      );

      costInPeriod = property.monthlyCost * Number(months);
    } else {
      if (!endDate) {
        toast.error("Выберите дату окончания проживания");
        return;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      const maxEndDate = new Date(start);
      maxEndDate.setMonth(start.getMonth() + 3);

      if (end <= start) {
        toast.error("Дата окончания должна быть позже даты начала");
        return;
      }
      if (end > maxEndDate) {
        toast.error("Максимальная продолжительность краткосрочной аренды — 3 месяца");
        return;
      }

      days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      costInPeriod = property.cost * days;
    }

    const bookingInfo = {
      propertyId: property.propertyId,
      startDate: formatDate(startDate),
      endDate: formatDate(calculatedEndDate),
      costInPeriod,
      longTermRent: isLongTerm,
      property,
      days: isLongTerm ? null : days,
      months: isLongTerm ? Number(months) : null
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
            className="real-date-input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={nextDayString}
            max={maxDateString}
          />
        </div>

        {isLongTerm ? (
          <div className="input-group">
            <label className="column-name">Количество месяцев</label>
            <input
              type="number"
              min="1"
              max="12"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            />
          </div>
        ) : (
          <div className="input-group">
            <label className="column-name">Дата окончания проживания</label>
            <input
              className="real-date-input"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={nextDayString}
              max={maxDateString}
            />
          </div>
        )}

        <BigBlueButton props="Далее" fix="fixed" />
      </form>
    </div>
  );
};

export default BookingForm;
