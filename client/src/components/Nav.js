import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export const Nav = ({ isAuthenticated, user }) => {
    return (
        <div>
            NavBar Components
            {!isAuthenticated ? (
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            ) : (
                    <p>Welcome {user !== null ? user.name: "User"}</p>
                )}
        </div>
    )
}

Nav.prototype = {
    isAuthenticated : PropTypes.bool,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
