import React, {Component} from 'react';
import {
    Header,
    Icon,
    Card,
    Grid,
    List,
    Button,
    Container, Modal, Loader, Dimmer,
} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";
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
            lessonCanceled: -1,

            modalFinalizePractical: false,
            lessonFinalize: -1,
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

        setTimeout(
            () => this.setState({
            isLoading: false,}) , 2000);

    }

    /**
     * Handle the response of next practical lessons of a specific instructor.
     * @param response
     */
    successFetchNextPracticalLessons = async (response) => {

        //buscar com a data futura

        const data = response.data;

        await this.setState({
           nextPracticalLessons: data.practicalLessons,
        });

    };

    successFetchNextTheoreticalLessons = async (response) => {
        const data = response.data;

        await this.setState({
            nextTheoreticalLessons: data.theoreticalLessons,
        });


    };

    successFetchOpenedPracticalLessons = async (response) => {

        const data = response.data;

        await this.setState({
            openedPracticalLessons: data.practicalLessons,
        });

    };

    successFetchOpenedTheoreticalLessons = async (response) => {

        const data = response.data;

        await this.setState({
            openedTheoreticalLessons: data.theoreticalLessons,
        });

    };

    /**
     -------------------- ERROR FETCHS ---------------------------
     */


    /**
     * Handle the error retrieving next practical lessons.
     * @param error
     */
    errorFetchNextPracticalLessons = (error) => {

        this.setState({
            //messageLesson: 'Não foi possível obter as suas próximas aulas marcadas.',
            isLoading: false,
        })

    };


    errorFetchNextTheoreticalLessons = (error) => {


        this.setState({
            //messageLesson: 'Não foi possível obter as suas próximas aulas marcadas.',
            isLoading: false,
        })

    };


    errorFetchOpenedPracticalLessons = (error) => {

        this.setState({
            //messageLesson: 'Não foi possível obter as suas próximas aulas marcadas.',
            isLoading: false,
        })

    };

    errorFetchOpenedTheoreticalLessons = (error) => {

        this.setState({
            messageLesson: 'Não foi possível obter as suas próximas aulas marcadas.',
            isLoading: false,
        })

    };

    /**
     -------------------- HANDLE ACTIONS (AND FETCHES) ---------------------------
     */


    /**
     * Handle the cancel of a practical lesson
     * @param lesson
     */
    handleCancelPracticalLesson = (lesson) => {

        this.setState({modalCancelOpen: false})

    };

    /**
     * Render Modal to cancel practical lesson
     * @param lesson
     * @returns {*}
     */
    renderModalCancelPractical(lesson) {
        return (
            <Modal trigger={
                <Button floated='right' icon labelPosition='right'
                        inverted color='red'
                        onClick={() => this.setState({modalCancelOpen: true, lessonCanceled: lesson.id})}>
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
                            onClick={() => this.handleCancelPracticalLesson(this.state.lessonCanceled)}>
                        <Icon name='checkmark'/> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }


    /**
     * Handle the finalize practical lesson
     * @param response
     * @param lesson
     */
    handleFinalizePracticalLesson = (response, lesson) => {

        this.setState({modalFinalizePractical: false});

        console.log(response);
        console.log(lesson);

        //state reserved -> realized
        //response=true -> mudar isStudentPresent
        //
    };

    /**
     * Render Modal to finalize practical Lesson
     * @param lesson
     * @returns {*}
     */
    renderModalPractical(lesson) {
        return (
            <Modal trigger={
                <Button floated='right' icon labelPosition='right'
                        inverted color='blue'
                    onClick={() => this.setState({modalFinalizePractical: true, lessonFinalize: lesson.id})}
                >
                    <Icon name='tasks'/>
                    {'Registar Presença'}
                </Button>
            }
                   size='small'
                   open={this.state.modalFinalizePractical}
                   onClose={() => this.setState({modalFinalizePractical: false})}
            >
                <Header icon='clipboard check' content='Registar Presença Aula Prática'/>
                <Modal.Content>
                    <p>
                        O aluno compareceu à aula?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' inverted
                            onClick={() => this.handleFinalizePracticalLesson(false, this.state.lessonFinalize)}>
                        <Icon name='remove'/> Não
                    </Button>
                    <Button color='green' inverted
                            onClick={() => this.handleFinalizePracticalLesson(true, this.state.lessonFinalize)}>
                        <Icon name='checkmark'/> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }


    /**
     * Enable scroll or not
     * @param array
     * @returns {*}
     */
    styleCard = (array) => {

        if( array.length >= 5) {
            return {
                height:'350px',
                overflow:'auto' ,
                overflowY:'350px',
            }
        }
        else return {};
    };

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
                    <div style={this.styleCard(this.state.nextPracticalLessons)}>
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
                                        {this.renderModalCancelPractical(lesson)}
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
                                            <List.Description style={{marginTop: "3px"}}>
                                                <b>Aluno:</b> {lesson.students.collection[0].name}
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
                        <Button floated='right'
                                color='black'
                                onClick={() => this.props.history.push({
                                    pathname: Routes.NEW_THEORETICAL,
                                    //state: {}
                                })}
                        >
                            {'MARCAR AULA'}
                        </Button>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='orange' name='calendar' />
                        </Icon.Group>
                        {'Aulas Teóricas Futuras'}
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <div style={this.styleCard(this.state.nextTheoreticalLessons)}>
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
                    </div>
                </Card.Content>
            </Card>
        );
        const cardOpenedPracticalLessons = (
            <Card fluid raised color={'blue'} >

                <Card.Content>
                    <Card.Header style={{color: '#2185d0'}}>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='blue' name='calendar' />
                        </Icon.Group>
                        {'Aulas Práticas em Aberto'}
                    </Card.Header>
                </Card.Content>
                <Card.Content >
                    <div style={this.styleCard(this.state.openedPracticalLessons)}>
                        <List divided >
                            {
                                this.state.openedPracticalLessons.length === 0 ?
                                    <List.Item disabled>
                                        <List.Content>
                                            <Header as='h4' color='grey'>{'Sem aulas práticas em aberto.'}</Header>
                                        </List.Content>
                                    </List.Item>
                                    :
                                    this.state.openedPracticalLessons.map(lesson => (
                                        <List.Item key={lesson.id} style={{marginBottom: "10px"}}>
                                            {this.renderModalPractical(lesson)}
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
                                                <List.Description style={{marginTop: "3px"}}>
                                                    <b>Aluno:</b> {lesson.students.collection[0].name}
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
        const cardOpenedTheoreticalLessons = (
            <Card fluid raised color={'orange'} >

                <Card.Content>
                    <Card.Header style={{color: '#f2711c'}}>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='orange' name='calendar' />
                        </Icon.Group>
                        {'Aulas Teóricas em Aberto'}
                    </Card.Header>
                </Card.Content>
                <Card.Content >
                    <div style={this.styleCard(this.state.openedTheoreticalLessons)}>
                        <List divided >
                            {
                                this.state.openedTheoreticalLessons.length === 0 ?
                                    <List.Item disabled>
                                        <List.Content>
                                            <Header as='h4' color='grey'>{'Sem aulas teóricas em aberto.'}</Header>
                                        </List.Content>
                                    </List.Item>
                                    :
                                    this.state.openedTheoreticalLessons.map(lesson => (
                                        <List.Item key={lesson.id} style={{marginBottom: "10px"}}>
                                            <Button floated='right' icon labelPosition='right'
                                                    inverted color='orange'
                                                    onClick={() => this.props.history.push({
                                                        pathname: Routes.FINALIZE_THEORETICAL,
                                                        state: {
                                                            lesson: lesson,
                                                        }
                                                    })}
                                            >
                                                <Icon name='tasks'/>
                                                {'Registar Presenças'}
                                            </Button>
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

        return (
            <Container style={{marginTop: 30, marginBottom:'10%'}}>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Grid divided={'vertically'}>
                    <Grid.Row>
                        <Grid stackable centered columns={2}>
                            <Grid.Column>
                                <Grid.Row>
                                    {cardNextPracticalLessons}
                                    {cardOpenedPracticalLessons}
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid.Row>
                                {cardNextTheoreticalLessons}
                                {cardOpenedTheoreticalLessons}
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default InstructorLessons;