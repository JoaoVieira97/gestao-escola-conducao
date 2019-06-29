import React from 'react';
import PropTypes from 'prop-types';

// REDUX
import {Provider as StoreProvider} from 'react-redux';

// REACT ROUTER
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// DSM ROUTES
import Routes from '../services/Routes';

// CSS
import 'semantic-ui-css/semantic.min.css'

// Authentication
import Authentication from '../services/Authentication';

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
import RegisterPersonalAnnouncement from './students/RegisterPersonalAnnouncement';
import RegisterInCategory from './students/RegisterInCategory';
import RegisterExam from './students/RegisterExam';
import RegisterPayment from './students/RegisterPayment';
import StudentProfile from './students/StudentProfile';
import MarkLesson from "./lessons/MarkLesson";
import InstructorHome from "./instructor/InstructorHome";
import ConfirmNewLesson from "./lessons/ConfirmNewLesson";

/**
 * Returns the component just if user is authenticated.
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest} render={props => (
        Authentication.isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: Routes.LOGIN, state: { from: props.location } }} />
        )
    )} />
);


const Root = ({ store }) => {

    const routesByUser = {
        student: (
            <Switch>
                <PrivateRoute exact path={Routes.HOME} component={HomePage} />
                <PrivateRoute exact path={Routes.LESSONS} component={LessonsPage} />
                <PrivateRoute exact path={Routes.PAYMENTS} component={PaymentsPage} />
                <PrivateRoute exact path={Routes.HOME_ANNOUNCEMENTS} component={Announcements} />
                <PrivateRoute exact path={Routes.NEW_LESSON} component={MarkLesson} />
                <PrivateRoute exact path={Routes.CONFIRM_NEW_LESSON} component={ConfirmNewLesson} />
                <Route exact path={Routes.CONTACTS} render={ props => <ErrorPage {...props} />} />
                <Redirect from="/" exact to={Routes.HOME} />
                <Redirect from="/login" exact to={Routes.HOME} />
                <Route path="/" component={ErrorPage} />
            </Switch>
        ),
        secretary: (
            <Switch>
                <PrivateRoute exact path={Routes.HOME} component={AllStudents} />
                <PrivateRoute exact path={Routes.REGISTER_STUDENT} component={RegisterStudent} />
                <PrivateRoute exact path={Routes.REGISTER_STUDENT_CATEGORY} component={RegisterInCategory} />
                <PrivateRoute exact path={Routes.REGISTER_STUDENT_EXAM} component={RegisterExam} />
                <PrivateRoute exact path={Routes.REGISTER_STUDENT_PAYMENT} component={RegisterPayment} />
                <PrivateRoute exact path={Routes.REGISTER_STUDENT_ANNOUNCEMENT} component={RegisterPersonalAnnouncement} />
                <PrivateRoute exact path={Routes.REGISTER_GENERAL_ANNOUNCEMENT} component={RegisterGeneralAnnouncement} />
                <PrivateRoute exact path={Routes.STUDENT_PROFILE} component={StudentProfile} />
                <Route exact path={Routes.CONTACTS} render={ props => <ErrorPage {...props} />} />
                <Redirect from="/" exact to={Routes.HOME} />
                <Redirect from="/login" exact to={Routes.HOME} />
                <Route path="/" component={ErrorPage} />
            </Switch>
        ),
        instructor: (
            <Switch>
                <PrivateRoute exact path={Routes.HOME} component={InstructorHome} />
                <PrivateRoute exact path={Routes.STUDENTS} component={AllStudents} />
                <Route exact path={Routes.CONTACTS} render={ props => <ErrorPage {...props} />} />
                <Redirect from="/" exact to={Routes.HOME} />
                <Redirect from="/login" exact to={Routes.HOME} />
                <Route path="/" component={ErrorPage} />
            </Switch>
        ),
        default: (
            <Switch>
                <Route exact path={Routes.LOGIN} component={LoginPage} />
                <Route exact path={Routes.CATEGORIES} component={ErrorPage} />
                <Route exact path={Routes.CONTACTS} component={ErrorPage} />
                <Redirect from="/" to={Routes.LOGIN} />
            </Switch>
        )
    };

    let content, headerType;
    const userType = Authentication.getUserType();
    switch (userType) {
        case 'ROLE_STUDENT':
            headerType = 'student';
            content = routesByUser.student;
            break;

        case 'ROLE_SECRETARY':
            headerType = 'secretary';
            content = routesByUser.secretary;
            break;
            
        case 'ROLE_INSTRUCTOR':
            headerType = 'instructor';
            content = routesByUser.instructor;
            break;

        default:
            headerType = 'default';
            content = routesByUser.default;
            break;
    }

    return (
        <StoreProvider store={store}>
            <BrowserRouter>
                <Header userType={headerType} />
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
