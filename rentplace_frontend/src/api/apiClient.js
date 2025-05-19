
import axios from 'axios';

class ApiClient {
    constructor() {
        this.baseURL = 'https://rentplace.online/api/v1';
        this.token = localStorage.getItem('accessToken');

        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 20000,
        });

        this.initializeInterceptors();
    }

    initializeInterceptors() {
        this.instance.interceptors.request.use(config => {
            const authRequired = config._authRequired !== false;

            if (authRequired && this.token) {
                config.headers.Authorization = `Bearer ${this.token}`;
            }

            return config;
        });

        this.instance.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const { accessToken } = await this.refreshAccessToken();
                        this.setAccessToken(accessToken);
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return this.instance(originalRequest);
                    } catch (refreshError) {
                        this.clearAuth();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    setAuthTokens(accessToken, refreshToken) {
        this.token = accessToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    setAccessToken(accessToken) {
        this.token = accessToken;
        localStorage.setItem('accessToken', accessToken);
    }

    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    clearAuth() {
        this.token = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    async refreshAccessToken() {
        const refreshToken = this.getRefreshToken();
        const response = await this.post('/auth/token', { refreshToken });
        this.setAccessToken(response.accessToken);
        return response;
    }

    getContentTypeHeader(data) {
        return data instanceof FormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' };
    }

    async request(method, endpoint, data = null, config = {}) {
        try {
            const headers = this.getContentTypeHeader(data);
            const finalConfig = {
                ...config,
                _authRequired: config.authRequired !== false,
                headers: { ...headers, ...config.headers }
            };
            delete finalConfig.authRequired;

            const response = await this.instance.request({
                method,
                url: endpoint,
                data,
                ...finalConfig
            });

            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async get(endpoint, config = {}) {
        return this.request('GET', endpoint, null, config);
    }

    async post(endpoint, data, config = {}) {
        return this.request('POST', endpoint, data, config);
    }

    async put(endpoint, data, config = {}) {
        return this.request('PUT', endpoint, data, config);
    }

    async patch(endpoint, data, config = {}) {
        return this.request('PATCH', endpoint, data, config);
    }

    async delete(endpoint, config = {}) {
        return this.request('DELETE', endpoint, null, config);
    }

    handleError(error) {
        const errorData = {
            status: error.response?.status || 0,
            message: error.response?.data?.message || 'Network Error',
            details: error.response?.data?.details || null,
        };

        console.error('API Error:', errorData);
        throw errorData;
    }
}

export default new ApiClient();
