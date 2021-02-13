import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { login } from "../actions/user";
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({ login, isAuthenticated }) => {

    const classes = useStyles();

    const [formData, setFormData] = useState({
        emailid: '',
        password: ''
    });

    let [formHelperText, setFormHelperText] = useState({
        formHelperTextemailid: "",
        formHelperTextpassword: "",
    });

    const { emailid, password } = formData;

    let {
        formHelperTextemailid,
        formHelperTextpassword,
    } = formHelperText;

    const OnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        setFormHelperText(
            (formHelperText = {
                formHelperTextemailid: "",
                formHelperTextpassword: "",
            })
        );

        if (emailid.length === 0) {
            setFormHelperText({
                ...formHelperText,
                formHelperTextemailid: "Enter your email",
            });
        } else if (!emailid.match(mailformat)) {
            setFormHelperText({
                ...formHelperText,
                formHelperTextemailid: "Enter valid email",
            });
        } else if (password.length === 0) {
            setFormHelperText({
                ...formHelperText,
                formHelperTextpassword: "Enter valid password",
            });
        } else {
            login(emailid, password);
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/home" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5"> Sign in </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="emailid"
                        value={emailid}
                        autoComplete="email"
                        onChange={OnChange}
                        autoFocus error={formHelperTextemailid.length > 0}
                        helperText={formHelperTextemailid}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={OnChange}
                        autoComplete="current-password"
                        autoFocus error={formHelperTextpassword.length > 0}
                        helperText={formHelperTextpassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            Don't have an account? Sign Up
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
