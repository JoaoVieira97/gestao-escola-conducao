import React, {Component} from 'react';
import {
    Container,
    Button,
    Segment,
    Form,
    Header,
    Grid,
    Input,
    Message,
    Dimmer,
    Loader,
    Breadcrumb,
    List,
    Card,
    Icon
} from 'semantic-ui-react';
import { fetchApi } from '../../services/api/index';
import Routes from "../../services/Routes";
import moment from 'moment';


class RegisterExam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: {},
            date: '',
            exam: '',
            category: '',
            exams: [],
            
            exams_options: [
                { key: 't', text: 'Exame Teórico', value: 'Exame Teórico' },
                { key: 'p', text: 'Exame Prático', value: 'Exame Prático' }
            ],
            categories: [],

            message: '',
            error: '',
            isLoading: true
        }
    }

    async componentDidMount(){

        await this.setState({
            student: this.props.location.state.student
        })

        fetchApi(
            'get','/student/information?studentID=' + this.props.location.state.student.id,
            {},  {},
            this.successFetchInformation, this.errorHandler
        );

        fetchApi(
            'get','/student/registers?studentID=' + this.props.location.state.student.id,
            {},  {},
            this.successFetchRegisters, this.errorHandler
        );

    }

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchRegisters = (response) => {
        
        const data = response.data;
        const categories = []

        data.registers.forEach(function(register) {
          categories.push({
            key: register.category.id,
            text: 'Categoria ' + register.category.name,
            value: 'Categoria ' + register.category.name,
          })
        });

        this.setState({
            categories: categories,
            isLoading: false
        })

    };

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchInformation = (response) => {
        const data = response.data;

        this.setState({
            exams: data.exams,
        });

    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

        console.log(error);
        this.setState({
            isLoading: false
        })

    };

    handleInputChange = (event) => {

        const input = event.target;
        const value = input.value;

        this.setState({
            [input.name]: value
        });

    };

    handleSubmit = () => {

        const { exam, category, date } = this.state;
        if(exam !== '' && category !== '' && date !== '') {
            
            fetchApi(
                'post','/secretary/register_student_exam',
                {
                    studentID: this.state.student.id,
                    startTime: this.state.date.replace('T', ' '),
                    description: exam + ' - ' + category
                },  {},
                this.successHandler, this.errorHandlerE
            );

        } else {
            this.setState({
                message: '',
                error: 'Preencha todos os campos!'
            })
        }

    };

    /**
     * Handle the response.
     * @param response
     */
    successHandler = (response) => {


        let description = this.state.exam + ' - ' + this.state.category
        let exam_date = moment(this.state.date).format('DD/MM/YYYY HH:mm')

        let exams = this.state.exams
        exams.push({
            description: description,
            startTime: exam_date
        })

        this.setState({
            exams: exams,
            message: 'Exame registado com sucesso',
            error: ''
        });

        
    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandlerE = (error) => {

        console.log(error)

        this.setState({
            message: '',
            error: 'Ocorreu um erro. Tente novamente.'
        })
        
    };

    handleSelectExamChange = (event, data) => {
        this.setState({
            exam: data.value
        })
    }

    handleSelectCategoryChange = (event, data) => {
        this.setState({
            category: data.value
        })
    }

    render() {

        const exams = (
            this.state.exams.length>0 ? this.state.exams.map( exam =>
                    <List.Item key={this.state.exams.indexOf(exam)}>
                        <Icon size='large' name='clipboard' color='grey'/>
                        <List.Content>
                            <List.Header>{exam.description}</List.Header>
                            <List.Description style={{marginTop: "3px"}}>
                                <b>Data:</b> {" "+ (exam.startTime.split(" "))[0]}
                            </List.Description>
                            <List.Description style={{marginTop: "3px"}}>
                                <b> Início: </b> {" "+ (exam.startTime.split(" "))[1].replace(':',"h")+'min'}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                 ) :
                <List.Item>
                    <List.Header>Não há registo de exames.</List.Header>
                </List.Item>
        );

        const cardExams = (
            <div className={"ui fluid card orange"}>
                <Card.Content>
                    <Card.Header>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='orange' name='calendar' />
                        </Icon.Group>
                        Exames de {this.state.student.name}
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <List animated divided relaxed={'very'} verticalAlign='middle'>
                        {exams}
                    </List>
                </Card.Content>
            </div>
        );

        return (
            <Container>

                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Grid className="ui stackable two column centered grid" style={{marginBottom: "65px"}}>
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
                            <Breadcrumb.Section active>Exames</Breadcrumb.Section>
                        </Breadcrumb>

                    </Grid.Column>
                    <Grid.Column width={8} style={{marginTop: "30px"}}>
                        <Segment color="orange">
                            <Header 
                                className='centered' 
                                as='h1'
                            >
                                Registar exame
                            </Header>
                            <Form>
                                <Form.Select
                                    className={(this.state.error && this.state.exam === '') ? "error field" : "field"}
                                    fluid 
                                    label='Tipo de exame'
                                    options={this.state.exams_options}
                                    placeholder='Tipo de exame'
                                    name={"exam"}
                                    onChange={this.handleSelectExamChange}
                                />
                                <Form.Select
                                    className={(this.state.error && this.state.category === '') ? "error field" : "field"}
                                    fluid 
                                    label='Categoria'
                                    options={this.state.categories}
                                    placeholder='Categoria'
                                    name={"category"}
                                    onChange={this.handleSelectCategoryChange}
                                />
                                <Form.Field
                                    className={(this.state.error && this.state.date === '') ? "error field" : "field"}
                                    control={Input}
                                    label='Data do exame'
                                    placeholder='Data do exame'
                                    name={"date"}
                                    type="datetime-local"
                                    onChange={this.handleInputChange}
                                />
                                <Button
                                    disabled={this.state.exam === '' || this.state.category === '' || this.state.date === ''}
                                    type="submit"
                                    className="ui button"
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                    Registar
                                </Button>
                                <Message positive hidden={!this.state.message}>
                                    <Message.Header>Sucesso</Message.Header>
                                    <p>{this.state.message}</p>
                                </Message>
                                <Message negative hidden={!this.state.error}>
                                    <Message.Header>Erro</Message.Header>
                                    <p>{this.state.error}</p>
                                </Message>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={8} style={{marginTop: "30px"}}>
                        {
                            cardExams
                        }
                    </Grid.Column>
                </Grid>

            </Container>
        );
    }
}

export default RegisterExam;