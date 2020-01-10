import * as types from './types';

export const loginUser = (user) => ({ type: types.LOGIN, payload: { user } })
export const logoutUser = () => ({ type: types.LOGOUT, payload: {} })