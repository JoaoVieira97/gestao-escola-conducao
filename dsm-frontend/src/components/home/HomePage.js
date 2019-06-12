import React, {Component} from 'react';
import {Container, Card, Feed, Icon, Loader, Dimmer} from 'semantic-ui-react';

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

        const cardExample = (
            <div className={"ui fluid card"}>
                <Card.Content>
                    <Card.Header>Avisos Recentes</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {
                            Array.apply(
                                null,
                                { length: 7 }).map((e, i) => (
                                <Feed.Event key={i}>
                                    <Feed.Label>
                                        <Icon name='tasks'/>
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Date content='há 1 dia' />
                                        <Feed.Summary>
                                            A escola encontra-se encerrada.
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                            ))
                        }
                    </Feed>
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
                        {cardExample}
                    </div>
                    <div className="column">
                        {cardExample}
                    </div>
                </div>
            </Container>
        );
    }
}

export default HomePage;