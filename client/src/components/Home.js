import React from 'react'
import { connect } from 'react-redux'
import store from '../utilites/store'
import { Redirect } from "react-router-dom";
import { Modal, Container, Paper } from "@material-ui/core";

const Home = ({ user, isAuthenticated }) => {

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    } else if (user !== null && user !== undefined && user.userrole === "admin") {
        return <Redirect to="/adminhome" />
    } else {
        return (
            <Container maxWidth="sm">
                <Paper variant="outlined" style={{margin:'20px'}}>
                    <h2 style={{textAlign:'center'}}> Welcome {user !== null ? user.name : "User"} </h2>
                    <p style={{textAlign:'center'}}>  {user !== null ? user.email : "User"} </p>
                </Paper>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
