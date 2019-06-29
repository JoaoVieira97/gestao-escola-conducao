import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Form, Message} from 'semantic-ui-react'
import Authentication from "../../services/Authentication";
import Routes from "../../services/Routes";
import { setUserTokenAndType } from "../../redux/actions/user";

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

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

            this.setState({isLoading: true}, () => {

                Authentication.login(
                    email,
                    password,
                    this.successHandler,
                    this.errorHandler
                )
            });
        }
    };


    /**
     * Handle the success response.
     * @param response
     */
    successHandler = (response) => {

        if(response.status === 200 && response.data) {

            const userToken = response.data.userToken;
            const userType = response.data.userType;

            // save on localStorage
            if(this.state.rememberMe) {

                localStorage.setItem('userToken', userToken);
                localStorage.setItem('userType', userType);
            }
            // save on redux
            else {
                this.props.setUserTokenAndType(userToken, userType);
            }

            setTimeout(() =>{

                this.setState({
                    isLoading: false
                }, () => {

                    const { from } = this.props.location.state || {from: {pathname: Routes.HOME}};
                    this.props.history.push(from);
                    window.location.reload();
                });

            }, 500);
        }
    };

    /**
     * Handle the error response.
     * @param error
     */
    errorHandler = (error) => {

        // bad request
        if(error.response && error.response.status && error.response.status === 400) {
            this.setState({
                isLoading: false,
                loginError: true,
                loginErrorMessage: 'As credenciais que introduziu estão erradas.'
            });
        }
        // invalid API access token
        else {
            this.setState({
                isLoading: false,
                loginError: true,
                loginErrorMessage: 'Ocorreu um erro ao estabelecer conexão com o servidor principal.'
            });
            Authentication.clearData();
        }
    };


    render() {

        return (
            <div className="ui stackable grid container center aligned">
                <div className="eight wide column">
                    <img
                        src={require("../../images/logo.png")}
                        className="ui medium centered image"
                        style={{marginBottom: "20px", marginTop: "60px"}}
                        alt={"logo"}
                    />
                    <div className="ui stacked segment left aligned">
                        <Form error={this.state.loginError} onSubmit={this.handleLoginSubmit}>
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
                            {
                                /*
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
                                 */
                            }
                            <div style={{marginTop: 30}}>
                                <Button
                                    type="submit"
                                    className="ui button"
                                    loading={this.state.isLoading}
                                >
                                    ENTRAR
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({

    setUserTokenAndType: (token, type) => {
        dispatch(setUserTokenAndType(token, type))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);