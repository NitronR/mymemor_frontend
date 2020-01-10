import axios from 'axios';
import API_BASE_URL from '../api_config';

class ApiService {
    register(userData) {
        return axios.post(API_BASE_URL + "/register", userData);
    }
    login(userCreds) {
        return axios.post(API_BASE_URL + "/login", userCreds);
    }
    getProfile(username) {
        return axios.get(API_BASE_URL + "/profile/" + username);
    }
}

export default new ApiService();