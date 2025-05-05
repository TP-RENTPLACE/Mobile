import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import PropertyService from "../api/propertyService";
import "./PropertiesList.css";

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

    if (loading) return <div>Загрузка...</div>;
    if (!filtered.length) return <div style={{ padding: 20 }}>Нет объявлений</div>;

    return (
        <div className="properties-list">
            {filtered.map((property) => (
                <PropertyCard key={property.propertyId} property={property} />
            ))}
        </div>
    );
};

export default MyPropertyList;