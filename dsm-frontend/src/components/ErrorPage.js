import React, {Component} from 'react';
import {Container, Header} from "semantic-ui-react";


class ErrorPage extends Component {

    render() {

        return (
            <Container text={true} textAlign={'center'}>
                <Header>ERROR</Header>
            </Container>
        );
    }
}

export default ErrorPage;