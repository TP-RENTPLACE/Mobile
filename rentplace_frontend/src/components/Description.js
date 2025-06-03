import React, { useState } from "react";
import "./Description.css";

const MAX_LENGTH = 300; 

const Description = ({ property }) => {
    const [showFull, setShowFull] = useState(false);
    const description = property?.description || "";

    const isLong = description.length > MAX_LENGTH;

    const toggleShow = () => {
        setShowFull((prev) => !prev);
    };

    return (
        <div className="description">
            <h1>Описание</h1>
            <span>
                {isLong && !showFull
                    ? description.slice(0, MAX_LENGTH) + "..."
                    : description}
            </span>
            {isLong && (
                <div className="showMore" onClick={toggleShow}>
                    {showFull ? "Скрыть" : "Показать полностью"}
                </div>
            )}
        </div>
    );
};

export default Description;