import React from "react";
import { Link } from "react-router-dom";
import "./BottomNavigation.css";
import { House } from "lucide-react";
import { Heart } from "lucide-react";
import { Calendar1 } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { User } from "lucide-react";

const BottomNavigation = () => {
  return (
    <div className="bottom-navigation">
      <Link to="/" className="nav-item" aria-label="Главная">
        <House className="icon" />
        <span>Главная</span>
      </Link>
      <Link to="/favorites" className="nav-item" aria-label="Избранное">
        <Heart className="icon" />
        <span>Избранное</span>
      </Link>
      <Link to="/bookings" className="nav-item" aria-label="Мои брони">
        <Calendar1 className="icon" />
        <span>Мои брони</span>
      </Link>
      <Link to="/create" className="nav-item" aria-label="Создать жилье">
        <SquarePlus className="icon" />
        <span>Сдать жилье</span>
      </Link>
      <Link to="/profile" className="nav-item" aria-label="Профиль">
        <User className="icon" />
        <span>Профиль</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;