import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import BigBlueButton from "../components/BigBlueButton";
import HeadWithText from "../components/HeadWithText";
import CreateAdGallery from "../components/CreateAdGallery";
import {toast} from "react-hot-toast";

const CreateStep3 = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const previousData = location.state || {};
    const [images, setImages] = useState([]);

    const handleNext = () => {
        if (images.length < 3) {
            toast.error("Минимум 3 фотографии");
            return;
        }

        const allData = {
            ...previousData,
            images,
        };

        navigate("/create-ad/step4", {state: allData});
    };

    return (
        <div className="create-ad-container">
            <HeadWithText props="Новое объявление"/>
            <p>Добавьте фотографии жилья</p>
            <CreateAdGallery onChange={setImages}/>
            <BigBlueButton props="Далее" fix="fixed" onClick={handleNext}/>
        </div>
    );
};

export default CreateStep3;