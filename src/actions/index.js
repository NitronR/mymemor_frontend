import * as types from './types';

export const loginUser = (user) => ({ type: types.LOGIN, payload: { user } })
export const logoutUser = () => ({ type: types.LOGOUT, payload: {} })
export const setLoading = (loading) => ({ type: types.LOADING, payload: loading })