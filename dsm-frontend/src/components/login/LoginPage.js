import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';

class LoginPage extends Component {
    render() {
        return (
            <Container text={true}>
                <div className="ui raised segment" style={{alignItems: 'center'}}>
                    <img
                        className="ui medium centered image"
                        src={require("../../images/logo_plain_svg.svg")}
                        alt={"logo"}
                    />
                    <form className="ui form">
                        <div className="field">
                            <label>E-mail</label>
                            <div className="ui left icon input">
                                <input type="email" placeholder="Introduza o seu e-mail..." />
                                <i className="mail icon" />
                            </div>
                        </div>
                        <div className="field">
                            <label>Palavra-passe</label>
                            <div className="ui left icon input">
                                <input type="password" placeholder="Introduza a sua palavra-passe..." />
                                <i className="lock icon" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui checkbox">
                                <input type="checkbox" tabIndex="0"/>
                                <label>Lembrar o meu acesso</label>
                            </div>
                        </div>
                        <button className="ui button" type="submit">Login</button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default LoginPage;