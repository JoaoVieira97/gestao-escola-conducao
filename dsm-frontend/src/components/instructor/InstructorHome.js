import React, {Component} from 'react';
import {
    Button,
    Container, Dimmer, Feed, Header, Icon, Loader, Card
} from 'semantic-ui-react';


import GenericWeather from '../weather/GenericWeather';

import Routes from "../../services/Routes";
import {fetchApi} from "../../services/api";
import Authentication from "../../services/Authentication";



export default class InstructorHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

            isLoadingText: 'A carregar...',
            isLoadingGeneralAnnouncements: true,
            general_announcements: [],
            message_ga: 'Sem avisos para mostrar.',
        }
    }

    componentDidMount() {

        fetchApi(
            'get',
            '/user/announcements?filter=recent',
            {}, {},
            this.successHandlerGeneralAnnouncements,
            this.errorHandlerGeneralAnnouncements.bind(this)
        );
    }

    successHandlerGeneralAnnouncements = (response) => {
        if(response.data) {
            this.setState({
                general_announcements: response.data.announcements,
                isLoadingGeneralAnnouncements: false
            });
        }
    };

    errorHandlerGeneralAnnouncements = (error) => {

        if(error.response && error.response.status && error.response.status === 401) {
            Authentication.clearData();
            window.location.reload();
            alert("As suas credenciais já não são válidas.");
        }

        this.setState({
            isLoadingGeneralAnnouncements: false
        });
    };

    render() {

        const generalAnnouncements = (
            <div className={"ui fluid card grey"}>
                <Dimmer inverted active={this.state.isLoadingGeneralAnnouncements}>
                    <Loader>{this.state.isLoadingText}</Loader>
                </Dimmer>
                <Card.Content>
                    <Card.Header>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='grey' name='group' />
                        </Icon.Group>
                        Avisos gerais recentes
                        <Button
                            icon
                            size='mini'
                            floated='right'
                            labelPosition='right'
                            onClick={() => this.props.history.push(Routes.HOME_ANNOUNCEMENTS)}
                        >
                            Ver mais
                            <Icon name='plus' />
                        </Button>
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {(this.state.general_announcements.length > 0) ?
                            this.state.general_announcements.map(a => (
                                <Feed.Event key={a.id}>
                                    <Feed.Label>
                                        <Icon name='tasks'/>
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Date content={a.timestamp} />
                                        <Feed.Summary>
                                            {a.title}
                                        </Feed.Summary>
                                        <Feed style={{marginTop: "-3px"}}>
                                            {a.description}
                                        </Feed>
                                    </Feed.Content>
                                </Feed.Event>
                            )) :
                            <Header as='h4' color='grey'>{this.state.message_ga}</Header>
                        }
                    </Feed>
                </Card.Content>
            </div>
        );

        return (
            <Container style={{marginTop: '30px'}}>
                <div className="ui stackable two column centered grid" style={{marginBottom: "65px"}}>
                    <div className="column">
                        {generalAnnouncements}
                    </div>
                    <div className="column">
                        <GenericWeather/>
                    </div>
                </div>
            </Container>
        );
    }
}