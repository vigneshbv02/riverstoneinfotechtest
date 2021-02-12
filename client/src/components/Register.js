import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { register } from "../actions/user";
import { useHistory } from "react-router-dom";

const Register = ({ register, isAuthenticated }) => {

    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    if (isAuthenticated) {
        return <Redirect to="/home" />;
    }

    const { name, email, password } = formData;

    const OnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (email !== "" && password !== '') {
                const response = await register(name, email, password);
                if (response) {
                    history.push("/");
                }

            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            Welcome to Register Page
            <form noValidate onSubmit={onSubmit}>
                <input type="text" placeholder="Name" name="name" onChange={OnChange} />
                <input type="text" placeholder="Email" name="email" onChange={OnChange} />
                <input type="password" placeholder="Password" name="password" onChange={OnChange} />
                <input type="password" placeholder="Re-Type Password" name="password2" onChange={OnChange} />
                <button type="submit">Regiser</button>
            </form>
        </div>
    )
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
