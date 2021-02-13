import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { AppBar, Button, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { Redirect,useHistory } from "react-router-dom";
import store from "../utilites/store";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const Nav = ({ isAuthenticated, user }) => {

    const classes = useStyles();
    const history = useHistory();

    const LoginOnClick = () => {
        history.push("/login");
    }

    const RegisterOnClick = () => {
        history.push("/register");
    }

    
    const LogOut = (e) => {
        store.dispatch({ type: 'LOGOUT' });
    }

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    {!isAuthenticated ? (
                        <React.Fragment>
                            <Typography variant="h6" className={classes.title} onClick={() => {history.push("/")}}>RiverStone Infotech</Typography>
                            <div className="navigation-floatright">
                                <Button style={{marginRight: '20px'}} variant="outlined" color="inherit" onClick={LoginOnClick}>Login</Button>
                                <Button style={{marginRight: '20px'}} variant="outlined" color="inherit" onClick={RegisterOnClick}>Register</Button>
                                
                            </div>
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                <Typography variant="h6" className={classes.title} onClick={() => {history.push("/home")}}>RiverStone Infotech</Typography>
                                <div className="navigation-floatright" style={{ display: 'flex', flexDirection: 'row'}}>
                                    <Typography style={{marginRight: '20px'}} variant="h6" className={classes.title}>{user !== null && user !== undefined ? user.name : "User"}</Typography>
                                    <Button variant="outlined" color="inherit" onClick={LogOut}>LogOut</Button>
                                </div>
                            </React.Fragment>
                        )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

Nav.prototype = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
