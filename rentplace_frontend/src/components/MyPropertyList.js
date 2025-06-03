import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import PropertyService from "../api/propertyService";
import "./PropertiesList.css";
import Skeleton from "react-loading-skeleton";

const MyPropertyList = ({ filterStatus }) => {
    const [allProperties, setAllProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        PropertyService.getMy()
            .then(setAllProperties)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filtered = allProperties.filter((p) => p.propertyStatus === filterStatus);

    if (loading)
        return (
        <div className="cards_container empty">
            <Skeleton height={150} borderRadius={8} />
            <Skeleton count={2} height={20} />
        </div>
    );

    if (!filtered.length && filterStatus === "PUBLISHED")
        return (
            <div className="cards_container empty">
                <p>У вас нет активных объявлений о сдаче жилья</p>
            </div>
        );

    if (!filtered.length && filterStatus === "ON_MODERATION")
        return (
            <div className="cards_container empty">
                <p>У вас нет активных объявлений на рассмотрении</p>
            </div>
        );

    return (
        <div className="properties-list">
            {filtered.map((property) => (
                <PropertyCard key={property.propertyId} property={property} />
            ))}
        </div>
    );
};

export default MyPropertyList;