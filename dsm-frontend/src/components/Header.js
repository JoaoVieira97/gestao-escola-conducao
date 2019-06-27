import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Responsive,
    Button,
    Container,
    Sidebar, Menu, Icon
} from 'semantic-ui-react';
import Authentication from '../services/session/Authentication';
import {headerStyle} from "../styles/styles";

const StudentItemsWeb = (handleLogout) => {
    return (
        <React.Fragment>
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
                    <Button className="ui button" animated onClick={() => handleLogout()}>
                        <Button.Content visible>LOGOUT</Button.Content>
                        <Button.Content hidden>
                            <Icon name='close' />
                        </Button.Content>
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

const StudentItemsMobile = (handleLogout, hideMenu) => {
    return (
        <React.Fragment>
            <NavLink className="ui item" to="/home" onClick={() => hideMenu()}>
                <p>INÍCIO</p>
            </NavLink>
            <NavLink className="ui item" to="/lessons" onClick={() => hideMenu()}>
                <p>AULAS</p>
            </NavLink>
            <NavLink className="ui item" to="/payments" onClick={() => hideMenu()}>
                <p>PAGAMENTOS</p>
            </NavLink>
            <NavLink className="ui item" to="/contacts" onClick={() => hideMenu()}>
                <p>CONTACTOS</p>
            </NavLink>
            <NavLink className="ui item" to="/students" onClick={() => hideMenu()}>
                <p>ALUNOS</p>
            </NavLink>
            <NavLink className="ui item" to="/register_general_announcement" onClick={() => hideMenu()}>
                <p>REGISTAR AVISO</p>
            </NavLink>
            <div className="right menu">
                <div className="item">
                    <Button className="ui button" onClick={() => {handleLogout(); hideMenu();}}>
                        LOGOUT
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

const SecretaryItemsWeb = (handleLogout) => {
    return (
        <React.Fragment>
            <NavLink className="ui item" to="/home" >
                <i className="users icon" />
                <p>ALUNOS</p>
            </NavLink>
            <NavLink className="ui item" to="/register_general_announcement" >
                <i className="bell icon" />
                <p>REGISTAR AVISO</p>
            </NavLink>
            <NavLink className="ui item" to="/contacts" >
                <i className="address book icon" />
                <p>CONTACTOS</p>
            </NavLink>
            <div className="right menu">
                <div className="item">
                    <Button className="ui button" animated onClick={() => handleLogout()}>
                        <Button.Content visible>LOGOUT</Button.Content>
                        <Button.Content hidden>
                            <Icon name='close' />
                        </Button.Content>
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

const SecretaryItemsMobile = (handleLogout, hideMenu) => {
    return (
        <React.Fragment>
            <NavLink className="ui item" to="/home" onClick={() => hideMenu()}>
                <p>ALUNOS</p>
            </NavLink>
            <NavLink className="ui item" to="/register_general_announcement" onClick={() => hideMenu()}>
                <p>REGISTAR AVISO</p>
            </NavLink>
            <NavLink className="ui item" to="/contacts" onClick={() => hideMenu()}>
                <p>CONTACTOS</p>
            </NavLink>
            <div className="right menu">
                <div className="item">
                    <Button className="ui button" onClick={() => {handleLogout(); hideMenu();}}>
                        LOGOUT
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

const InstructorItemsWeb = (handleLogout) => {
    return (
        <React.Fragment>
            <NavLink className="ui item" to="/home" >
                <i className="users icon" />
                <p>ALUNOS</p>
            </NavLink>
            <NavLink className="ui item" to="/contacts" >
                <i className="address book icon" />
                <p>CONTACTOS</p>
            </NavLink>
            <div className="right menu">
                <div className="item">
                    <Button className="ui button" animated onClick={() => handleLogout()}>
                        <Button.Content visible>LOGOUT</Button.Content>
                        <Button.Content hidden>
                            <Icon name='close' />
                        </Button.Content>
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

const InstructorItemsMobile = (handleLogout, hideMenu) => {
    return (
        <React.Fragment>
            <NavLink className="ui item" to="/home" onClick={() => hideMenu()}>
                <p>ALUNOS</p>
            </NavLink>
            <NavLink className="ui item" to="/contacts" onClick={() => hideMenu()}>
                <p>CONTACTOS</p>
            </NavLink>
            <div className="right menu">
                <div className="item">
                    <Button className="ui button" onClick={() => {handleLogout(); hideMenu();}}>
                        LOGOUT
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

const DefaultItems = (
    <React.Fragment>
        <NavLink activeClassName="active" className="ui item" to="/home" >INÍCIO</NavLink>
        <NavLink className="ui item" to="/categories" >CATEGORIAS</NavLink>
        <NavLink className="ui item" to="/contacts" >CONTACTOS</NavLink>
    </React.Fragment>
);

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    handleLogout = async () => {

        await Authentication.logout();
        window.location.reload();
    };

    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });

    render() {

        const { visible } = this.state;

        let webMenu = DefaultItems
        let mobileMenu = DefaultItems

        if (this.props.userType === 'student'){
            webMenu = StudentItemsWeb(this.handleLogout.bind(this))
            mobileMenu = StudentItemsMobile(this.handleLogout.bind(this), this.handleHideClick.bind(this))
        } else if (this.props.userType === 'secretary'){
            webMenu = SecretaryItemsWeb(this.handleLogout.bind(this))
            mobileMenu = SecretaryItemsMobile(this.handleLogout.bind(this), this.handleHideClick.bind(this))
        } else if (this.props.userType === 'instructor'){
            webMenu = InstructorItemsWeb(this.handleLogout.bind(this))
            mobileMenu = InstructorItemsMobile(this.handleLogout.bind(this), this.handleHideClick.bind(this))
        }

        return (
            <React.Fragment>
                {/* WEB */}
                <Responsive minWidth={993}>
                    <div className="ui fluid secondary pointing menu" style={headerStyle}>
                        <Container>
                            {
                                webMenu
                            }
                        </Container>
                    </div>
                </Responsive>
                {/* MOBILE */}
                <Responsive maxWidth={992}>
                    <Menu secondary style={headerStyle}>
                        <Menu.Item
                            style={{paddingLeft: '15px', paddingTop:' 15px'}}
                            position={'left'}
                            icon={<Icon name='bars' size={'large'} />}
                            onClick={this.handleShowClick}
                        />
                    </Menu>
                    <Sidebar
                        as={Menu}
                        borderless
                        direction={'left'}
                        animation='overlay'
                        icon='labeled'
                        onHide={this.handleHideClick}
                        vertical
                        visible={visible}
                        width='thin'
                    >
                        <Menu.Item
                            position={'right'}
                            icon={'close' }
                            onClick={this.handleHideClick}
                        />
                        {
                            mobileMenu
                        }
                    </Sidebar>
                </Responsive>
            </React.Fragment>
        );
    }
}

export default Header;