import { combineReducers } from 'redux';
import userReducers from './user';
import alertReducers from './alert';
import adminReducers from './admin';

export default combineReducers({
    user: userReducers,
    alert: alertReducers,
    admin: adminReducers,
});
