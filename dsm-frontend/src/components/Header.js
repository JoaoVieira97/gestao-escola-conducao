import React from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Container} from 'semantic-ui-react';
import Authentication from "./authentication/Authentication";
import {headerStyle} from "../styles/styles";

class Header extends React.Component {

    /**
     * User logout.
     * @returns {Promise<void>}
     */
    handleLogout = async () => {

        await Authentication.logout();
        //this.props.history.push("/login");
        window.location.reload();
    };

    render() {

        if(this.props.userType === 'student') {

            return (
                <div className="ui fluid secondary pointing menu" style={headerStyle}>
                    <Container>
                        <NavLink activeClassName="active" className="ui item" to="/home" >INÍCIO</NavLink>
                        <NavLink activeClassName="active" className="ui item" to="/lessons">AULAS</NavLink>
                        <NavLink activeClassName="active" className="ui item" to="/payments">PAGAMENTOS</NavLink>
                        <NavLink activeClassName="active" className="ui item" to="/contacts" >CONTACTOS</NavLink>
                        <div className="right menu">
                            <div className="item">
                                <Button className="ui button" onClick={this.handleLogout.bind(this)}>
                                    LOGOUT
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }

        return (
            <div className="ui fluid secondary pointing menu" style={headerStyle}>
                <Container>
                    <NavLink activeClassName="active" className="ui item" to="/home" >INÍCIO</NavLink>
                    <NavLink activeClassName="active" className="ui item" to="/driving-licenses" >CATEGORIAS</NavLink>
                    <NavLink activeClassName="active" className="ui item" to="/contacts" >CONTACTOS</NavLink>
                </Container>
            </div>
        );
    }
}

export default Header;