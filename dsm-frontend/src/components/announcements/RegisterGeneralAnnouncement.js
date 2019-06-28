import React, {Component} from 'react';
import {
    Container,
    Header, 
    Grid,
    Form,
    Input,
    Button,
    Segment,
    Message
} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";
import Routes from "../../services/Routes";

class RegisterGeneralAnnouncement extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
            message: '',
            error: ''
        };
    }

    handleInputChange = (event) => {

        const input = event.target;
        const value = input.value;

        this.setState({
            loginError: false,
            [input.name]: value
        });

    };

    handleSubmit = async () => {

        const { title, description } = this.state;
        if(title !== '' && description !== '') {
            
            fetchApi(
                'post','/secretary/register_general_announcement',
                {
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
    		message: 'Aviso publicado com sucesso',
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

    render(){

        return(
            <Container>

                <Grid centered style={{marginBottom: "65px"}}>
                    <Grid.Column width={10} style={{marginTop: "30px"}}>
                        <Segment>
                            <Header 
                                className='centered' 
                                as='h1'
                            >
                                Registar aviso geral
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
                                    type="submit"
                                    className="ui button"
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                    PUBLICAR
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

export default RegisterGeneralAnnouncement;