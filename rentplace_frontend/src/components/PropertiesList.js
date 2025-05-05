import React, {useEffect, useState} from 'react';
import PropertyCard from './PropertyCard';
import './PropertiesList.css';
import PropertyService from "../api/propertyService";

const PropertiesList = () => {
const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  PropertyService.getAll()
      .then((data) => {
        const publishedProperties = data.filter(
            property => property.propertyStatus === "PUBLISHED"
        );
        setProperties(publishedProperties)
      })
      .catch((err) => console.error('Ошибка при загрузке:', err));
}, []);

if (error) return <div>{error}</div>;

  return (
    <div className="properties-list">
      {properties.map((property) => (
        <PropertyCard key={property.propertyId} property={property} />
      ))}
    </div>
  );
};

export default PropertiesList;