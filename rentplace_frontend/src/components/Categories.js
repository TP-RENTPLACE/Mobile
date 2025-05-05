import React from "react";
import { useLocation } from "react-router-dom";
import "./Categories.css";
import { Building } from "lucide-react";
import { WavesLadder } from "lucide-react";
import { Waves } from "lucide-react";
import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Archive } from "lucide-react";
import { CheckCheck } from "lucide-react";

const Categories = ({ onCategoryChange }) => {
  const location = useLocation();

  const getCategories = () => {
    switch (location.pathname) {
      case "/":
        return [
          { id: 1, name: "Квартиры", icon: <Building className="icon" /> },
          {
            id: 2,
            name: "Дома с бассейном",
            icon: <WavesLadder className="icon" />,
          },
          { id: 3, name: "Рядом с морем", icon: <Waves className="icon" /> },
        ];
        case "/favorites":
        return [
          { id: 4, name: "Квартиры", icon: <Building className="icon" /> },
          {
            id: 5,
            name: "Дома с бассейном",
            icon: <WavesLadder className="icon" />,
          },
          { id: 6, name: "Рядом с морем", icon: <Waves className="icon" /> },
        ];
      case "/bookings":
        return [
          { id: 7, name: "Активные", icon: <CheckCheck className="icon" /> },
          {
            id: 8,
            name: "Прошедшие брони",
            icon: <Archive className="icon" />,
          },
        ];
      case "/create":
        return [
          { id: "PUBLISHED", name: "Активные", icon: <CheckCheck className="icon" /> },
          { id: "ON_MODERATION", name: "На рассмотрении", icon: <Clock className="icon" /> },
        ];
      default:
        return [];
    }
  };

  const categories = getCategories();
  const [activeCategoryId, setActiveCategoryId] = React.useState(
    categories[0]?.id || null
  );

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    if (onCategoryChange) onCategoryChange(categoryId);
  };

  return (
    <div className="categories">
      {categories.map((category) => (
        <span
          key={category.id}
          className={`category ${
            activeCategoryId === category.id ? "active" : ""}`}
            onClick={() => handleCategoryClick(category.id)}
        >
          {category.icon}
          <span>{category.name}</span>
        </span>
      ))}
    </div>
  );
};

export default Categories;