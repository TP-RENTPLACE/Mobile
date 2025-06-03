import React, { useState } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return <div className="image-slider">Нет изображений</div>;
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="image-slider">
            <button className="nav-button left" onClick={goToPrev}>
                ❮
            </button>
            <img
                src={images[currentIndex].url}
                alt={`Фото ${currentIndex + 1}`}
                className="slider-image"
            />
            <button className="nav-button right" onClick={goToNext}>
                ❯
            </button>
            <div className="image-counter">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
};

export default ImageSlider;