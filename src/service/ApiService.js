import API_BASE_URL from '../api_config';
import axios from 'axios';
import { jsonToFormData } from '../reducers/utils';

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
        let form_data = new FormData();
        form_data.append("username", username);
        return axios.post(API_BASE_URL + "/send-bond-request", form_data, { withCredentials: true });
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
    bondRequestAction(actionData) {
        actionData['action'] = { 'accept': 0, 'decline': 1 }[actionData['action']]
        return axios.post(API_BASE_URL + '/bond-request-action', jsonToFormData(actionData), { withCredentials: true });
    }
    addMemory(memData) {
        return axios.post(API_BASE_URL + '/add-memory', memData, { withCredentials: true });
    }
    search(query, page) {
        return axios.get(`${API_BASE_URL}/search/${query}/${page}`);
    }
}

export default new ApiService();