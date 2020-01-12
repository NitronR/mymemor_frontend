import API_BASE_URL from '../api_config';
import axios from 'axios';

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
    sendBondRequest(username) {
        return axios.post(API_BASE_URL + "/send-bond-request", { username });
    }
    getMemoline() {
        return axios.get(API_BASE_URL + "/memoline");
    }
    getMyPeople(){
        return axios.get(API_BASE_URL+"/my-people")
    }
}

export default new ApiService();