import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="property-card">
      <div className="property-image-container">
        <img src={property.image} alt={property.title} className="property-image" />
        <button className={`favorite-button ${isFavorite ? 'active' : ''}`} onClick={handleToggleFavorite}>
          <img src="/heart.png" alt="Favorite" />
        </button>
      </div>
      <div className="property-details">
        <h3 className="property-title">{property.title}</h3>
        <div className="rating">
          <img src="/star.png" alt="Star" />
          <span>{property.rating} ({property.reviews})</span>
        </div>
        <p className="property-description">
          {property.area} м² · {property.guests} гостей · {property.bedrooms} спальни · {property.beds} кровати
        </p>
        <div className="property-address">
          <img src="/location.png" alt="Location" />
          <span>{property.address}</span>
        </div>
        <div className="property-price">
          <span>{property.price} ₽ за сутки</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;