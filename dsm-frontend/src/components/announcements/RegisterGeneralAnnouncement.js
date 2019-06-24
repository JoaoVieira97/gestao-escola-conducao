import React, {Component} from 'react';
import {
    Container,
    Header, 
    Grid,
    Form,
    Input,
    Button,
    Segment
} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";

class RegisterGeneralAnnouncement extends Component {

    constructor(props){
        super(props);

        this.state = {
            titulo: '',
            descricao: '',
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

    handleSubmit = () => {

        const { titulo, descricao } = this.state;
        if(titulo !== '' && descricao !== '') {
            
            fetchApi(
                'post','/secretary/register_general_announcement',
                {
                    title: titulo,
                    description: descricao
                },  {},
                this.successHandler, this.errorHandler
            );
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
            this.props.history.push('/home');
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
                    <Grid.Column width={10}>
                        <Header 
                            className='centered' 
                            as='h1'
                            style={{marginTop: "30px"}}
                        >
                            Registar aviso geral
                        </Header>
                        <Segment>
                            <Form>
                                <Form.Field
                                    control={Input}
                                    label='Título do aviso'
                                    placeholder='Título'
                                    name={"titulo"}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Field
                                    control={Input}
                                    label='Descrição do aviso'
                                    placeholder='Descrição'
                                    name={"descricao"}
                                    onChange={this.handleInputChange}
                                />
                                <Button 
                                        type="submit"
                                        className="ui button"
                                        onClick={this.handleSubmit.bind(this)}
                                    >
                                        PUBLICAR
                                </Button>
                                <Header
                                	style={{marginTop: "8px"}}
                                	//className='centered'
                                	as='h4'
                                	color='red'
                                >
                                	{this.state.error}
                                </Header>
                                <Header
                                	style={{marginTop: "8px"}}
                                	as='h4'
                                	color='green'
                                >
                                	{this.state.message}
                                </Header>
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