import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect, useHistory } from 'react-router-dom';
import { register } from "../actions/user";
import { Container, CssBaseline, Grid, Link, Button, TextField, Typography, Avatar, makeStyles } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = ({ register, isAuthenticated }) => {

    const history = useHistory();
    const classes = useStyles();

    const [formData, setFormData] = useState({
        name: '',
        emailid: '',
        password: '',
        password2: ''
    });

    const { name, emailid, password, password2 } = formData;

    let [formHelperText, setFormHelperText] = useState({
        formHelperTextname: "",
        formHelperTextemailid: "",
        formHelperTextpassword: "",
        formHelperTextpassword2: "",
    });

    let {
        formHelperTextname,
        formHelperTextemailid,
        formHelperTextpassword,
        formHelperTextpassword2,
    } = formHelperText;

    if (isAuthenticated) {
        return <Redirect to="/home" />;
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    let onSubmit = async(e) => {
        e.preventDefault();

        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        setFormHelperText(
            (formHelperText = {
                formHelperTextname: "",
                formHelperTextemailid: "",
                formHelperTextpassword: "",
                formHelperTextpassword2: "",
            })
        );

        if (name.length === 0) {
            setFormHelperText({
                ...formHelperText,
                formHelperTextname: "Enter your name",
            });
        } else if (emailid.length === 0) {
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
                formHelperTextpassword: "Enter Password",
            });
        } else if (password2.length === 0) {
            setFormHelperText({
                ...formHelperText,
                formHelperTextpassword2: "Retype your password",
            });
        } else if (password2.length !== password.length) {
            setFormHelperText({
                ...formHelperText,
                formHelperTextpassword2: "Password doesn't match",
            });
        } else {
            const response = await register(name, emailid, password);
            if(response) {
                history.push("/login");
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper} >
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5"> Sign up </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit} >
                    <TextField variant="outlined"
                        margin="normal"
                        required fullWidth id="name"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        autoFocus error={formHelperTextname.length > 0}
                        helperText={formHelperTextname}
                    />
                    <TextField variant="outlined"
                        margin="normal"
                        required fullWidth id="email"
                        label="Email Address"
                        name="emailid"
                        value={emailid}
                        onChange={onChange}
                        autoComplete="email"
                        error={formHelperTextemailid.length > 0}
                        helperText={formHelperTextemailid}
                    />
                    <TextField variant="outlined"
                        margin="normal"
                        required fullWidth name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={onChange}
                        error={formHelperTextpassword.length > 0}
                        helperText={formHelperTextpassword} />
                    <TextField variant="outlined"
                        margin="normal"
                        required fullWidth name="password2"
                        label="Retype Password"
                        type="password"
                        id="password2"
                        value={password2}
                        onChange={onChange}
                        error={formHelperTextpassword2.length > 0}
                        helperText={formHelperTextpassword2} />
                    <Button type="submit"
                        fullWidth variant="contained"
                        color="primary"
                        className={classes.submit} > Sign Up </Button>
                    <Grid container >
                        <Grid item xs > </Grid>
                        <Grid item >
                            Already have an account? Sign In
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
})

const mapDispatchToProps = {
    register
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
