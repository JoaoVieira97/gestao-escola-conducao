import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

// REDUX
import {Provider as StoreProvider} from 'react-redux';

// REACT ROUTER
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

// Components
import Header from "./Header";
import Footer from "./Footer"
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';

// CSS
import 'semantic-ui-css/semantic.min.css'

const isAuthenticated = () => true;

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
);


const Root = ({ store }) => (
    <StoreProvider store={store}>
        <BrowserRouter>
            <Header />
            <Container>
                <Route exact path="/login" component={LoginPage} />
                <PrivateRoute exact path="/" component={LoginPage} />
                <PrivateRoute exact path="/logout" component={HomePage} />
                <PrivateRoute exact path="/home" component={HomePage} />
                <PrivateRoute exact path="/home2" component={HomePage} />
                <PrivateRoute exact path="/home3" component={HomePage} />
            </Container>
            <Footer />
        </BrowserRouter>
    </StoreProvider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
