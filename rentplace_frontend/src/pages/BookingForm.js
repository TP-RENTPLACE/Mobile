import React, { useState } from "react";
import "./BookingForm.css";
import BigBlueButton from "../components/BigBlueButton";
import HeadWithText from "../components/HeadWithText";
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // Главный CSS
// import 'react-date-range/dist/theme/default.css'; // Тема (опционально)
// import { addYears } from 'date-fns'; 

const BookingForm = () => {
  // Состояния для хранения выбранных данных
  const [startDate, setStartDate] = useState("");
  const [months, setMonths] = useState("");
  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setSelection(ranges.selection);
  };
  // Обработчик изменения даты
  const handleDateChange = (event) => {
    setStartDate(event.target.value);
  };

  // Обработчик изменения количества месяцев
  const handleMonthsChange = (event) => {
    setMonths(event.target.value);
  };

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Дата начала проживания:", startDate);
    console.log("Количество месяцев:", months);
    alert("Данные успешно отправлены!");
  };

  return (
    <div className="booking-form">
      <div className="head">
        <HeadWithText props="Выберите даты" />
      </div>
      <form onSubmit={handleSubmit}>
        {/* Поле для выбора даты */}
        <div className="input-group">
          <label htmlFor="start-date">Выберите дату начала проживания</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleDateChange}
            placeholder="Не указана"
          />
        </div>
        {/* <DateRangePicker
      ranges={[selection]}
      onChange={handleSelect}
    /> */}
        {/* Поле для ввода количества месяцев */}
        <div className="input-group">
          <label htmlFor="months">Укажите количество месяцев</label>
          <input
            type="number"
            id="months"
            value={months}
            onChange={handleMonthsChange}
            placeholder="Введите текст"
          />
        </div>

        {/* Кнопка подтверждения */}
        <BigBlueButton props="Забронировать" />
      </form>
    </div>
  );
};

export default BookingForm;
