import React, {Component} from 'react';
import {
    Container,
    Button,
    Icon,
    Table,
    Statistic,
    Pagination,
    Segment,
    Divider,
    Dropdown,
    Form,
    Modal,
    Header
} from 'semantic-ui-react';
import { fetchApi } from '../../services/api/index';


class RegisterPayment extends Component {

    constructor(props) {
        super(props);

        this.state = {
        
        }
    }

    render() {

        return (
            <Container style={{marginTop: '30px'}}>
                <Header>Registar pagamento</Header>
            </Container>
        );
    }
}

export default RegisterPayment;