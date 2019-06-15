import React, {Component} from 'react';
import {Container, Card, Feed, Icon, Loader, Dimmer, List, Header} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";

class HomePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            personal_announcements: [],
            general_announcements: []
        };
    }

    async componentDidMount() {

        await fetchApi(
            'get','/student/personal_announcements?id=3',
            {},  {},
            this.successHandlerPA, this.errorHandler
        )



        await fetchApi(
            'get','/user/announcements',
            {},  {},
            this.successHandlerA, this.errorHandler
        )

    }

    /**
     * Handle the response of personnalAnnouncements.
     * @param response
     */
    successHandlerPA = (response) => {

        if (response.data.success){
        	this.setState({
        		personal_announcements: response.data.announcements,
        	})
        }
    };

    /**
     * Handle the response of personnalAnnouncements.
     * @param response
     */
    successHandlerA = (response) => {

        if (response.data.success){
        	this.setState({
        		general_announcements: response.data.announcements,
        		isLoading: false
        	})
        }
    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

        console.log(error)
    };

    render() {

        const personalAnnouncements = (
            <div className={"ui fluid card grey"}>
                <Card.Content>
                    <Card.Header>
      					<Icon.Group>
                    		<Icon color='grey' name='user' />
                    	</Icon.Group>
      					Avisos pessoais recentes
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {(this.state.personal_announcements.length > 0) ?
                            this.state.personal_announcements.map(pa => (
                                <Feed.Event key={pa.id}>
                                    <Feed.Label>
                                        <Icon name='tasks'/>
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Date content={pa.timestamp} />
                                        <Feed.Summary>
                                            {pa.title}
                                        </Feed.Summary>
                                        <Feed style={{marginTop: "-3px"}}>
                                            {pa.description}
                                        </Feed>
                                    </Feed.Content>
                                </Feed.Event>
                            )) :
                            <Header as='h4' color='grey'>Sem novos avisos para mostrar.</Header>
                        }
                    </Feed>
                </Card.Content>
            </div>
        );

        const generalAnnouncements = (
            <div className={"ui fluid card grey"}>
                <Card.Content>
                    <Card.Header>
                    	<Icon.Group>
                    		<Icon color='grey' name='group' />
                    	</Icon.Group>
                    	Avisos gerais recentes
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
                            <Header as='h4' color='grey'>Sem avisos para mostrar.</Header>
                        }
                    </Feed>
                </Card.Content>
            </div>
        );

        const nextEvents = (
        	<div className={"ui fluid card grey"}>
	        	<Card.Content>
	                <Card.Header>
	                	<Icon.Group>
                    		<Icon color='grey' name='calendar' />
                    	</Icon.Group>
	                	Próximos eventos
	                </Card.Header>
	            </Card.Content>
	            <Card.Content>
		            <List divided>
		            	{
                            Array.apply(
                                null,
                                { length: 5 }).map((e, i) => (
							    <List.Item key={i} style={{marginBottom: "10px"}}>
							      	<Icon name='calendar outline' />
							      	<List.Content>
							        	<List.Header>Aula Prática - Categoria B</List.Header>
							        	<List.Description>
							          		12 / 01 / 2019
							        	</List.Description>
							        	<List.Description>
							          		17h00
							        	</List.Description>
							      	</List.Content>
							    </List.Item>
							))
						}				    
				  	</List>
			  	</Card.Content>
		  	</div>
        );


        return (
            <Container>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <div className="ui stackable two column centered grid">
                    <div className="column">
                        {personalAnnouncements}
                        {generalAnnouncements}
                    </div>
                    <div className="column">
                        {nextEvents}
                    </div>
                </div>
            </Container>
        );
    }
}

export default HomePage;