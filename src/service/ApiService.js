import API_BASE_URL from '../api_config';
import axios from 'axios';

class ApiService {
    register(userData) {
        return axios.post(API_BASE_URL + "/register", userData);
    }
    login(userCreds) {
        return axios.post(API_BASE_URL + "/login", userCreds, { withCredentials: true });
    }
    getProfile(username) {
        return axios.get(API_BASE_URL + "/profile/" + username, { withCredentials: true });
    }
    sendBondRequest(username) {
        return axios.post(API_BASE_URL + "/send-bond-request", { username });
    }
    getMemoline(sortBy) {
        return axios.get(API_BASE_URL + "/memoline/" + sortBy, { withCredentials: true });
    }
    getMyPeople() {
        return axios.get(API_BASE_URL + "/my-people", { withCredentials: true })
    }
    getBondRequests() {
        return axios.get(API_BASE_URL + '/bond-requests', { withCredentials: true });
    }
    bondResponseAction(actionData) {
        return axios.post(API_BASE_URL + '/bond-request-action', actionData, { withCredentials: true });
    }
    addMemory(memData) {
        return axios.post(API_BASE_URL + '/add-memory', memData, { withCredentials: true });
    }
}

export default new ApiService();