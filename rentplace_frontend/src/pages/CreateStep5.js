import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import BigBlueButton from "../components/BigBlueButton";
import PropertyService from "../api/propertyService";
import authService from "../api/authService";

const CreateStep5 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const formDataAllSteps = location.state;
    const [ownerId, setOwnerId] = useState(null);

    useEffect(() => {
        authService
            .getInfo()
            .then((user) => {
                setOwnerId(user.userId);
            })
            .catch((error) => {
                console.error("Ошибка получения пользователя:", error);
                alert("Ошибка авторизации. Пожалуйста, войдите заново.");
                navigate("/auth/email");
            });
    }, [navigate]);

    const handleDone = async () => {
        try {
            if (!formDataAllSteps) {
                alert("Данные не найдены");
                return;
            }

            // Создаём объект FormData
            const formData = new FormData();

            // Шаг 1: Категории (array of IDs)
            formDataAllSteps.categories.forEach((id) => formData.append("categoryIds", id));

            // Шаг 2: Основная информация
            formData.append("title", formDataAllSteps.title);
            formData.append("address", formDataAllSteps.address);
            formData.append("area", formDataAllSteps.area);
            formData.append("maxGuests", formDataAllSteps.maxGuests);
            formData.append("rooms", formDataAllSteps.rooms);
            formData.append("bedrooms", formDataAllSteps.bedrooms);
            formData.append("sleepingPlaces", formDataAllSteps.sleepingPlaces);

            // Удобства
            formDataAllSteps.facilities.forEach((id) =>
                formData.append("facilityIds", id)
            );

            // Шаг 3: Фотографии (files[])
            formDataAllSteps.images.forEach((file) =>
                formData.append("images", file)
            );

            // Шаг 4: Описание и цена
            formData.append("description", formDataAllSteps.description);
            formData.append("cost", formDataAllSteps.cost);
            formData.append("longTermRent", formDataAllSteps.longTermRent);

            formData.append("propertyStatus", "ON_MODERATION");
            formData.append("ownerId", ownerId);
            formData.append("bathrooms", 1);


            await PropertyService.create(formData);

            alert("Объявление успешно создано!");
            navigate("/");
        } catch (error) {
            console.error("Ошибка при создании:", error);
            alert("Произошла ошибка при отправке. Попробуйте снова.");
        }
    };

    return (
        <div className="create-ad-container">
            <HeadWithText props="Новое объявление" />
            <div className="center">
                <p>
                    Ваше объявление отправлено на рассмотрение. В течение 7 рабочих дней
                    мы уведомим вас о его статусе.
                </p>
                <p>Спасибо, что выбрали rentplace!</p>
            </div>

            <BigBlueButton props="Готово" fix="fixed" onClick={handleDone} />
        </div>
    );
};

export default CreateStep5;