import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';

import { Provider } from 'react-redux';
import store from './utilites/store';
import Routes from './routing/routes';
import Nav from './components/Nav';
import Alert from "./components/Alert";
import setAuthToken from './utilites/setAuthToken';
import { loadUser } from './actions/user';

function App() {
  
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Nav />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
          <Alert />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
