import React from 'react';
import PropTypes from 'prop-types';

// REDUX
import {Provider as StoreProvider} from 'react-redux';

// REACT ROUTER
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// CSS
import 'semantic-ui-css/semantic.min.css'

// Authentication
import Authentication from '../services/session/Authentication';

// Components
import Header from "./Header";
import Footer from "./Footer"
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import LessonsPage from './lessons/LessonsPage';
import PaymentsPage from './payments/PaymentsPage';
import ErrorPage from "./ErrorPage";
import AllStudents from "./students/AllStudents";




const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Authentication.isAuthenticated() ? (
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
            <BrowserRouter>
                <Header userType={'student'} />
                <Switch>
                    <PrivateRoute exact path="/home" component={HomePage} />
                    <PrivateRoute exact path="/lessons" component={LessonsPage} />
                    <PrivateRoute exact path="/payments" component={PaymentsPage} />
                    <PrivateRoute exact path="/students" component={AllStudents} />
                    <Route exact path="/contacts" render={ props => <ErrorPage {...props} />} />
                    <Redirect from="/" exact to="/home" />
                    <Route path="/" render={ props => <ErrorPage {...props} />} />
                </Switch>
                <Footer />
            </BrowserRouter>
        ),
        default: (
            <BrowserRouter>
                <Header userType={'default'} />
                <Switch>
                    <Route exact path="/home" render={ props => <LoginPage {...props} />} />
                    <Route exact path="/categories" render={ props => <ErrorPage {...props} />} />
                    <Route exact path="/contacts" render={ props => <ErrorPage {...props} />} />
                    <Redirect from="/" to="/home" />
                </Switch>
                <Footer />
            </BrowserRouter>
        )
    };

    let content;
    const userType = Authentication.getUserType();
    switch (userType) {
        case 'ROLE_STUDENT':
            content = routesByUser.student;
            break;

        case 'ROLE_INSTRUCTOR':
            content = routesByUser.student;
            break;

        default:
            content = routesByUser.default;
    }

    return (
        <StoreProvider store={store}>
            {content}
        </StoreProvider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
