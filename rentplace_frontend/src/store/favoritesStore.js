import { makeAutoObservable } from "mobx";

class FavoritesStore {
  favorites = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Добавление объекта в избранное
  addToFavorites(property) {
    if (!this.favorites.some((fav) => fav.id === property.id)) {
      this.favorites.push(property);
    }
  }

  // Удаление объекта из избранного
  removeFromFavorites(propertyId) {
    this.favorites = this.favorites.filter((fav) => fav.id !== propertyId);
  }

  // Проверка, находится ли объект в избранном
  isFavorite(propertyId) {
    return this.favorites.some((fav) => fav.id === propertyId);
  }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;