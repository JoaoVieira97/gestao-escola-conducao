import React, {Component} from 'react';
import {
    Container,
    Header, 
    Grid,
    Form,
    Input,
    Button,
    Segment,
    Message,
    Dimmer,
    Loader,
    Breadcrumb
} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";
import Routes from "../../services/Routes";
import Authentication from "../../services/Authentication";

class RegisterPersonalAnnouncement extends Component {

    constructor(props){
        super(props);

        this.state = {
            student: {},

            title: '',
            description: '',
            message: '',
            error: '',
            isLoading: true
        };
    }

    async componentDidMount(){
        
        await this.setState({
            student: this.props.location.state.student,
            isLoading: false
        })
    }

    handleInputChange = (event) => {

        const input = event.target;
        const value = input.value;

        this.setState({
            [input.name]: value
        });

    };

    handleSubmit = async () => {

        const { title, description } = this.state;
        if(title !== '' && description !== '') {
            
            fetchApi(
                'post','/secretary/register_personal_announcement',
                {
                    studentID: this.state.student.id,
                    title: title,
                    description: description
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
    		message: 'Aviso enviado com sucesso',
    		error: ''
    	});


    	sleep(3000).then(() => {
            this.props.history.push(Routes.STUDENT_PROFILE, {student: this.state.student});
        });
        
    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

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

    render(){

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
                            <Breadcrumb.Section active>Enviar aviso</Breadcrumb.Section>
                        </Breadcrumb>

                    </Grid.Column>
                    <Grid.Column width={10} style={{marginTop: "30px"}}>
                        <Segment>
                            <Header 
                                className='centered' 
                                as='h2'
                            >
                                Enviar aviso a {this.state.student.name}
                            </Header>
                            <Form>
                                <Form.Field
                                    className={(this.state.error && this.state.title === '') ? "error field" : "field"}
                                    control={Input}
                                    label='Título do aviso'
                                    placeholder='Título'
                                    name={"title"}
                                    onChange={this.handleInputChange}
                                />
                                <Form.TextArea
                                    className={(this.state.error && this.state.description === '') ? "error field" : "field"}
                                    label='Descrição do aviso'
                                    placeholder='Descrição'
                                    name={"description"}
                                    onChange={this.handleInputChange}
                                />
                                <Button
                                    disabled={this.state.title === '' || this.state.description === ''}
                                    type="submit"
                                    className="ui button"
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                    ENVIAR
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

export default RegisterPersonalAnnouncement;