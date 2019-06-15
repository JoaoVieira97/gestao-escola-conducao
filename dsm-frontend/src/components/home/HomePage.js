import React, {Component} from 'react';
import {Container, Card, Feed, Icon, Loader, Dimmer, List, Divider} from 'semantic-ui-react';

class HomePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        setTimeout(()=>{
            this.setState({isLoading: false});
        }, 1000);
    }

    render() {

        const personalAnnouncements = (
            <div className={"ui fluid card pink"}>
                <Card.Content labeled left>
                    <Card.Header>
      					<Icon.Group>
                    		<Icon color='grey' name='user' />
                    	</Icon.Group>
      					Avisos pessoais recentes
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {
                            Array.apply(
                                null,
                                { length: 4 }).map((e, i) => (
                                <Feed.Event key={i}>
                                    <Feed.Label>
                                        <Icon name='tasks'/>
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Date content='há 1 dia' />
                                        <Feed.Summary>
                                            O teu exame está marcado para dia 23 de Julho.
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                            ))
                        }
                    </Feed>
                </Card.Content>
            </div>
        );

        const generalAnnouncements = (
            <div className={"ui fluid card pink"}>
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
                        {
                            Array.apply(
                                null,
                                { length: 5 }).map((e, i) => (
                                <Feed.Event key={i}>
                                    <Feed.Label>
                                        <Icon name='tasks'/>
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Date content='há 1 dia' />
                                        <Feed.Summary>
                                            A escola encontra-se encerrada no próximo dia 1 de Julho.
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                            ))
                        }
                    </Feed>
                </Card.Content>
            </div>
        );

        const nextEvents = (
        	<div className={"ui fluid card pink"}>
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
							    <List.Item style={{marginBottom: "10px"}}>
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