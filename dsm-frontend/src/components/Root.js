import React from 'react';
import PropTypes from 'prop-types';

// REDUX
import {Provider as StoreProvider} from 'react-redux';

// REACT ROUTER
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// CSS
import 'semantic-ui-css/semantic.min.css'

// Authentication
import Authentication from './authentication/Authentication';

// Components
import Header from "./Header";
import Footer from "./Footer"
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import ErrorPage from "./ErrorPage";




const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !Authentication.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
);


const Root = ({ store }) => {

    const routesByUser = {
        student: (
            <React.Fragment>
                <Header userType={'student'} />
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <PrivateRoute exact path="/home" component={HomePage} />
                    <PrivateRoute exact path="/home2" component={HomePage} />
                    <PrivateRoute exact path="/home3" component={HomePage} />
                    <Route path="/" component={ErrorPage} />
                </Switch>
            </React.Fragment>
        ),
        default: (
            <React.Fragment>
                <Header userType={'default'} />
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </React.Fragment>
        )
    };

    let content;
    const userType = localStorage.getItem('userType');
    switch (userType) {
        case 'student':
            content = routesByUser.student;
            break;

        case 'coach':
            content = routesByUser.student;
            break;

        default:
            content = routesByUser.default;
    }

    return (
        <StoreProvider store={store}>
            <BrowserRouter>
                {content}
                <Footer />
            </BrowserRouter>
        </StoreProvider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
