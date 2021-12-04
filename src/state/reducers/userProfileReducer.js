const initialState = {};

const reducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "user":
            return action.payload
        default:
            return state
    }
}

export default reducer;