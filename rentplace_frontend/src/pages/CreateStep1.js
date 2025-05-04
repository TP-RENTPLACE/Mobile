import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import "./CreateStep1.css";
import BigBlueButton from "../components/BigBlueButton";
import { getAllCategories } from "../store/allCategories";

const CreateStep1 = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        getAllCategories().then(setCategories).catch(console.error);
    }, []);

    const toggleCategory = (id) => {
        const numericId = Number(id); // 👈 обязательно!
        setSelectedIds((prev) => {
            if (prev.includes(numericId)) {
                return prev.filter((item) => item !== numericId);
            } else if (prev.length < 5) {
                return [...prev, numericId];
            } else {
                return prev;
            }
        });
    };


    const handleNext = () => {
        if (selectedIds.length === 0) {
            alert("Выберите хотя бы одну категорию");
            return;
        }

        console.log("Выбранные ID:", selectedIds);
        navigate("/create-ad/step2", {state: {categories: selectedIds}});
    };

    return (
        <div className="create-ad-container">
            <HeadWithText props="Новое объявление" />
            <p>Выберите наиболее подходящую категорию для вашего жилья</p>

            <div className="list">
                {categories.map((category) => {
                    const isActive = selectedIds.includes(Number(category.id));
                    return (
                        <div
                            key={category.id}
                            className={`item ${isActive ? "active" : ""}`}
                            onClick={() => toggleCategory(category.id)}
                        >
                            <img src={category.imageUrl} alt={category.id} />
                            <span>{category.name}</span>
                        </div>
                    );
                })}
            </div>

            <BigBlueButton props="Далее" fix="fixed" onClick={handleNext} />
        </div>
    );
};

export default CreateStep1;