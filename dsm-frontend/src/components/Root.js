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
import Header from './Header';
import Footer from './Footer';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import LessonsPage from './lessons/LessonsPage';
import PaymentsPage from './payments/PaymentsPage';
import ErrorPage from './ErrorPage';
import AllStudents from './students/AllStudents';
import RegisterStudent from './students/RegisterStudent';
import Announcements from './announcements/Announcements';
import RegisterGeneralAnnouncement from './announcements/RegisterGeneralAnnouncement';
import RegisterInCategory from './students/RegisterInCategory';
import RegisterExam from './students/RegisterExam';
import RegisterPayment from './students/RegisterPayment';
import MarkLesson from "./lessons/MarkLesson";



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
                    <PrivateRoute exact path="/students/register_student" component={RegisterStudent} />
                    <PrivateRoute exact path="/students/register_category" component={RegisterInCategory} />
                    <PrivateRoute exact path="/students/register_exam" component={RegisterExam} />
                    <PrivateRoute exact path="/students/register_payment" component={RegisterPayment} />
                    <PrivateRoute exact path="/register_general_announcement" component={RegisterGeneralAnnouncement} />
                    <PrivateRoute exact path="/home/announcements" component={Announcements} />
                    <PrivateRoute exact path="/lessons/mark_lesson" component={MarkLesson} />
                    <Route exact path="/contacts" render={ props => <ErrorPage {...props} />} />
                    <Redirect from="/" exact to="/home" />
                    <Route path="/" render={ props => <ErrorPage {...props} />} />
                </Switch>
                <Footer />
            </BrowserRouter>
        ),
        secretary: (
            <BrowserRouter>
                <Header userType={'secretary'} />
                <Switch>
                    <PrivateRoute exact path="/home" component={AllStudents} />
                    <PrivateRoute exact path="/students/register_student" component={RegisterStudent} />
                    <PrivateRoute exact path="/students/register_category" component={RegisterInCategory} />
                    <PrivateRoute exact path="/students/register_exam" component={RegisterExam} />
                    <PrivateRoute exact path="/students/register_payment" component={RegisterPayment} />
                    <PrivateRoute exact path="/register_general_announcement" component={RegisterGeneralAnnouncement} />
                    <Route exact path="/contacts" render={ props => <ErrorPage {...props} />} />
                    <Redirect from="/" exact to="/home" />
                    <Route path="/" render={ props => <ErrorPage {...props} />} />
                </Switch>
                <Footer />
            </BrowserRouter>
        ),
        instructor: (
            <BrowserRouter>
                <Header userType={'instructor'} />
                <Switch>
                    <PrivateRoute exact path="/home" component={AllStudents} />
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

        case 'ROLE_SECRETARY':
            content = routesByUser.secretary;
            break;
            
        case 'ROLE_INSTRUCTOR':
            content = routesByUser.instructor;
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
