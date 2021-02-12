const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', payload);
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            };
        case 'LOGIN_FAIL':
            return {
                initialState
            }
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            };
        default:
            return state;
    }
}