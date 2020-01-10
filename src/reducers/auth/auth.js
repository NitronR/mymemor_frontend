export const login = (state, { payload }) => ({
    ...state,
    user: payload.user
})
export const logout = (state) => ({
    ...state,
    user: { authenticated: false }
})