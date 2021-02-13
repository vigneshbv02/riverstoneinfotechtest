import api from "../utilites/api";
import { setAlert } from './alert';
import setAuthToken from '../utilites/setAuthToken';

export const loadUser = () => async dispatch => {
    try {
        const res = await api.get('/user');

        dispatch({
            type: "USER_LOADED",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "AUTH_ERROR"
        });
    }
};

export const login = (email, password) => async dispatch => {
    const body = { email: email, password: password };
    try {

        const res = await api.post("/user/login", body);

        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

        setAuthToken(localStorage.token);

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: "LOGIN_FAIL"
        });
    }
}

export const register = (name, email, password) => async dispatch => {
    const body = {name: name, email: email, password: password };
    try {

        const res = await api.post("/user/register", body);

        dispatch({ type: "REGISTER_SUCCESS", payload: res.data });

        dispatch(setAlert(["Registered Sucessfully. Please Login to continue"], 'danger'));

        return true;

    } catch (err) {

        console.log(err);

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: "REGISTER_FAIL"
        });

        return false;
    }
}