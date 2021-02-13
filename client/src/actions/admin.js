import api from "../utilites/api";
import { setAlert } from './alert';

export const getAllUsers = () => async dispatch => {
    try {
        const users = await api.post("/admin/getAllUsers");
        dispatch({type: 'ALLUSERS_LOADED', payload: users.data});
        return users;
    } catch (err) {
        console.log(err);

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        return null;
    }
}

export const updateUserStatus = (userId, userStatus) => async dispatch => {
    try {
        const res = await api.post("/admin/activateUser", {userId: userId, userStatus: userStatus});
        console.log(res);
        getAllUsers();
    } catch (err) {
        console.log(err);

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        return null;
    }
}