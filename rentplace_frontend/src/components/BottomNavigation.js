import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./BottomNavigation.css";
import { House, Heart, Calendar1, SquarePlus, User } from "lucide-react";

const BottomNavigation = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="bottom-navigation">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }
                end
            >
                <House className="icon" />
                <span>Главная</span>
            </NavLink>
            <NavLink
                to="/favorites"
                className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }
            >
                <Heart className="icon" />
                <span>Избранное</span>
            </NavLink>
            <NavLink
                to="/bookings"
                className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }
            >
                <Calendar1 className="icon" />
                <span>Мои брони</span>
            </NavLink>
            <NavLink
                to="/create"
                className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }
            >
                <SquarePlus className="icon" />
                <span>Сдать жилье</span>
            </NavLink>
            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                }
            >
                <User className="icon" />
                <span>Профиль</span>
            </NavLink>
        </div>
    );
};

export default BottomNavigation;