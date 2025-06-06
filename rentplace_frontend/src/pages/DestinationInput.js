import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import "./DestinationInput.css";
import HeadWithText from "../components/HeadWithText";
import BigBlueButton from "../components/BigBlueButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const MIN_QUERY_LENGTH = 2;

const DestinationInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});
  const navigate = useNavigate();

  const popularCities = ["Москва", "Санкт-Петербург", "Сочи", "Казань"];

  useEffect(() => {
    const storedAddress = localStorage.getItem("searchAddress") || "";
    setSearchQuery(storedAddress);

    if (storedAddress.length >= MIN_QUERY_LENGTH) {
      void fetchSuggestions(storedAddress);
    }
  }, []);

  const fetchSuggestions = async (query) => {
    const encodedQuery = encodeURIComponent(query);

    if (encodedQuery in cache) {
      setSuggestions(cache[encodedQuery]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://geocode-maps.yandex.ru/v1/?apikey=e0bb9270-d90c-43c9-871b-b084b6db3402&geocode=${encodeURIComponent(
          query
        )}&lang=ru_RU&format=json`
      );
      const data = await response.json();

      const filteredSuggestions =
        data.response.GeoObjectCollection.featureMember
          .filter((item) => {
            const countryCode =
              item.GeoObject.metaDataProperty.GeocoderMetaData.Address
                .country_code;
            return countryCode === "RU";
          })
          .map((item) => {
            const address =
              item.GeoObject.metaDataProperty.GeocoderMetaData.Address
                .formatted;
            const addressWithoutCountry = address.replace(/^Россия, /, "");
            return { ...item, addressWithoutCountry };
          });

      setCache((prevCache) => ({
        ...prevCache,
        [encodedQuery]: filteredSuggestions,
      }));
      setSuggestions(filteredSuggestions);
    } catch (error) {
      toast.error("Ошибка при запросе данных:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= MIN_QUERY_LENGTH) {
      void fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const handlePopularCityClick = (city) => {
    setSearchQuery(city);
    void fetchSuggestions(city);
  };

  return (
    <div className="destination-block">
      <HeadWithText props="Куда отправимся?" />

      <div className="search-block">
        <input
          type="text"
          placeholder="Введите город, улицу, район"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>

      <div className="cities-section">
        {searchQuery ? (
          <>
            <h4>Найденные места</h4>
            {loading ? (
              <p>Загрузка...</p>
            ) : suggestions.length > 0 ? (
              <div className="cities-grid">
                {suggestions.map((place, index) => (
                  <div
                    key={index}
                    className="city-tag"
                    onClick={() => setSearchQuery(place.addressWithoutCountry)}
                  >
                    <MapPin className="mapicon" />
                    <span>{place.addressWithoutCountry}</span>
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
                  onClick={() => handlePopularCityClick(city)}
                >
                  <MapPin className="mapicon" />
                  <span>{city}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <BigBlueButton
        fix="fixed"
        // bottom="bottom"
        top={30}
        props="Поиск"
        onClick={() => {
          const trimmed = searchQuery.trim();
          if (trimmed) {
            localStorage.setItem("searchAddress", trimmed);
          } else {
            localStorage.removeItem("searchAddress");
          }
          navigate("/");
        }}
      />
    </div>
  );
};

export default DestinationInput;
