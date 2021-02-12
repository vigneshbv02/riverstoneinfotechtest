import React from 'react'
import { connect } from 'react-redux'
import {updateUserStatus, getAllUsers} from '../actions/admin';
import {PropTypes} from 'prop-types';

const AdminUserPanel = ({userData, updateUserStatus, getAllUsers}) => {

    const { _id, name, email, isactive } = userData;

    const onClick = (e) => {
        if(e.target.name === 'activate') {
            updateUserStatus(_id, 'true');
        } else if(e.target.name === 'deactivate') {
            updateUserStatus(_id, 'false');
        }
        getAllUsers();
    }

    return (
        <div>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Status: {isactive ? "Activated" : "Deactivated"}</p>
            <button name="activate" style={{ display: isactive == false ? "block" : "none" }} onClick={onClick}>Activate</button>
            <button name="deactivate" style={{ display: isactive == true ? "block" : "none" }} onClick={onClick}>Deactivate</button>
        </div>
    )
}

AdminUserPanel.propTypes = {
    userData: PropTypes.object.isRequired,
    updateUserStatus: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    updateUserStatus,
    getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserPanel)
