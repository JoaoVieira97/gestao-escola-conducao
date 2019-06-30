import React, {Component} from 'react';
import {
    Header,
    Icon,
    Card,
    Grid,
    List,
    Button,
    Container, Modal,
} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";
import moment from 'moment';
import Routes from "../../services/Routes";

class InstructorLessons extends Component {

    constructor(props) {
        super(props);

        this.state = {

            // Loading
            isLoading : true,

            nextPracticalLessons: [],

            nextTheoreticalLessons: [],

            openedPracticalLessons: [],

            openedTheoreticalLessons: [],

            modalCancelOpen: false,
        };
    }

    componentDidMount() {

        fetchApi(
            'get','/lessons/instructor/all_lessons?state=reserved&type=practical',
            {},  {},
            this.successFetchNextPracticalLessons, this.errorFetchNextPracticalLessons
        );

        fetchApi(
            'get','/lessons/instructor/all_lessons?state=reserved&type=theoretical',
            {},  {},
            this.successFetchNextTheoreticalLessons, this.errorFetchNextTheoreticalLessons
        );

        fetchApi(
            'get','/lessons/instructor/all_lessons?state=opened&type=practical',
            {},  {},
            this.successFetchOpenedPracticalLessons, this.errorFetchOpenedPracticalLessons
        );

        fetchApi(
            'get','/lessons/instructor/all_lessons?state=opened&type=theoretical',
            {},  {},
            this.successFetchOpenedTheoreticalLessons, this.errorFetchOpenedTheoreticalLessons
        );

    }

    /**
     * Handle the response of next practical lessons of a specific instructor.
     * @param response
     */
    successFetchNextPracticalLessons = async (response) => {

        const data = response.data;

        await this.setState({
           nextPracticalLessons: data.practicalLessons,
        });

        console.log('FETCH1');
        console.log(data);

    };

    successFetchNextTheoreticalLessons = async (response) => {

        const data = response.data;

        await this.setState({
            nextTheoreticalLessons: data.theoreticalLessons,
        });

        console.log('FETCH2');
        console.log(data);
    };

    successFetchOpenedPracticalLessons = async (response) => {

        const data = response.data;

        await this.setState({
            openedPracticalLessons: data.practicalLessons,
        });

        console.log('FETCH3');
        console.log(data);
    };

    successFetchOpenedTheoreticalLessons = async (response) => {

        const data = response.data;

        await this.setState({
            openedTheoreticalLessons: data.theoreticalLessons,
        });

        console.log('FETCH4');
        console.log(data);
    };

    /**
     -------------------- ERROR FETCHS ---------------------------
     */


    /**
     * Handle the error retrieving next practical lessons.
     * @param error
     */
    errorFetchNextPracticalLessons = (error) => {


        console.log('ERROR1');
        console.log(error);
        this.setState({
            //messageLesson: 'Não foi possível obter as suas próximas aulas marcadas.',
            isLoading: false,
        })

    };


    errorFetchNextTheoreticalLessons = (error) => {

        console.log('ERROR2');
        console.log(error);
        this.setState({
            //messageLesson: 'Não foi possível obter as suas próximas aulas marcadas.',
            isLoading: false,
        })

    };


    errorFetchOpenedPracticalLessons = (error) => {

        console.log('ERROR3');console.log(error);
        this.setState({
            //messageLesson: 'Não foi possível obter as suas próximas aulas marcadas.',
            isLoading: false,
        })

    };

    errorFetchOpenedTheoreticalLessons = (error) => {

        console.log('ERROR4');console.log(error);
        this.setState({
            messageLesson: 'Não foi possível obter as suas próximas aulas marcadas.',
            isLoading: false,
        })

    };

    /**
     -------------------- HANDLE ACTIONS (AND FETCHES) ---------------------------
     */


