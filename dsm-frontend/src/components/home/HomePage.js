import React, {Component} from 'react';
import { Container, Card, Feed, Icon } from 'semantic-ui-react';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
<<<<<<< HEAD
        let card = (
            <Card fluid>
=======
        const cardExample = (
            <div className={"ui fluid card"}>
>>>>>>> fd9bd3dfce6fbcff9b1c71c10598f85c64b6578d
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
                                        <Feed.Summary>
                                            A escola encontra-se encerrada.
                                        </Feed.Summary>
                                        <Feed.Date content='há 1 dia' />
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