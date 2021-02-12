import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';

const Routes = props => {
    return (
        <section className="container">
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
            </Switch>
        </section>
    )
}

export default Routes;