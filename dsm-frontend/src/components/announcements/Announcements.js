import React, {Component} from 'react';
import {
    Container, 
    Breadcrumb, 
    Card, 
    Feed, 
    Icon, 
    Loader, 
    Dimmer, 
    Header, 
    Grid,
    Pagination
} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";

class Announcements extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            general_announcements: [],
            page_announcements: [],
            message_ga: 'Sem avisos para mostrar.',
            page: 1
        };
    }

    componentDidMount() {

        fetchApi(
            'get','/user/announcements?filter=all',
            {},  {},
            this.successHandlerA, this.errorHandlerA
        );
        
    }

    /**
     * Handle the response of general Announcements.
     * @param response
     */
    successHandlerA = async (response) => {

        const chunks = []

        while (response.data.announcements.length > 0){
            chunks.push(response.data.announcements.splice(0, 7));
        }
        
        this.setState({
            general_announcements: chunks,
            isLoading: false
        });

        if (chunks.length > 0){
            this.setState({
                page_announcements: chunks[0]
            })
        }
    
    };

    /**
     * Handle the error retrieving general announcements.
     * @param error
     */
    errorHandlerA = async (error) => {

    	console.log('error retrieving general announcements')
        console.log(error)
        await this.setState({
            message_ga: 'Não foi possível obter avisos gerais.',
            isLoading: false
        });

    };

    onChangePage(event, data) {
        const {activePage} = data;

        if (activePage !== this.state.page) {
            this.setState({
                page: activePage,
                page_announcements: this.state.general_announcements[activePage - 1]
            });
        }
    }

    render(){

        return(
            <Container>

                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>

                <Grid centered style={{marginBottom: "65px"}}>
                    <Grid.Column width={16}>

                        <Breadcrumb size='large'>
                            <Breadcrumb.Section
                                style={{color: 'grey'}}
                                onClick={() => this.props.history.push('/home')}
                            >
                                Ínicio
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>Anúncios gerais</Breadcrumb.Section>
                        </Breadcrumb>

                    </Grid.Column>
                    <Grid.Column width={10}>

                        <div className={"ui fluid card grey"}>
                            <Card.Content>
                                <Card.Header>
                                    <Icon.Group style={{marginRight: "8px"}}>
                                        <Icon color='grey' name='group' />
                                    </Icon.Group>
                                    Avisos gerais
                                </Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Feed>
                                    {(this.state.page_announcements.length > 0) ?
                                        this.state.page_announcements.map(a => (
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
                        <Pagination
                            floated='right'
                            style={{marginTop: "-10px"}}
                            firstItem={null}
                            lastItem={null}
                            boundaryRange={0}
                            defaultActivePage={1}
                            ellipsisItem={null}
                            totalPages={this.state.general_announcements.length}
                            onPageChange={this.onChangePage.bind(this)}
                        />
                    </Grid.Column>
                </Grid>

            </Container>
        );
    }

}

export default Announcements;