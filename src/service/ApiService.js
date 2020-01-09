import axios from 'axios';
import API_BASE_URL from './api_config';

class ApiService {
    register(userData) {
        return axios.post(API_BASE_URL + "/register", userData);
    }
}

export default new ApiService();