    render() {

        const cardNextPracticalLessons = (
            <Card fluid raised color={'blue'} >
                <Card.Content>
                    <Card.Header style={{color: '#2185d0'}}>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='blue' name='calendar' />
                        </Icon.Group>
                        {'Aulas Práticas Futuras'}
                    </Card.Header>
                </Card.Content>
                <Card.Content >
                    <div style={{ width:'100%', height:'200px', overflowY:'200px'}}>
                        <List divided >
                            {
                            this.state.nextPracticalLessons.length === 0 ?
                                <List.Item disabled>
                                    <List.Content>
                                        <Header as='h4' color='grey'>{'Sem aulas práticas marcadas.'}</Header>
                                    </List.Content>
                                </List.Item>
                                :
                                this.state.nextPracticalLessons.map(lesson => (
                                    <List.Item key={lesson.id} style={{marginBottom: "10px"}}>
                                        {
                                        <Modal trigger={
                                            <Button floated='right' icon labelPosition='right'
                                                    inverted color='red'
                                                    onClick={() => this.setState({modalCancelOpen: true})}>
                                                <Icon name='times circle outline'/>
                                                {
                                                    'Cancelar'
                                                }
                                            </Button>
                                        }
                                               size='small'
                                               open={this.state.modalCancelOpen}
                                               onClose={() => this.setState({modalCancelOpen: false})}
                                        >
                                            <Header icon='delete calendar' content='Cancelar Aula'/>
                                            <Modal.Content>
                                                <p>
                                                    Tem a certeza que pretende cancelar esta aula?
                                                </p>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button color='red' inverted
                                                        onClick={() => this.setState({modalCancelOpen: false})}>
                                                    <Icon name='remove'/> Não
                                                </Button>
                                                <Button color='green' inverted
                                                        onClick={() => this.handleLessonCancel(lesson.id)}>
                                                    <Icon name='checkmark'/> Sim
                                                </Button>
                                            </Modal.Actions>
                                        </Modal>
                                        }
                                        <Icon name='calendar outline' />
                                        <List.Content>
                                            <List.Header>Aula Prática</List.Header>
                                            <List.Description style={{marginTop: "3px"}}>
                                                <b>Início:</b> {" "+ lesson.startTime.split(" ")[0]} às
                                                {" " + lesson.startTime.split(" ")[1].replace(":","h")+"min"}
                                            </List.Description>
                                            <List.Description style={{marginTop: "3px"}}>
                                                <b>Duração:</b> {lesson.duration +" min"}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                ))
                            }
                        </List>
                    </div>
                </Card.Content>
            </Card>
        );
        const cardNextTheoreticalLessons = (
            <Card fluid raised color={'orange'}>
                <Card.Content>
                    <Card.Header style={{color: '#f2711c'}}>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='orange' name='calendar' />
                        </Icon.Group>
                        {'Aulas Teóricas Futuras'}
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <List divided>
                        {
                            this.state.nextTheoreticalLessons.length === 0 ?
                                <List.Item disabled>
                                    <List.Content>
                                        <Header as='h4' color='grey'>{'Sem aulas teóricas marcadas.'}</Header>
                                    </List.Content>
                                </List.Item>
                                :
                                this.state.nextTheoreticalLessons.map(lesson => (
                                    <List.Item key={lesson.id} style={{marginBottom: "10px"}}>
                                        <Icon name='calendar outline' />
                                        <List.Content>
                                            <List.Header>Aula Prática</List.Header>
                                            <List.Description style={{marginTop: "3px"}}>
                                                <b>Início:</b> {" "+ lesson.startTime.split(" ")[0]} às
                                                {" " + lesson.startTime.split(" ")[1].replace(":","h")+"min"}
                                            </List.Description>
                                            <List.Description style={{marginTop: "3px"}}>
                                                <b>Duração:</b> {lesson.duration +" min"}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                ))
                        }
                    </List>
                </Card.Content>
            </Card>
        );
        //const cardOpenedPracticalLessons;
        //const cardOpenedTHeoreticalLessons;

        return (
            <Container style={{marginTop: 30, marginBottom:'20%'}}>
                <Grid divided={'vertically'}>
                    <Grid.Row>
                        <Grid stackable centered columns={2}>
                            <Grid.Column>
                                {cardNextPracticalLessons}
                            </Grid.Column>
                            <Grid.Column>
                                {cardNextTheoreticalLessons}
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid stackable centered columns={2}>
                            <Grid.Column>
                                {cardNextPracticalLessons}
                            </Grid.Column>
                            <Grid.Column>
                                {cardNextTheoreticalLessons}
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default InstructorLessons;