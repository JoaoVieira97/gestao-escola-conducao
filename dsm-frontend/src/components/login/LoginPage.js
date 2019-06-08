import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            rememberMe: true
        };
    }

    componentDidMount() {

        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const email = rememberMe ? localStorage.getItem('email') : '';

        this.setState({ email, rememberMe });
        console.log(process.env.REACT_APP_RESTAPI);
    }

    handleInputChange = (event) => {

        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;

        this.setState({ [input.name]: value });
    };

    handleLoginSubmit = async (history) => {

        const { email, password, rememberMe } = this.state;

        if(email !== '' && password !== '') {

            const response = await this._login();
            if(response.success) {

                console.log("login success");

                if(rememberMe) {
                    localStorage.setItem('name', response.name);
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('email', email);
                }

                localStorage.setItem('userType', response.userType);
                //this.props.history.push('/home');
                window.location.reload();
            }
        }
    };

    /**
     * User login
     * @private
     */
    async _login() {

        if(2%2===0) {
            return {
                success: true,
                userType: 'student',
                name: 'Driving School Management',
                token: 'DX8TOKRSvHvQ4eZWghi62yxqNW3D9ooi',
            };
        }
        else {
            return {
                success: false,
                error: 'Credenciais erradas'
            };
        }
    }

    render() {

        return (
            <Container text={true}>
                <div className="ui raised segment" style={{alignItems: 'center'}}>
                    {
                        /*
                        <img
                        className="ui medium centered image"
                        src={require("../../images/logo_plain_svg.svg")}
                        alt={"logo"}
                    />
                         */
                    }
                    <form className="ui form">
                        <div className="field">
                            <label>E-mail</label>
                            <div className="ui left icon input">
                                <input
                                    type="email"
                                    name={"email"}
                                    ///defaultValue={this.state.email}
                                    placeholder="Introduza o seu e-mail..."
                                    onChange={this.handleInputChange}
                                />
                                <i className="mail icon" />
                            </div>
                        </div>
                        <div className="field">
                            <label>Palavra-passe</label>
                            <div className="ui left icon input">
                                <input
                                    type="password"
                                    name={"password"}
                                    placeholder="Introduza a sua palavra-passe..."
                                    onChange={this.handleInputChange}
                                />
                                <i className="lock icon" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui checkbox">
                                <input
                                    type="checkbox"
                                    name={"rememberMe"}
                                    defaultChecked={true}
                                    onChange={this.handleInputChange}
                                    tabIndex="0"
                                />
                                <label>Lembrar o meu acesso</label>
                            </div>
                        </div>
                        <button
                            className="ui button"
                            type="submit"
                            onClick={this.handleLoginSubmit.bind(this)}
                        >LOGIN</button>
                    </form>
                </div>
            </Container>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);