import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Categories from "../components/Categories";
import RecentFirst from "../components/RecentFirst";
import BigBlueButton from "../components/BigBlueButton";
import { useNavigate } from "react-router-dom";
import FavoritesList from "../components/FavoritesList";
import "./FavoritesPage.css"
import { sendMetrik } from "../utils/metrics";

const FavoritesPage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleAuthRedirect = () => {
        navigate('/auth/email');
    };

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("accessToken");
            const isValidToken = Boolean(token && token !== "null" && token !== "undefined");
            setIsLoggedIn(isValidToken);
            setLoading(false);
        };
        checkAuth();
    }, []);


    const renderContent = () => {
        if (loading) return <div className="loader">Загрузка...</div>;

        if (!isLoggedIn) {
            return (
                <div className="cards_container empty">
                    <p>Войдите или зарегистрируйтесь, чтобы получить доступ к избранным объявлениям</p>
                    <BigBlueButton props="Войти/Зарегистрироваться" fix="fixed" onClick={() => {
                        sendMetrik('reachGoal', 'click_login_register_button');
                        handleAuthRedirect()
                    }} />
                </div>
            );
        }

        return (
            <>
                <RecentFirst></RecentFirst>
                <Categories></Categories>
                <div className="cards_container">
                    <FavoritesList />
                </div>
            </>
        );
    };


    return (
        <>
            <div className="home-container">
                <Header></Header>
                {renderContent()}
            </div>
        </>
    );
};

export default observer(FavoritesPage);