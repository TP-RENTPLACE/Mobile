import apiClient from './apiClient';

export default {
    async requestCode(email) {
        const response = await apiClient.post('/auth/code-request', { email });
        return response;
    },

    async login(email, code) {
        const response = await apiClient.post('/auth/login', { email, code });
        const { accessToken, refreshToken } = response;
        apiClient.setAuthTokens(accessToken, refreshToken);
        return response;
    },

    async validateCode(email, code) {
        return await apiClient.post('/auth/validate-code', { email, code });
    },

    async register(email, code, name, surname) {
        const response = await apiClient.post('/auth/register', {
            email, code, name, surname
        });
        const { accessToken, refreshToken } = response;
        apiClient.setAuthTokens(accessToken, refreshToken);
        return response;
    },

    async getInfo() {
        return await apiClient.get('/auth/info', { authRequired: true });
    }
};