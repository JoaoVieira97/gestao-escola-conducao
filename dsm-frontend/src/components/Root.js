import React from 'react';
import PropTypes from 'prop-types';

// REDUX
import {Provider as StoreProvider} from 'react-redux';
// import store  from './redux/store';

// REACT ROUTER
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import App from './App';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';

const Root = ({ store }) => (
    <StoreProvider store={store}>
        <Router>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/home" component={HomePage} />
        </Router>
    </StoreProvider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
