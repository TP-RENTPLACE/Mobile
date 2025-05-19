import React, { useEffect, useState } from "react";
import HeadWithText from "../components/HeadWithText";
import PropertyCard from "../components/PropertyCard";
import BigBlueButton from "../components/BigBlueButton";
import "./BookingConfirmation.css";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../api/authService";
import apiClient from "../api/apiClient";
import reservationService from "../api/reservationService";
import BookingCard from "../components/BookingCard";

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state;

    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.getInfo()
            .then((data) => setUser(data))
            .catch((err) => {
                console.error("Ошибка получения пользователя:", err);
                alert("Не удалось получить информацию о пользователе");
            });
    }, []);

    const handleConfirm = async () => {
        if (!booking || !user.userId) {
            alert("Недостаточно данных для бронирования");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("propertyId", booking.propertyId);
            formData.append("renterId", user.userId);
            formData.append("startDate", booking.startDate);
            formData.append("endDate", booking.endDate)
            formData.append("costInPeriod", booking.costInPeriod);
            formData.append("longTermRent", booking.longTermRent);


            await reservationService.create(formData);

            alert("Бронирование успешно создано!");
            navigate("/bookings");
        } catch (error) {
            console.error("Ошибка бронирования:", error);
            alert("Произошла ошибка при бронировании. Попробуйте позже.");
        }
    };

    if (!booking || !booking.property) {
        return <div>Данные бронирования не найдены</div>;
    }

    const { property, startDate, endDate, costInPeriod } = booking;

    return (
        <div className="booking-confirmation">
            <HeadWithText props="Подтверждение бронирования" />
            <BookingCard property={property} />

            <div className="living-date">
                <span>Дата проживания</span>
                <div className="living-date_date">
                    <span>{startDate} — {endDate}</span>
                    <div className="change" onClick={() => navigate(-1)}>Изменить</div>
                </div>
            </div>

            <div className="your-data">
                <span>Ваши данные</span>
                <input
                    type="text"
                    value={user?.name || ""}
                    placeholder="Имя"
                    disabled
                />
                <input
                    type="text"
                    value={user?.surname || ""}
                    placeholder="Фамилия"
                    disabled
                />
            </div>

            <div className="price-count">
                <span className="head">Расчет стоимости</span>
                <div className="price-count_item">
                    <span>Стоимость проживания</span>
                    <span>{costInPeriod}₽</span>
                </div>
                <div className="price-count_item">
                    <span>Комиссия сервиса</span>
                    <span>{Math.floor(costInPeriod * 0.05)}₽</span>
                </div>
            </div>

            <div className="summarize">
                <div className="summarize_item-sum">
                    <span>Итого</span>
                    <span>{Math.floor(costInPeriod * 1.05)}₽</span>
                </div>
                <div className="summarize_item">
                    <span>Предоплата</span>
                    <span>{Math.floor(costInPeriod * 0.2)}₽</span>
                </div>
                <div className="summarize_item">
                    <span>Оплата при заселении</span>
                    <span>{Math.floor(costInPeriod * 0.85)}₽</span>
                </div>
            </div>

            <BigBlueButton props="Подтвердить бронирование" fix="fixed" onClick={handleConfirm} />
        </div>
    );
};
export default BookingConfirmation;