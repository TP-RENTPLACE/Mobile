import React from "react";
import { observer } from "mobx-react-lite";
import favoritesStore from "../store/favoritesStore";
import PropertyCard from "../components/PropertyCard";
import Header from "../components/Header";
import Categories from "../components/Categories";
import RecentFirst from "../components/RecentFirst";
import PropertiesList from "../components/PropertiesList";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const isEmpty = favoritesStore.favorites.length === 0;
  return (
    <div className="favorites-page">
      <Header></Header>
      <RecentFirst></RecentFirst>
      <Categories></Categories>
      <div className={`cards_container ${isEmpty ? "empty" : ""}`}>
        {favoritesStore.favorites.length > 0 ? (
          favoritesStore.favorites.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>У вас нет избранных объявлений.</p>
        )}
      </div>
    </div>
  );
};

export default observer(FavoritesPage);
