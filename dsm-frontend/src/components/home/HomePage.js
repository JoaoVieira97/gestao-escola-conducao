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
            next_exams: [],
            message_pa: 'Sem novos avisos para mostrar.',
            message_ga: 'Sem avisos para mostrar.',
            message_e: 'Sem eventos para mostrar.'
        };
    }

    async componentDidMount() {
        
        await fetchApi(
            'get','/student/personal_announcements?id=3',
            {},  {},
            this.successHandlerPA, this.errorHandlerPA
        )

        await fetchApi(
            'get','/user/announcements',
            {},  {},
            this.successHandlerA, this.errorHandlerA
        )

        await fetchApi(
            'get','/student/next_practical_lessons?id=3',
            {},  {},
            this.successHandlerPL, this.errorHandlerE
        )

        await fetchApi(
            'get','/student/next_exams?id=3',
            {},  {},
            this.successHandlerE, this.errorHandlerE
        )
        
    }

    /**
     * Handle the response of personnalAnnouncements.
     * @param response
     */
    successHandlerPA = async (response) => {

        await this.setState({
    		personal_announcements: response.data.announcements,
        })

    };

    /**
     * Handle the response of personnalAnnouncements.
     * @param response
     */
    successHandlerA = async (response) => {

        await this.setState({
       		general_announcements: response.data.announcements,
        })
    
    };

    /**
     * Handle the response of next student practical lessons.
     * @param response
     */
    successHandlerPL = async (response) => {

        await this.setState({
            next_practical_lessons: response.data.lessons,
        })

    };

    /**
     * Handle the response of next student exams.
     * @param response
     */
    successHandlerE = async (response) => {

        await this.setState({
            next_exams: response.data.exams,
            isLoading: false
        })

    };

    /**
     * Handle the error retrieving student personal announcements.
     * @param error
     */
    errorHandlerPA = async (error) => {

    	console.log('error retrieving personal announcements')
        console.log(error)
        await this.setState({
            message_pa: 'Não foi possível obter avisos pessoais.'
        })

    };

    /**
     * Handle the error retrieving general announcements.
     * @param error
     */
    errorHandlerPA = async (error) => {

    	console.log('error retrieving general announcements')
        console.log(error)
        await this.setState({
            message_ga: 'Não foi possível obter avisos gerais.'
        })

    };

    /**
     * Handle the error retrieving next student events.
     * @param error
     */
    errorHandlerE = async (error) => {

    	console.log('error retrieving next events')
        console.log(error)
        await this.setState({
            message_e: 'Não foi possível obter avisos gerais.',
            isLoading: false
        })

    };

    render() {

        const next_events = this.state.next_practical_lessons.concat(this.state.next_exams) 
        next_events.sort(function(e1, e2) {
            return new Date(e1.startTime) - new Date(e2.startTime);
        });

        const p_announcements = this.state.personal_announcements
        p_announcements.sort(function(pa1, pa2) {
            return new Date(pa2.timestamp) - new Date(pa1.timestamp);
        });

        const g_announcements = this.state.general_announcements
        g_announcements.sort(function(ga1, ga2) {
            return new Date(ga2.timestamp) - new Date(ga1.timestamp);
        });

        //console.log(next_events)

        const personalAnnouncements = (
            <div className={"ui fluid card grey"}>
                <Card.Content>
                    <Card.Header>
      					<Icon.Group style={{marginRight: "8px"}}>
                    		<Icon color='grey' name='user' />
                    	</Icon.Group>
      					Avisos pessoais recentes
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {(p_announcements.length > 0) ?
                            p_announcements.map(pa => (
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
                            <Header as='h4' color='grey'>{this.state.message_pa}</Header>
                        }
                    </Feed>
                </Card.Content>
            </div>
        );

        const generalAnnouncements = (
            <div className={"ui fluid card grey"}>
                <Card.Content>
                    <Card.Header>
                    	<Icon.Group style={{marginRight: "8px"}}>
                    		<Icon color='grey' name='group' />
                    	</Icon.Group>
                    	Avisos gerais recentes
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {(g_announcements.length > 0) ?
                            g_announcements.map(a => (
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

        const nextEvents = (
        	<div className={"ui fluid card grey"}>
	        	<Card.Content>
	                <Card.Header>
	                	<Icon.Group style={{marginRight: "8px"}}>
                    		<Icon color='grey' name='calendar' />
                    	</Icon.Group>
	                	Próximos eventos
	                </Card.Header>
	            </Card.Content>
	            <Card.Content>
		            <List divided>
		            	{(next_events.length > 0) ?
                            next_events.map(e => (
							    <List.Item key={next_events.indexOf(e)} style={{marginBottom: "10px"}}>
							      	<Icon name='calendar outline' />
							      	<List.Content>
                                        {(e.duration) ?
							        	    <List.Header>Aula Prática</List.Header> :
                                            <List.Header>{e.description}</List.Header>
                                        }
							        	<List.Description style={{marginTop: "3px"}}>
							          		{e.startTime.split(" ")[0]}
							        	</List.Description>
							        	<List.Description style={{marginTop: "3px"}}>
                                            {e.startTime.split(" ")[1]}
							        	</List.Description>
							      	</List.Content>
							    </List.Item>
							)) :
                            <Header as='h4' color='grey'>{this.state.message_e}</Header>
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