import React from 'react';
import PropertyCard from './PropertyCard';
import './PropertiesList.css';

const propertiesData = [
  {
    id: 1,
    image: './images/property1.png',
    title: 'Вилла с панорамным видом',
    rating: 4.96,
    reviews: 217,
    area: 360,
    guests: 6,
    bedrooms: 3,
    beds: 3,
    address: 'Лоо, Таллинская улица, 93',
    price: '59 000',
  },
  {
    id: 1,
    image: './images/property2.png',
    title: 'Вилла с хорошим видом',
    rating: 4.96,
    reviews: 217,
    area: 360,
    guests: 6,
    bedrooms: 3,
    beds: 3,
    address: 'Лоо, Таллинская улица, 93',
    price: '59 000',
  },
  {
    id: 1,
    image: './images/property2.png',
    title: 'Вилла с хорошим видом',
    rating: 4.96,
    reviews: 217,
    area: 360,
    guests: 6,
    bedrooms: 3,
    beds: 3,
    address: 'Лоо, Таллинская улица, 93',
    price: '59 000',
  },
];

const PropertiesList = () => {
  return (
    <div className="properties-list">
      {propertiesData.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertiesList;