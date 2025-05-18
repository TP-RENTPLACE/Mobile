import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './DestinationInput.css';
import HeadWithText from '../components/HeadWithText';
import { MapPin } from 'lucide-react';
import BigBlueButton from '../components/BigBlueButton';

const DestinationInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Пример списка городов
  const allCities = [
    'Москва', 'Санкт-Петербург', 'Сочи', 'Калининград', 
    'Казань', 'Краснодар', 'Нижний Новгород', 'Екатеринбург',
    'Владивосток', 'Новосибирск', 'Ростов-на-Дону', 'Самара'
  ];

  // Фильтруем города по введенному запросу
  const filteredCities = allCities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Популярные города (можно вынести в конфиг)
  const popularCities = ['Москва', 'Санкт-Петербург', 'Сочи', 'Казань'];

  return (
    <div className="destination-block">
      <HeadWithText props="Куда отправимся?" />
      
      <div className="search-block">
        {/* <Search size={20} className="search-icon" /> */}
        <input
          type="text"
          placeholder="Введите город"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="cities-section">
        {searchQuery ? (
          <>
            <h4>Найденные города</h4>
            {filteredCities.length > 0 ? (
              <div className="cities-grid">
                {filteredCities.map((city, index) => (
                  <div 
                    key={index} 
                    className="city-tag"
                    onClick={() => setSearchQuery(city)}
                  >
                    <MapPin/>
                    {city}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">Ничего не найдено</p>
            )}
          </>
        ) : (
          <>
            <h4>Популярные направления</h4>
            <div className="cities-grid">
              {popularCities.map((city, index) => (
                <div 
                  key={index} 
                  className="city-tag"
                  onClick={() => setSearchQuery(city)}
                >
                  <MapPin/>
                  {city}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* <BigBlueButton fix="fixed" bottom="bottom" props="Поиск" /> */}
    </div>
  );
};

export default DestinationInput;