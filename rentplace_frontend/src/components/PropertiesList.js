import React, {useEffect, useState} from 'react';
import PropertyCard from './PropertyCard';
import './PropertiesList.css';
import PropertyService from "../api/propertyService";
import {toast} from "react-hot-toast";

const PropertiesList = ({ filters = null }) => {
    const [properties, setProperties] = useState([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (filters) {
                    const formData = new FormData();

                    if (filters.sortType) {
                        formData.append("sortType", filters.sortType);
                    }

                    if (filters.isLongTermRent !== undefined) {
                        formData.append("isLongTermRent", String(filters.isLongTermRent));
                    }

                    if (filters.minPrice !== undefined) {
                        formData.append("minPrice", String(filters.minPrice));
                    }

                    if (filters.maxPrice !== undefined) {
                        formData.append("maxPrice", String(filters.maxPrice));
                    }

                    if (filters.guestsAmount !== null && filters.guestsAmount !== undefined) {
                        formData.append("guestsAmount", filters.guestsAmount);
                    }

                    if (filters.bedsAmount !== null && filters.bedsAmount !== undefined) {
                        formData.append("bedsAmount", filters.bedsAmount);
                    }

                    if (filters.bedrooms !== null && filters.bedrooms !== undefined) {
                        formData.append("bedrooms", filters.bedrooms);
                    }

                    if (filters.rooms !== null && filters.rooms !== undefined) {
                        formData.append("rooms", filters.rooms);
                    }

                    if (filters.address) {
                        formData.append("address", filters.address);
                    }

                    if (
                        Array.isArray(filters.categoryIds) &&
                        filters.categoryIds.length > 0 &&
                        filters.categoryIds.every((id) => typeof id === "number")
                    ) {
                        filters.categoryIds.forEach((id) => formData.append("categoryIds", id));
                    }

                    if (Array.isArray(filters.facilityIds) && filters.facilityIds.length > 0) {
                        filters.facilityIds.forEach((id) =>
                            formData.append("facilityIds", id)
                        );
                    }

                    const response = await PropertyService.getFiltered(formData);
                    setProperties(response.filter(p => p.propertyStatus === "PUBLISHED"));
                    setNoResults(response.length === 0);
                } else {
                    const all = await PropertyService.getAll();
                    setProperties(all.filter(p => p.propertyStatus === "PUBLISHED"));
                }
            } catch (err) {
                toast.error("Ошибка при загрузке объявлений");
                console.error(err);
            }
        };

        fetchData();
    }, [filters]);

    return (
        <div className="properties-list">
            {noResults ? (
                <div className="no-results">
                    <p>По выбранным фильтрам ничего не найдено.</p>
                </div>
            ) : (
                properties.map((property) => (
                    <PropertyCard key={property.propertyId} property={property} />
                ))
            )}
        </div>
    );
};

export default PropertiesList;