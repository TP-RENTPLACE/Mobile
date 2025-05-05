import React, { useRef, useState } from "react";
import "./CreateAdGallery.css";
import { Trash2 } from 'lucide-react';
import { Camera } from 'lucide-react';

const CreateAdGallery = ({ onChange }) => {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleAddImage = (e) => {
        const newFiles = Array.from(e.target.files);
        const updated = [...files, ...newFiles];

        setFiles(updated);
        if (onChange) onChange(updated);
    };

    const handleDeleteImage = (index) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        if (onChange) onChange(updated);
    };

    return (
        <div className="image-gallery">
            <div className="gallery-grid">
                {files.map((file, index) => (
                    <div key={index} className="image-card">
                        <img src={URL.createObjectURL(file)} alt={`img-${index}`} className="image" />
                        <Trash2
                            className="delete-button"
                            onClick={() => handleDeleteImage(index)}
                        >
                            Удалить
                        </Trash2>
                    </div>
                ))}
                {/* Кнопка "Добавить фото" */}
            <div
                className="add-image-button"
                onClick={() => fileInputRef.current.click()}
            >
                <Camera/>
                <span>Добавить фото</span>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleAddImage}
                    style={{ display: "none" }}
                />
            </div>
            </div>

            
        </div>
    );
};

export default CreateAdGallery;