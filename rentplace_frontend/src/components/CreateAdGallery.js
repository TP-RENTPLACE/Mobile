import React, { useState } from "react";
import "./CreateAdGallery.css"; // Ссылка на CSS файл

const CreateAdGallery = () => {
  // Инициализация состояния для хранения изображений
  const [images, setImages] = useState([
    { id: 1, src: "./images/CreateAd1.png" },
    { id: 2, src: "./images/CreateAd1.png" },
  ]);

  // Функция для удаления изображения
  const handleDeleteImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  // Функция для добавления нового изображения (пример)
  const handleAddImage = () => {
    // Здесь можно реализовать логику для загрузки файла через input[type="file"]
    alert("Добавление фото не реализовано в данном примере.");
  };

  return (
    <div className="image-gallery">
      {/* Галерея изображений */}
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.src} alt={`Image ${image.id}`} className="image" />
            <button
              className="delete-button"
              onClick={() => handleDeleteImage(image.id)}
            >
              <i className="fas fa-trash-alt"></i> {/* Иконка корзины */}
            </button>
          </div>
        ))}
      </div>

      {/* Кнопка "Добавить фото" */}
      <div className="add-image-button" onClick={handleAddImage}>
        <i className="fas fa-camera"></i> {/* Иконка камеры */}
        <span>Добавить фото</span>
      </div>
    </div>
  );
};

export default CreateAdGallery;