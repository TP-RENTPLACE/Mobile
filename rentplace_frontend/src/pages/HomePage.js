import React, { useEffect, useState } from "react";
import PropertiesList from "../components/PropertiesList";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import "./HomePage.css";
import BottomNavigation from "../components/BottomNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import { loadSelectedCategories, saveSelectedCategories } from "../store/categoryStorage";

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [filters, setFilters] = useState(location.state?.filters || null);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState(loadSelectedCategories());
    const searchAddress = localStorage.getItem("searchAddress") || "";



    useEffect(() => {
        if (location.state?.filters) {
            setFilters(location.state.filters);
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, location.pathname, navigate]);

    useEffect(() => {
        const saved = loadSelectedCategories();
        setSelectedCategoryIds(saved);
    }, []);

    const handleCategoryChange = (ids) => {
        setSelectedCategoryIds(ids);
        saveSelectedCategories(ids);
    };

    const combinedFilters = {
        ...(filters || {}),
        ...(selectedCategoryIds.length > 0 ? { categoryIds: selectedCategoryIds } : {}),
        ...(searchAddress ? { address: searchAddress } : {}),
    };

    const isEmpty = Object.keys(combinedFilters).length === 0;


    return (
        <div className="home-container">
            <Header />
            <SearchBar />
            <Categories onCategoryChange={handleCategoryChange} />
            <PropertiesList filters={isEmpty ? null : combinedFilters} />
            <BottomNavigation />
        </div>
    );
};

export default HomePage;