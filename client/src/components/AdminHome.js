import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getAllUsers } from '../actions/admin';
import AdminUserPanel from "../components/AdminUserPanel";
import store from "../utilites/store";
import { Container, Paper } from "@material-ui/core";

const AdminHome = ({ getAllUsers, isAuthenticated, user, AllUsers }) => {

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    } else if (user !== null && user !== undefined && user.userrole === "user") {
        return <Redirect to="/home" />
    } else if (user !== null && user !== undefined && user.userrole === "admin") {
        const LogOut = (e) => {
            store.dispatch({ type: 'LOGOUT' });
        }

        return (
            <Container>
                <Paper variant="outlined" style={{ margin: '20px', padding: '20px'}}>
                    <h2 style={{ textAlign: 'center' }}> Welcome to Admin Home </h2>
                    <div style={{display: 'flex', flexDirection: 'row', margin: '20px'}}>
                        {AllUsers.map((userData) => (
                            <AdminUserPanel userData={userData} key={userData._id} />
                        ))}
                    </div>
                </Paper>
            </Container>
        )
    } else {
        return <Redirect to="/" />
    }

}

AdminHome.propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user,
    AllUsers: state.admin.AllUsers
})

const mapDispatchToProps = {
    getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
