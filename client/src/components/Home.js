import React from 'react'
import { connect } from 'react-redux'
import store from '../utilites/store'
import {Redirect} from "react-router-dom";

const Home = ({user, isAuthenticated}) => {
    
    if(!isAuthenticated) { 
        return <Redirect to="/login" />
    }

    const LogOut = (e) => {
        store.dispatch({ type: 'LOGOUT' });
    }

    return (
        <div>
            Welcome {user !== null ? user.name: "User"} {user !== null ? user.email: "User"}
            <button onClick={LogOut}>LogOut</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
