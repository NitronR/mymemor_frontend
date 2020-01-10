import { LOGIN, LOGOUT } from "../../actions/types";
import { createReducer } from "../utils"
import { login, logout } from "./auth"

const initialState = {
    user: {
        authenticated: false
    }
};

const authHandler = {
    [LOGIN]: login,
    [LOGOUT]: logout
};

const auth = createReducer(authHandler, initialState)

export default auth;