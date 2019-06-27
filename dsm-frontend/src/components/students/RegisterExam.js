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
    Loader
} from 'semantic-ui-react';
import { fetchApi } from '../../services/api/index';
import Routes from "../../services/Routes";


class RegisterExam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            aluno: undefined,
            data: '',
            exame: '',
            categoria: '',
            
            exames: [
                { key: 't', text: 'Exame Teórico', value: 'Exame Teórico' },
                { key: 'p', text: 'Exame Prático', value: 'Exame Prático' }
            ],
            categorias: [],

            message: '',
            error: '',
            isLoading: true
        }
    }

    componentDidMount(){

        this.setState({
            aluno: this.props.location.state.aluno
        })

        fetchApi(
            'get','/student/registers?studentID=' + this.props.location.state.aluno.id, //TODO Find userID
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
        const categorias = []

        data.registers.forEach(function(register) {
          categorias.push({
            key: register.category.id,
            text: 'Categoria ' + register.category.name,
            value: 'Categoria ' + register.category.name,
          })
        });

        this.setState({
            categorias: categorias,
            isLoading: false
        })

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

        const { exame, categoria, data } = this.state;
        if(exame !== '' && categoria !== '' && data !== '' ) {
            
            fetchApi(
                'post','/secretary/register_student_exam',
                {
                    studentID: this.state.aluno.id,
                    startTime: this.state.data.replace('T', ' '),
                    description: exame + ' - ' + categoria
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
            this.props.history.push(Routes.HOME);
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

    handleSelectExameChange = (event, data) => {
        this.setState({
            exame: data.value
        })
    }

    handleSelectCategoriaChange = (event, data) => {
        this.setState({
            categoria: data.value
        })
    }

    render() {

        console.log('exame: ' + this.state.exame)
        console.log('categoria: ' + this.state.categoria)

        return (
            <Container>

                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
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
                                <Form.Select
                                    className={(this.state.error && this.state.data === '') ? "error field" : "field"}
                                    fluid 
                                    label='Tipo de exame'
                                    options={this.state.exames}
                                    placeholder='Tipo de exame'
                                    name={"exame"}
                                    onChange={this.handleSelectExameChange}
                                />
                                <Form.Select
                                    className={(this.state.error && this.state.data === '') ? "error field" : "field"}
                                    fluid 
                                    label='Categoria'
                                    options={this.state.categorias}
                                    placeholder='Categoria'
                                    name={"categoria"}
                                    onChange={this.handleSelectCategoriaChange}
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