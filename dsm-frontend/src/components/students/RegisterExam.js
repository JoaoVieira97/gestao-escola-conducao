import React, {Component} from 'react';
import {
    Container,
    Button,
    Icon,
    Table,
    Statistic,
    Pagination,
    Segment,
    Divider,
    Dropdown,
    Form,
    Modal,
    Header,
    Grid,
    Input,
    Message
} from 'semantic-ui-react';
import { fetchApi } from '../../services/api/index';


class RegisterExam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            aluno: undefined,
            data: '',
            descricao: '',
            message: '',
            error: ''
        }
    }

    componentDidMount(){
        this.setState({
            aluno: this.props.location.state.aluno
        })
    }

    handleInputChange = (event) => {

        const input = event.target;
        const value = input.value;

        this.setState({
            [input.name]: value
        });

    };

    handleSubmit = () => {

        const { descricao, data } = this.state;
        if(descricao !== '' && data !== '' ) {
            
            fetchApi(
                'post','/secretary/register_student_exam',
                {
                    studentID: this.state.aluno.id,
                    startTime: this.state.data.replace('T', ' '),
                    description: this.state.descricao
                },  {},
                this.successHandler, this.errorHandler
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

        //console.log(response)

        this.setState({
            message: 'Exame registado com sucesso',
            error: ''
        });


        sleep(3000).then(() => {
            this.props.history.push('/students');
        });
        
    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

        console.log(error)

        this.setState({
            message: '',
            error: 'Ocorreu um erro. Tente novamente.'
        })
        
    };

    render() {

        return (
            <Container>

                <Grid centered style={{marginBottom: "65px"}}>
                    <Grid.Column width={10}>
                        <Header 
                            className='centered' 
                            as='h1'
                            style={{marginTop: "30px"}}
                        >
                            Registar exame
                        </Header>
                        <Segment>
                            <Form>
                                <Form.Field
                                    className={(this.state.error && this.state.descricao === '') ? "error field" : "field"}
                                    control={Input}
                                    label='Descrição'
                                    placeholder='Descrição'
                                    name={"descricao"}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Field
                                    className={(this.state.error && this.state.data === '') ? "error field" : "field"}
                                    control={Input}
                                    label='Data do exame'
                                    placeholder='Data do exame'
                                    name={"data"}
                                    type="datetime-local"
                                    onChange={this.handleInputChange}
                                />
                                <Button 
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
                </Grid>

            </Container>
        );
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default RegisterExam;