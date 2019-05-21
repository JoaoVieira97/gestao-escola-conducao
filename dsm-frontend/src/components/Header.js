import React from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Container} from 'semantic-ui-react';
import Authentication from "./authentication/Authentication";

class Header extends React.Component {

    /**
     * User logout.
     * @returns {Promise<void>}
     */
    handleLogout = async () => {

        await Authentication.logout();
        this.props.history.push("/login");
    };

    render() {

        if(this.props.userType === 'student') {

            return (
                <div className="ui fluid secondary pointing menu">
                    <Container>
                        <NavLink activeClassName="active" className="ui item" to="/home" >Início</NavLink>
                        <NavLink activeClassName="active" className="item" to="/home2">Página 1</NavLink>
                        <NavLink activeClassName="active" className="item" to="/home3">Página 2</NavLink>
                        <div className="right menu">
                            <div className="item">
                                <Button className="ui button" onClick={this.handleLogout.bind(this)}>
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }

        return (
            <div className="ui fluid secondary pointing menu">
                <Container>
                    <NavLink activeClassName="active" className="ui item" to="/home" >Início</NavLink>
                    <div className="right menu">
                        <NavLink activeClassName="active" className="item" to="/login" >Login</NavLink>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Header;