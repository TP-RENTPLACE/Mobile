import React, {useEffect, useState} from "react";
import PropertiesList from "../components/PropertiesList";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import "./HomePage.css";
import BottomNavigation from "../components/BottomNavigation";
import {useLocation} from "react-router-dom";
import {loadSelectedCategories, saveSelectedCategories} from "../store/categoryStorage";

const HomePage = () => {
    const location = useLocation();
    const filtersFromLocation = location.state?.filters || {};
    const [selectedCategoryIds, setSelectedCategoryIds] = useState(loadSelectedCategories());

    useEffect(() => {
        const saved = loadSelectedCategories();
        setSelectedCategoryIds(saved);
    }, []);

    const handleCategoryChange = (ids) => {
        setSelectedCategoryIds(ids);
        saveSelectedCategories(ids);
    };

    const hasCategoryFilters = selectedCategoryIds.length > 0;
    const hasAnyFilters =
        hasCategoryFilters ||
        Object.values(filtersFromLocation).some((v) =>
            Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined
        );

    const combinedFilters = hasAnyFilters
        ? {
            ...filtersFromLocation,
            ...(hasCategoryFilters ? { categoryIds: selectedCategoryIds } : {}),
        }
        : null;

    return (
        <div className="home-container">
            <Header/>
            <SearchBar/>
            <Categories onCategoryChange={handleCategoryChange} />
            <PropertiesList filters={combinedFilters}/>
            <BottomNavigation/>
        </div>
    );
};

export default HomePage;