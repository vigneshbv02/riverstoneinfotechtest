import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';
import AdminHome from '../components/AdminHome';

const Routes = props => {
    return (
        <section className="container">
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/adminhome" component={AdminHome} />
            </Switch>
        </section>
    )
}

export default Routes;