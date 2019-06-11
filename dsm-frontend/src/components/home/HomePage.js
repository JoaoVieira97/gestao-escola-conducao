import React, {Component} from 'react';
import { Grid, Container, Header, Card, Feed, Icon } from 'semantic-ui-react';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        let card = (
            <Card fluid scroll>
                <Card.Content>
                    <Card.Header>Avisos Recentes</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
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

                        <Feed.Event>
                            <Feed.Label>
                                <Icon name='tasks'/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date content='há 3 dias' />
                                <Feed.Summary>
                                    A escola encontra-se encerrada.
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Label>
                                <Icon name='tasks'/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date content='há 4 dias' />
                                <Feed.Summary>
                                    A escola encontra-se encerrada.
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Label>
                                <Icon name='tasks'/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date content='há 4 dias' />
                                <Feed.Summary>
                                    A escola encontra-se encerrada.
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Label>
                                <Icon name='tasks'/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date content='há 4 dias' />
                                <Feed.Summary>
                                    A escola encontra-se encerrada.
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Label>
                                <Icon name='tasks'/>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Date content='há 4 dias' />
                                <Feed.Summary>
                                    A escola encontra-se encerrada.
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>
        );

        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            {card}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            {card}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default HomePage;