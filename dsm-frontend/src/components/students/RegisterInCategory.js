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


class RegisterInCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
        
        }
    }

    render() {

        return (
            <Container style={{marginTop: '30px'}}>
                <Header>Registar em categoria</Header>
            </Container>
        );
    }
}

export default RegisterInCategory;