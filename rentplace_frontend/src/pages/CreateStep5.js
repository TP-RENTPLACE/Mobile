import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import BigBlueButton from "../components/BigBlueButton";
import PropertyService from "../api/propertyService";
import authService from "../api/authService";
import {toast} from "react-hot-toast";

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
                toast.error("Ошибка получения пользователя:", error);
                navigate("/auth/email");
            });
    }, [navigate]);

    const handleDone = async () => {
        try {
            if (!formDataAllSteps) {
                toast.error("Данные не найдены");
                return;
            }

            const formData = new FormData();

            formDataAllSteps.categories.forEach((id) =>
                formData.append("categoriesIds", id.toString())
            );
            formDataAllSteps.facilities.forEach((id) =>
                formData.append("facilitiesIds", id.toString())
            );

            formData.append("title", formDataAllSteps.title);
            formData.append("address", formDataAllSteps.address);
            formData.append("area", formDataAllSteps.area);
            formData.append("maxGuests", formDataAllSteps.maxGuests);
            formData.append("rooms", formDataAllSteps.rooms);
            formData.append("bedrooms", formDataAllSteps.bedrooms);
            formData.append("sleepingPlaces", formDataAllSteps.sleepingPlaces);

            formDataAllSteps.images.forEach((file) =>
                formData.append("files", file, file.name)
            );

            formData.append("description", formDataAllSteps.description);
            formData.append("cost", formDataAllSteps.cost);
            formData.append("longTermRent", formDataAllSteps.longTermRent);

            formData.append("propertyStatus", "ON_MODERATION");
            formData.append("ownerId", ownerId);
            formData.append("bathrooms", 1);


            await PropertyService.create(formData);

            toast.success("Объявление успешно отправлено на рассмотрение!");
            navigate("/");
        } catch (error) {
            toast.error("Ошибка при создании:", error);
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