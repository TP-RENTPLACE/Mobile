import apiClient from "./apiClient";

class FavoritesService {
    async getAll(params = {}) {
        return await apiClient.get('/favourites/', { params, authRequired: true });
    }

    async addToFavorites(propertyId) {
        return await apiClient.patch(`/favourites/add/${propertyId}`, {authRequired: true});
    }

    async removeFromFavorites(propertyId) {
        return await apiClient.patch(`/favourites/remove/${propertyId}`, {authRequired: true});
    }
}

export default new FavoritesService();