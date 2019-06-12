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
        window.location.reload();
    };

    nameUser = () => {

        return "NomeUser";
    }

    render() {

        if(this.props.userType === 'student') {

            return (
                <div className="ui fluid secondary pointing menu" style={headerStyle}>
                    <Container>
                        <NavLink activeClassName="active" className="ui item" to="/home" >
                            <i className="home icon" />
                            <p>INÍCIO</p>
                        </NavLink>
                        <NavLink className="ui item" to="/lessons">
                            <i className="calendar alternate icon" />
                            <p>AULAS</p>
                        </NavLink>
                        <NavLink className="ui item" to="/payments">
                            <i className="euro icon" />
                            <p>PAGAMENTOS</p>
                        </NavLink>
                        <NavLink className="ui item" to="/contacts" >
                            <i className="address book icon" />
                            <p>CONTACTOS</p>
                        </NavLink>
                        <div className="right menu">
                            <div className="item">
                                Bem vindo, {this.nameUser()}
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
                    <NavLink className="ui item" to="/categories" >CATEGORIAS</NavLink>
                    <NavLink className="ui item" to="/contacts" >CONTACTOS</NavLink>
                </Container>
            </div>
        );
    }
}

export default Header;