import React, {Component} from 'react';
import {Container, Card, Feed, Icon, Loader, Dimmer, List, Header} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";

class HomePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            personal_announcements: [],
            general_announcements: [],
            next_practical_lessons: [],
            next_exams: []
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

        await fetchApi(
            'get','/student/next_practical_lessons?id=3',
            {},  {},
            this.successHandlerPL, this.errorHandler
        )

        await fetchApi(
            'get','/student/next_exams?id=3',
            {},  {},
            this.successHandlerE, this.errorHandler
        )
        
    }

    /**
     * Handle the response of personnalAnnouncements.
     * @param response
     */
    successHandlerPA = async (response) => {

        if (response.data.success){
        	await this.setState({
        		personal_announcements: response.data.announcements,
        	})
        }

    };

    /**
     * Handle the response of personnalAnnouncements.
     * @param response
     */
    successHandlerA = async (response) => {

        if (response.data.success){
        	await this.setState({
        		general_announcements: response.data.announcements,
        	})
        }

    };

    /**
     * Handle the response of next student practical lessons.
     * @param response
     */
    successHandlerPL = async (response) => {

        if (response.data.success){
            await this.setState({
                next_practical_lessons: response.data.lessons,
            })
        }

    };

    /**
     * Handle the response of next student exams.
     * @param response
     */
    successHandlerE = async (response) => {

        if (response.data.success){
            await this.setState({
                next_exams: response.data.exams,
                isLoading: false
            })
        } else {
            await this.setState({
                isLoading: false
            })
        }

    };


    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

    	console.log('erro')

        console.log(error)

    };

    render() {

        const next_events = this.state.next_practical_lessons.concat(this.state.next_exams)
        
        next_events.sort(function(e1, e2) {
            return new Date(e1.startTime) - new Date(e2.startTime);
        });

        console.log(next_events)

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
		            	{(next_events.length > 0) ?
                            next_events.map(e => (
							    <List.Item key={e.id} style={{marginBottom: "10px"}}>
							      	<Icon name='calendar outline' />
							      	<List.Content>
                                        {(e.duration) ?
							        	    <List.Header>Aula Prática</List.Header> :
                                            <List.Header>{e.description}</List.Header>
                                        }
							        	<List.Description>
							          		{e.startTime}
							        	</List.Description>
							        	<List.Description>
							          		__Horas__
							        	</List.Description>
							      	</List.Content>
							    </List.Item>
							)) :
                            <Header as='h4' color='grey'>Sem eventos para mostrar.</Header>
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