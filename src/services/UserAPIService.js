import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';


const UserApiService = {
    setToken(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    removeToken() {
        delete axios.defaults.headers.common['Authorization'];
    },

    async getUserInfo() {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/info`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user info:', error);
            throw error;
        }
    },

    async login(credentials) {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, credentials);
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async logout() {
        try {
            this.removeToken();
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }
};

export default UserApiService;