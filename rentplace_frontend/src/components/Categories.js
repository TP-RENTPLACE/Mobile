import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CategoryService from "../api/categoryService";
import "./Categories.css";
import { CheckCheck, Archive, Clock } from "lucide-react";
import { loadSelectedCategories, saveSelectedCategories } from "../store/categoryStorage";

const STATIC_CATEGORIES = {
  "/bookings": [
    { id: "active", name: "Активные", icon: <CheckCheck className="icon" /> },
    { id: "past", name: "Прошедшие брони", icon: <Archive className="icon" /> },
  ],
  "/create": [
    { id: "PUBLISHED", name: "Активные", icon: <CheckCheck className="icon" /> },
    { id: "ON_MODERATION", name: "На рассмотрении", icon: <Clock className="icon" /> },
  ],
};

const Categories = ({ onCategoryChange }) => {
  const location = useLocation();
  const path = location.pathname;

  const isMultiSelect = path === "/" || path === "/favorites";
  const isStatic = STATIC_CATEGORIES[path] !== undefined;

  const { data: dynamicCategories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getAll(),
    staleTime: Infinity,
    enabled: isMultiSelect,
  });

  const categories = isStatic
      ? STATIC_CATEGORIES[path]
      : dynamicCategories.map((cat) => ({
        id: cat.categoryId,
        name: cat.name,
        imageUrl: cat.imageDTO?.url || "",
      }));

  const [activeCategoryIds, setActiveCategoryIds] = useState(() => {
    return loadSelectedCategories();
  });

  useEffect(() => {
    if (!isMultiSelect && categories.length > 0 && activeCategoryIds.length === 0) {
      const firstId = categories[0].id;
      setActiveCategoryIds([firstId]);
      if (!isStatic) {
        saveSelectedCategories([firstId]);
      }
    }
  }, [categories, isMultiSelect, activeCategoryIds.length]);

  useEffect(() => {
    if (!isMultiSelect && activeCategoryIds.length > 0) {
      onCategoryChange?.(activeCategoryIds[0]);
    } else if (isMultiSelect) {
      onCategoryChange?.(activeCategoryIds);
    }
  }, [activeCategoryIds, isMultiSelect, onCategoryChange]);

  const handleCategoryClick = (categoryId) => {
    if (isMultiSelect) {
      setActiveCategoryIds((prev) => {
        const isActive = prev.includes(categoryId);
        const updated = isActive
            ? prev.filter((id) => id !== categoryId)
            : [...prev, categoryId];
        saveSelectedCategories(updated);
        return updated;
      });
    } else {
      if (!activeCategoryIds.includes(categoryId)) {
        const updated = [categoryId];
        setActiveCategoryIds(updated);
        if (!isStatic) {
          saveSelectedCategories(updated);
        }
      }
    }
  };

  return (
      <div className="categories">
        {categories.map((category) => (
            <span
                key={category.id}
                className={`category ${activeCategoryIds.includes(category.id) ? "active" : ""}`}
                onClick={() => handleCategoryClick(category.id)}
            >
          {category.icon ? (
              category.icon
          ) : (
              <img
                  src={category.imageUrl || 1}
                  alt={category.id}
                  className="category-image"
              />
          )}
              <span>{category.name}</span>
        </span>
        ))}
      </div>
  );
};

export default Categories;