import React, {Component} from 'react';
import {Container} from "semantic-ui-react";

class ErrorPage extends Component {

    redirectToTarget = () => {
        this.props.history.push('/home')
    };

    render() {

        return (
            <Container text={true} textAlign={'center'}>
                <div style={{marginTop: "20px"}}>
                    <img
                        className="ui large centered image"
                        src={require("../images/DSM_404.png")}
                        alt={"logo"}
                    />
                </div>
                <div style={{marginTop: "50px"}}>
                    <button
                        className="ui secondary button"
                        type="submit"
                        onClick={this.redirectToTarget}
                    >VOLTAR</button>
                </div>
            </Container>
        );
    }
}

export default ErrorPage;