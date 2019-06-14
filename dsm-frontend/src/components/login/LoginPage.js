import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Form, Message} from 'semantic-ui-react'
import {fetchApi} from "../../services/api";
import Authentication from "../../services/session/Authentication";

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            rememberMe: true,
            loginError: false,
            loginErrorMessage: ''
        };
    }

    handleInputChange = (event) => {

        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;

        this.setState({
            loginError: false,
            [input.name]: value
        });
    };

    handleLoginSubmit = () => {

        const { email, password } = this.state;
        if(email !== '' && password !== '') {

            fetchApi(
                'post','/authentication',
                {
                    email: email,
                    password: password
                },  {},
                this.successHandler, this.errorHandler
            );
        }
    };


    /**
     * Handle the response.
     * @param response
     */
    successHandler = (response) => {

        Authentication.login(response.data, this.state.rememberMe);

        this.props.history.push('/home');
        window.location.reload();
    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

        // bad request
        if(error.response.status === 400) {
            this.setState({
                loginError: true,
                loginErrorMessage: 'As credenciais que introduziu estão erradas.'
            });
        }
        // invalid API access token
        else {
            this.setState({
                loginError: true,
                loginErrorMessage: 'Ocorreu um erro ao estabelecer conexão com o servidor principal.'
            });
        }
    };


    render() {

        return (
            <div className="ui stackable grid container center aligned">
                <div className="eight wide column">
                    <img
                        src={require("../../images/logo.png")}
                        className="ui medium centered image"
                        style={{marginBottom: "20px"}}
                        alt={"logo"}
                    />
                    <div className="ui stacked segment left aligned">
                        <Form error={this.state.loginError}>
                            {
                                /*
                                <Form.Input
                                    type={"email"}
                                    name={"email"}
                                    label={'E-mail'}
                                    placeholder={'Introduza o seu e-mail...'}
                                    onChange={this.handleInputChange}
                                    error={this.state.loginError}
                                />
                                <Form.Input
                                    type={"password"}
                                    name={"password"}
                                    label={"Palavra-passe"}
                                    placeholder={"Introduza a sua palavra-passe..."}
                                    onChange={this.handleInputChange}
                                    error={this.state.loginError}
                                />
                                 */
                            }
                            <Message
                                error
                                header={'Erro ao iniciar sessão'}
                                content={this.state.loginErrorMessage}
                            />
                            <div className={this.state.loginError ? "error field" : "field"}>
                                <label>E-mail</label>
                                <div className="ui left icon input">
                                    <input
                                        type="email"
                                        name={"email"}
                                        placeholder="Introduza o seu e-mail..."
                                        onChange={this.handleInputChange}
                                    />
                                    <i className="user icon" />
                                </div>
                            </div>
                            <div className={this.state.loginError ? "error field" : "field"}>
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
                                        defaultChecked={this.state.rememberMe}
                                        onChange={this.handleInputChange}
                                        tabIndex="0"
                                    />
                                    <label>Lembrar o meu acesso</label>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="ui button"
                                onClick={this.handleLoginSubmit.bind(this)}
                            >
                                ENTRAR
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);