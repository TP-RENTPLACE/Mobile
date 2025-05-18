import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { toast } from "react-hot-toast";
import FavoritesService from "../api/favoritesService";
import './PropertiesList.css';

const FavoritesList = () => {
    const [favorites, setFavorites] = useState([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await FavoritesService.getAll();
                setFavorites(response);
                setNoResults(response.length === 0);
            } catch (err) {
                toast.error("Ошибка при загрузке избранных объявлений");
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="properties-list">
            {noResults ? (
                <div className="no-results">
                    <p>У вас нет избранных объявлений.</p>
                </div>
            ) : (
                favorites.map((property) => (
                    <PropertyCard key={property.propertyId} property={property} />
                ))
            )}
        </div>
    );
};

export default FavoritesList;