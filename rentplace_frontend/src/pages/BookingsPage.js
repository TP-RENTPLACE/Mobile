import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import RecentFirst from "../components/RecentFirst";
import Categories from "../components/Categories";
import "./BookingsPage.css";
import BottomNavigation from "../components/BottomNavigation";
import BookingCard from "../components/BookingCard";
import ReservationService from "../api/reservationService";

const BookingsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        ReservationService.getMy()
            .then((data) => {
                setReservations(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка загрузки бронирований:", err);
                setError("Не удалось загрузить бронирования");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Загрузка...</div>;

    return (
        <>
            <div className="booking">
                <Header />
                <RecentFirst />
                <Categories />
                <div>{error}</div>
                <div className="cards_container">
                    {reservations.map((reservation) => (
                        <BookingCard
                            property={reservation.propertyDTO}
                        />
                    ))}
                </div>
            </div>
            <BottomNavigation />
        </>
    );
};

export default BookingsPage;