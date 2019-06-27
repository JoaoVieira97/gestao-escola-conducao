import React, {Component} from 'react';
import {Container, Card, Feed, Icon, Loader, Dimmer, List, Header, Button, Popup} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";
import Routes from "../../services/Routes";

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
            message_e: 'Sem eventos para mostrar.',
            mark_as_viewed: ''
        };
    }

    componentDidMount() {
        
        fetchApi(
            'get','/student/personal_announcements',
            {},  {},
            this.successHandlerPA, this.errorHandlerPA
        );

        fetchApi(
            'get','/user/announcements?filter=recent',
            {},  {},
            this.successHandlerA, this.errorHandlerA
        );

        fetchApi(
            'get','/student/next_practical_lessons',
            {},  {},
            this.successHandlerPL, this.errorHandlerE
        );

        fetchApi(
            'get','/student/next_exams',
            {},  {},
            this.successHandlerE, this.errorHandlerE
        );
        
    }

    /**
     * Handle the response of personnalAnnouncements.
     * @param response
     */
    successHandlerPA = async (response) => {

        await this.setState({
    		personal_announcements: response.data.announcements,
        });

    };

    /**
     * Handle the response of general Announcements.
     * @param response
     */
    successHandlerA = async (response) => {

        await this.setState({
       		general_announcements: response.data.announcements,
        });
    
    };

    /**
     * Handle the response of next student practical lessons.
     * @param response
     */
    successHandlerPL = async (response) => {

        await this.setState({
            next_practical_lessons: response.data.lessons,
        });

    };

    /**
     * Handle the response of next student exams.
     * @param response
     */
    successHandlerE = async (response) => {

        await this.setState({
            next_exams: response.data.exams,
            isLoading: false
        });

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
        });

    };

    /**
     * Handle the error retrieving general announcements.
     * @param error
     */
    errorHandlerA = async (error) => {

    	console.log('error retrieving general announcements')
        console.log(error)
        await this.setState({
            message_ga: 'Não foi possível obter avisos gerais.'
        });

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
        });

    };

    viewedAnnouncement(pa){

        this.setState({
            mark_as_viewed: pa.id
        });

        fetchApi(
            'post','/student/viewed_personal_announcement',
            {
            	id: pa.id
            },  {},
            this.successHandlerViewed, this.errorHandlerViewed
        );

    }

    successHandlerViewed = async (response) => {

        this.setState({
            personal_announcements: this.state.personal_announcements.filter((pa) => pa.id !== this.state.mark_as_viewed),
        });

    };

    errorHandlerViewed = async (error) => {

    	console.log(error);

    };

    render() {

        const next_events = this.state.next_practical_lessons.concat(this.state.next_exams) 
        next_events.sort(function(e1, e2) {
            let date1 = e1.startTime
            let aux1 = date1.split(" ")[0]
            let aux_date1 = aux1.split("/")
            let e1_date = aux_date1[2] + '-' + aux_date1[1] + '-' + aux_date1[0] + 'T' + date1.split(" ")[1]

            let date2 = e2.startTime
            let aux2 = date2.split(" ")[0]
            let aux_date2 = aux2.split("/")
            let e2_date = aux_date2[2] + '-' + aux_date2[1] + '-' + aux_date2[0] + 'T' + date2.split(" ")[1]

            return new Date(e1_date) - new Date(e2_date);
        });

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
                                    <Feed.Content>
                                        <Popup content="Marcar anúncio como visto" trigger={
                                            <Button
                                                icon
                                                floated='right'
                                                onClick={() => {this.viewedAnnouncement(pa)}}
                                            >
                                                <Icon name='eye' />
                                            </Button>
                                        }/>
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
                <div className="ui stackable two column centered grid" style={{marginBottom: "65px"}}>
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