import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

class Header extends React.Component {

    render() {
        return (
            <div className="ui fluid secondary pointing menu">
                <Container>
                    <NavLink activeClassName="active" className="item" to="/home">Página 1</NavLink>
                    <NavLink activeClassName="active" className="item" to="/home2">Página 2</NavLink>
                    <NavLink activeClassName="active" className="item" to="/home3">Página 3</NavLink>
                    <div className="right menu">
                        <NavLink activeClassName="active" className="ui item" to="/logout">Logout</NavLink>
                        <div className="item">
                            <Link className="ui button" to="/login">Login</Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Header;
