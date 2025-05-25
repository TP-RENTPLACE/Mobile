import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import RecentFirst from "../components/RecentFirst";
import Categories from "../components/Categories";
import "./BookingsPage.css";
import BottomNavigation from "../components/BottomNavigation";
import BookingCard from "../components/BookingCard";
import ReservationService from "../api/reservationService";
import BigBlueButton from "../components/BigBlueButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { sendMetrik } from "../utils/metrics";

const BookingsPage = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleAuthRedirect = () => {
        navigate('/auth/email');
    };

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("accessToken");
            const isValidToken = Boolean(token && token !== "null" && token !== "undefined");
            setIsLoggedIn(isValidToken);
        };

        checkAuth();
    }, []);


    useEffect(() => {
        if (!isLoggedIn) {
            setLoading(false);
            return;
        }

        ReservationService.getMy()
            .then((data) => {
                setReservations(data);
                setLoading(false);
            })
            .catch((err) => {
                toast.error("Ошибка загрузки бронирований:", err);
                setLoading(false);
            });
    }, [isLoggedIn]);

    const renderContent = () => {
        if (!isLoggedIn) {
            return (
                <>
                    <div className="cards_container empty">
                        <p>Войдите или зарегистрируйтесь, чтобы получить доступ к своим броням</p>
                        <BigBlueButton props="Войти/Зарегистрироваться" fix="fixed" onClick={() => {
                            sendMetrik('reachGoal', 'click_login_register_button');
                            handleAuthRedirect()
                        }} />
                    </div>
                </>

            );
        }

        if (loading) return <div className="loader">Загрузка...</div>;

        return reservations.length > 0 ? (
            <>
                <div className="cards_container">
                    {reservations.map((reservation) => (
                        <BookingCard
                            key={reservation.reservationId}
                            property={reservation.propertyDTO}
                            reservation={reservation}
                            isBookingConfirmationPage={false}
                        />
                    ))}
                </div>
                <div className="bott"></div>

            </>
        ) : (
            <div className="cards_container empty">
                <p>У вас нет активных бронирований</p>
            </div>
        );
    };

    return (
        <>
            <div className="booking">
                <Header />
                <RecentFirst />
                <Categories />
                {renderContent()}
                <div className="bott"></div>
            </div>
        </>
    );
};

export default BookingsPage;