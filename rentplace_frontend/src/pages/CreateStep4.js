import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import HeadWithText from "../components/HeadWithText";
import "./CreateStep4.css";
import BigBlueButton from "../components/BigBlueButton";
import {toast} from "react-hot-toast";
import {generateDescriptionFromAI} from "../api/aiService";
import {getAllCategories} from "../store/allCategories";
import {getAllFacilities} from "../store/allFacilities";

const DESCRIPTION_MAX_LENGTH = 2000;
const MIN_COST = 1;

const CreateStep4 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousData = location.state || {};
    const [loadingAI, setLoadingAI] = useState(false);

    const [formData, setFormData] = useState({
        description: "",
        longTermRent: true,
        cost: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRentTypeChange = (isMonthly) => {
        setFormData((prev) => ({
            ...prev,
            longTermRent: isMonthly,
        }));
    };

    const generateDescription = async () => {
        if (!formData.cost || isNaN(Number(formData.cost))) {
            toast.error("Пожалуйста, укажите корректную стоимость перед генерацией описания");
            return;
        }

        setLoadingAI(true);
        try {
            const allCategories = await getAllCategories();
            const allFacilities = await getAllFacilities();

            const selectedCategoryNames = (previousData.categories || [])
                .map((id) => {
                    const found = allCategories.find((cat) => Number(cat.id) === Number(id));
                    return found?.name;
                })
                .filter(Boolean);

            const selectedFacilityNames = (previousData.facilities || [])
                .map((id) => {
                    const found = allFacilities.find((f) => Number(f.id) === Number(id));
                    return found?.name;
                })
                .filter(Boolean);

            const promptLines = [
                `Название: ${previousData.title}`,
                `Адрес: ${previousData.address}`,
                `Категории: ${selectedCategoryNames.join(", ")}`,
                `Площадь: ${previousData.area} м²`,
                `Максимум гостей: ${previousData.maxGuests}`,
                `Комнаты: ${previousData.rooms}`,
                `Спальни: ${previousData.bedrooms}`,
                `Кровати: ${previousData.sleepingPlaces}`,
                `Удобства: ${selectedFacilityNames.join(", ")}`,
                `Цена: ${formData.cost} ₽ ${formData.longTermRent ? "в месяц" : "в сутки"}`
            ];

            const userPrompt = promptLines.join("\n");

            const formDataToSend = new FormData();
            formDataToSend.append("userPrompt", userPrompt);

            const aiResponse = await generateDescriptionFromAI(formDataToSend);

            if (aiResponse?.generatedDescription) {
                setFormData((prev) => ({
                    ...prev,
                    description: aiResponse.generatedDescription,
                }));
            } else {
                toast.error("AI не вернул описание");
            }
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при генерации описания");
        } finally {
            setLoadingAI(false);
        }
    };

    const validate = () => {
        const errors = [];
        const {description, cost} = formData;

        if (!description.trim()) {
            errors.push("Описание обязательно");
        } else if (description.length > DESCRIPTION_MAX_LENGTH) {
            errors.push(`Описание не должно превышать ${DESCRIPTION_MAX_LENGTH} символов`);
        }

        if (!cost || isNaN(Number(cost))) {
            errors.push("Укажите корректную цену");
        } else if (Number(cost) < MIN_COST) {
            errors.push("Цена должна быть положительной");
        }

        if (errors.length > 0) {
            toast.error(errors.join("\n"));
            return false;
        }

        return true;
    };

    const handleNext = () => {
        if (!validate()) return;

        console.log("Данные шага 4:", formData);
        const allData = {
            ...previousData,
            ...formData,
        };

        navigate("/create-ad/step5", {state: allData});
    };

    return (
        <div className="create-ad-container">
            <HeadWithText props="Новое объявление"/>
            <p>Составьте описание и укажите цену</p>

            <label>
                <span>Описание</span>
                <textarea
                    name="description"
                    placeholder="Составьте или сгенерируйте описание для вашего жилья"
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength={DESCRIPTION_MAX_LENGTH}
                />
            </label>

            <BigBlueButton
                props={loadingAI ? "Генерация..." : "Сгенерировать описание с помощью AI"}
                inverted="inverted"
                fullwidth="fullwidth"
                onClick={generateDescription}
                disabled={loadingAI}
            />

            <label>
                <span>Арендная плата, ₽</span>
                <div className="rent-price">
                    <button
                        className={!formData.longTermRent ? "active" : ""}
                        onClick={() => handleRentTypeChange(false)}
                    >
                        За сутки
                    </button>
                    <button
                        className={formData.longTermRent ? "active" : ""}
                        onClick={() => handleRentTypeChange(true)}
                    >
                        В месяц
                    </button>
                </div>
                <input
                    type="number"
                    name="cost"
                    placeholder="Укажите сумму"
                    value={formData.cost}
                    onChange={handleInputChange}
                    onWheel={(e) => e.target.blur()}
                />
            </label>

            <BigBlueButton props="Далее" fix="fixed" onClick={handleNext}/>
        </div>
    );
};

export default CreateStep4;