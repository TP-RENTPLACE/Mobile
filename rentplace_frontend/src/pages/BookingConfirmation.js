import React, { useEffect, useState } from "react";
import HeadWithText from "../components/HeadWithText";
import BigBlueButton from "../components/BigBlueButton";
import "./BookingConfirmation.css";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../api/authService";
import reservationService from "../api/reservationService";
import BookingCard from "../components/BookingCard";
import {toast} from "react-hot-toast";

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state;

    const [user, setUser] = useState(null);

    const { property, startDate, endDate, costInPeriod, longTermRent, days, months } = booking || {};

    const commission = costInPeriod * 0.04;
    const total = costInPeriod + commission;
    const prepayment = total * 0.10;
    const paymentOnCheckIn = total - prepayment;

    useEffect(() => {
        authService.getInfo()
            .then((data) => setUser(data))
            .catch((err) => {
                toast.error("Ошибка получения пользователя:", err);
            });
    }, []);

    const handleConfirm = async () => {
        if (!booking || !user.userId) {
            toast.error("Недостаточно данных для бронирования");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("propertyId", booking.propertyId);
            formData.append("renterId", user.userId);
            formData.append("startDate", booking.startDate);
            formData.append("endDate", booking.endDate)
            formData.append("costInPeriod", property.cost);
            formData.append("longTermRent", booking.longTermRent);

            await reservationService.create(formData);

            toast.success("Бронирование успешно создано!");
            navigate("/bookings");
        } catch (error) {
            toast.error("Ошибка бронирования, попробуйте позже");
        }
    };

    if (!booking || !booking.property) {
        return <div>Данные бронирования не найдены</div>;
    }

    return (
        <div className="booking-confirmation">
            <HeadWithText props="Подтверждение бронирования" />
            <BookingCard property={property} isBookingConfirmationPage={true}/>

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
                    <span>{Math.round(commission)}₽</span>
                </div>
            </div>

            <div className="summarize">
                <div className="summarize_item-sum">
                    <span>Итого</span>
                    <span>{Math.round(total)}₽</span>
                </div>
                <div className="summarize_item">
                    <span>Предоплата</span>
                    <span>{Math.round(prepayment)}₽</span>
                </div>
                <div className="summarize_item">
                    <span>Оплата при заселении</span>
                    <span>{Math.round(paymentOnCheckIn)}₽</span>
                </div>
            </div>

            <BigBlueButton props="Подтвердить бронирование" fix="fixed" onClick={handleConfirm} />
        </div>
    );
};
export default BookingConfirmation;