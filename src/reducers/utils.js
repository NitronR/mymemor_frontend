export const createReducer = (handlers, initalState) => (state = initalState, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
        return state;
    }
    return handlers[action.type](state, action);
};