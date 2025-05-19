import React, { useRef, useState } from "react";
import "./CreateAdGallery.css";
import { Trash2 } from 'lucide-react';
import { Camera } from 'lucide-react';
import {toast} from "react-hot-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const MAX_TOTAL_FILES = 20;

const CreateAdGallery = ({ onChange }) => {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleAddImage = (e) => {
        const newFiles = Array.from(e.target.files);
        const validFiles = [];
        const errors = [];

        if (files.length + newFiles.length > MAX_TOTAL_FILES) {
            toast.error(`Максимум ${MAX_TOTAL_FILES} фотографий`);
            e.target.value = null;
            return;
        }

        newFiles.forEach(file => {
            if (!ALLOWED_TYPES.includes(file.type)) {
                errors.push(`Файл ${file.name}: только JPEG и PNG`);
            } else if (file.size > MAX_FILE_SIZE) {
                errors.push(`Файл ${file.name}: превышает 5MB`);
            } else {
                validFiles.push(file);
            }
        });

        if (errors.length > 0) {
            toast.error(errors.join("\n"));
        }

        const updated = [...files, ...validFiles];
        setFiles(updated);
        if (onChange) onChange(updated);
        e.target.value = null;
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