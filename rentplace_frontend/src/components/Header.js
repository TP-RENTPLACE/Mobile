import React, {useEffect, useState} from "react";
import {useLocation, Link} from "react-router-dom";
import "./Header.css";
import userService from "../api/userService";
import authService from "../api/authService";
import defaultImage from "../assets/Avatar.png";

const Header = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const token = localStorage.getItem("accessToken");

                    if (!token || token === "null") {
                        setIsLoggedIn(false);
                        setLoading(false);
                        return;
                    }

                    const authInfo = await authService.getInfo();
                    const user = await userService.getById(authInfo.userId);

                    setUserData(user);
                    setIsLoggedIn(true);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    setIsLoggedIn(false);
                } finally {
                    setLoading(false);
                }
            };

            checkAuth();
        }, [location]);

        const getHeaderText = () => {
            switch (location.pathname) {
                case "/":
                    return "rentplace";
                case "/favorites":
                    return "Избранное";
                case "/bookings":
                    return "Мои брони";
                case "/create":
                    return "Сдать жилье";
                case "/profile":
                    return "Профиль";
                default:
                    return "Rentplace";
            }
        };

        const renderProfileSection = () => {
            if (loading) return <div className="avatar-loader"></div>;
            if (location.pathname === "/profile") return null;

            return (
                <Link to="/profile" className="profile-link">
                    {isLoggedIn && userData?.imageDTO?.url ? (
                        <img
                            src={userData.imageDTO.url || defaultImage}
                            alt={defaultImage}
                            onError={(e) => {
                                e.target.src = '/images/default-avatar.png';
                            }}
                        />
                    ) : (
                        <img src={defaultImage} alt="Image" />
                    )}
                </Link>
            );
        };

        return (
            <div className="upper_header">
                <div className="logo">
                    <img src="./images/rentplace.svg" alt="Rentplace Logo"/>
                    <span className="header-text">{getHeaderText()}</span>
                </div>
                <div className="profile">
                    {renderProfileSection()}
                </div>
            </div>
        );
    }
;

export default Header;