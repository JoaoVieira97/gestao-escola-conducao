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
import _ from 'lodash';
import { fetchApi } from '../../services/api/index';
import {StudentFilter} from "../students/StudentFilter";
import Routes from "../../services/Routes";

import GenericWeather from '../weather/GenericWeather';



export default class InstructorHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    render() {
        return (
            <Container style={{marginTop: '30px'}}>
                <GenericWeather />
            </Container>
        );
    }
}