import React, {Component} from 'react';
import {
    Container,
} from 'semantic-ui-react';


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