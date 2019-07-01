import React, {Component} from 'react';
import {
    Container,
    Header, 
    Grid,
    Button,
    Dimmer,
    Loader,
    Breadcrumb,
    Card,
    List,
    Icon,
    Modal
} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";
import Routes from "../../services/Routes";
import Authentication from "../../services/Authentication";
import moment from 'moment';

class RegisterPersonalAnnouncement extends Component {

    constructor(props){
        super(props);

        this.state = {
            student: {},

            lessons: [],
            message: '',
            error: '',
            isLoading: true,
            modalCancelOpen: false,
            lesson_canceled: '',
        };
    }

    async componentDidMount(){
        
        await this.setState({
            student: this.props.location.state.student,
        })

        fetchApi(
            'get','/user/school_information?schoolId=1',
            {},  {},
            this.successFetchSchoolInformation, this.errorFetch
        );

    }

    successFetchSchoolInformation = async (response) => {
        const data = response.data.schoolInfo;
        //console.log(data)

        await this.setState({
            maxTimeToCancel: data.maxTimeToCancel
        });

        fetchApi(
            'get','/student/next_practical_lessons?studentID=' + this.state.student.id,
            {},  {},
            this.successFetchNextPracticalLessons, this.errorFetch
        );
    };

    successFetchNextPracticalLessons = (response) => {
        console.log(response.data.lessons)

        let lessons = []
        let limit = this.state.maxTimeToCancel.split(":");
        let amount, unit;

        if((amount = parseInt(limit[0],10)) > 0) unit = 'hours';
        else {
            amount = parseInt(limit[1],10);
            unit= 'minutes';
        }

        let dateLimitCancel = moment().add(amount,unit).format();

        response.data.lessons.forEach(function(lesson) {

            const practDateSplit = lesson.startTime.split(/[/ ]/);
            let isoPractDate = practDateSplit[2] + "-" + practDateSplit[1] + "-" + practDateSplit[0] + "T" + practDateSplit[3];
            let canCancel = moment(isoPractDate).isAfter(dateLimitCancel);

            lessons.push({
                id: lesson.id,
                startTime: lesson.startTime,
                duration: lesson.duration,
                canCancel: canCancel,  
                category: lesson.categories.collection[0].name      
            })
        })

        //console.log(lessons)
        this.setState({
            lessons: lessons,
            isLoading: false
        })
    }

    errorFetch = (error) => {
        if(error.response && error.response.status && error.response.status === 400) {
            this.setState({
                isLoading: false,
                message: '',
                error: 'Ocorreu um erro. Tente novamente.'
            })
        }
        else if(error.response && error.response.status && error.response.status === 401) {
            Authentication.clearData();
            window.location.reload();
            alert("As suas credenciais já não são válidas.");
        }
    }

    /**
     * When user select cancel practical lesson.
     */
    handleLessonCancel = (lessonId) => {
        
        this.setState({
            modalCancelOpen: false
        });

        fetchApi(
            'post','/lesson/cancel_lesson',
            {
                lessonId: lessonId,
            },  {},
            this.successHandlerCanceled, this.errorHandlerCanceled
        );

    };

    /**
     * Handle the success of the handle lesson cancel.
     * @param response
     */
    successHandlerCanceled = (response) => {

        let lesson_canceled = this.state.lesson_canceled

        if(response.data.success){
            let new_lessons = this.state.lessons.filter(function(less) { return less.id !== lesson_canceled})
            this.setState({
                lessons: new_lessons
            })
        }
        else{
            //TODO UMA MENSAGEM DE ERRO APARECER
            console.log("ERRO AO CANCELAR AULA!!");
        }
    };

    /**
     * Handle the error of the handle lesson cancel.
     * @param error
     */
    errorHandlerCanceled = (error) => {
        console.log(error)
        if(error.response && error.response.status && error.response.status === 400) {
            this.setState({
                message: '',
                error: 'Ocorreu um erro. Tente novamente.'
            })
        }
        else if(error.response && error.response.status && error.response.status === 401) {
            Authentication.clearData();
            window.location.reload();
            alert("As suas credenciais já não são válidas.");
        }
    };

    renderModal(lesson) {
        return (
            <Modal trigger={
                <Button floated='right' icon labelPosition='right'
                        inverted color='red'
                        onClick={() => this.setState({modalCancelOpen: true, lesson_canceled: lesson.id})}>
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
                            onClick={() => this.handleLessonCancel(this.state.lesson_canceled)}>
                        <Icon name='checkmark'/> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }

    render(){

        const nextPracticalLessons = (
            <Card fluid raised>
                <Card.Content>
                    <Card.Header style={{color: '#2185d0'}}>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='blue' name='calendar' />
                        </Icon.Group>
                        {'Aulas Práticas Futuras de ' + this.state.student.name}
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <List divided>
                        {
                            this.state.lessons.length === 0 ?
                            <List.Item disabled>
                                <List.Content>
                                    <Header as='h4' color='grey'>Sem aulas para mostrar.</Header>
                                </List.Content>
                            </List.Item>
                            :
                            this.state.lessons.map(lesson => (
                                <List.Item key={lesson.id} style={{marginBottom: "10px"}}>
                                    {lesson.canCancel &&
                                        this.renderModal(lesson)
                                    }
                                    <Icon name='calendar outline' />
                                    <List.Content>
                                        <List.Header>Aula Prática - Categoria {lesson.category}</List.Header>
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

        return(
            <Container style={{marginBottom: "65px"}}>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Grid className="ui stackable two column centered grid">
                    <Grid.Column width={16}>

                        <Breadcrumb size='large'>
                            <Breadcrumb.Section
                                style={{color: 'grey'}}
                                onClick={() => this.props.history.push(Routes.HOME)}
                            >
                                Alunos
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section
                                style={{color: 'grey'}}
                                onClick={() => this.props.history.push(Routes.STUDENT_PROFILE, {student: this.state.student})}
                            >
                                {this.state.student.name}
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>Aulas práticas futuras</Breadcrumb.Section>
                        </Breadcrumb>

                    </Grid.Column>
                    <Grid.Column width={10} style={{marginTop: "30px"}}>
                        {
                            nextPracticalLessons
                        }
                    </Grid.Column>
                </Grid>

            </Container>
        );
    }

}

export default RegisterPersonalAnnouncement;