const initialState = {
    AllUsers: []
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case 'ALLUSERS_LOADED':
            return {
                ...state,
                AllUsers: payload
            }
        default:
            return state;
    }
}