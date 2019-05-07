import React, {Component} from 'react';
import { Container, Header, Divider } from 'semantic-ui-react';


class Footer extends Component {

    render() {

        const footerStyle = {
            position: "absolute",
            bottom: 0,
            width :"100%",
            height: "60px",
        };

        return (
            <footer style={footerStyle}>
                <Divider />
                <Container fluid textAlign='center'>
                    <Header>Header</Header>
                </Container>
            </footer>
        );
    }
}



export default Footer;