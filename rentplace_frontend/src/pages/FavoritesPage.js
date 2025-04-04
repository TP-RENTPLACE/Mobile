import React from "react";
import { observer } from "mobx-react-lite";
import favoritesStore from "../store/favoritesStore";
import PropertyCard from "../components/PropertyCard";
import "./FavoritesPage.css"

const FavoritesPage = () => {
  return (
    <div className="favorires-container">
      {favoritesStore.favorites.length > 0 ? (
        favoritesStore.favorites.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))
      ) : (
        <p>В избранном пока ничего нет.</p>
      )}
    </div>
  );
};

export default observer(FavoritesPage);