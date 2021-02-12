import React, {useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { login } from "../actions/user";

const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    debugger;

    if(isAuthenticated) {
        return <Redirect to="/home" />;
    }

    const {email, password} = formData;

    const OnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            if(email !== "" && password !== '') {
                login(email, password);
            }
        } catch (err) { 
            console.error(err);
        }
    }

    return (
        <div>
            Welcome to Login Page
            <form noValidate onSubmit={onSubmit}>
                <input type="text" placeholder="Email" name="email" onChange={OnChange}/>
                <input type="text" placeholder="Password" name="password" onChange={OnChange}/>
                <button type="submit">Login</button>
            </form>
        </div>
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
