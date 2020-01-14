export const createReducer = (handlers, initalState) => (state = initalState, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
        return state;
    }
    return handlers[action.type](state, action);
};
export const jsonToFormData = (json) => {
    let formData = new FormData();

    for(let key in json){
        formData.append(key, json[key]);
    }

    return formData;
}