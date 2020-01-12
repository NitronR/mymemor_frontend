import { LOGIN, LOGOUT } from "../../actions/types";
import { login, logout } from "./auth"

import { createReducer } from "../utils"

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