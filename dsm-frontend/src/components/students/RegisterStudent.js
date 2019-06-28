import React, {Component} from 'react';
import {
    Container,
    Button,
    Segment,
    Form,
    Header,
    Grid,
    Input,
    Popup,
    Breadcrumb,
    Message
} from 'semantic-ui-react';
import { fetchApi } from '../../services/api/index';
import Routes from "../../services/Routes";


class RegisterStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            birth: '',
            nif: '',
            cc: '',
            address: '',
            message: '',
            error: ''
        }
    
    };

    handleInputChange = (event) => {

        const input = event.target;
        const value = input.value;

        this.setState({
            [input.name]: value
        });

    };

    handleSubmit = () => {

        const { name, email, password, birth, nif, cc, address } = this.state;
        if(name !== '' && email !== '' && password !== '' && birth !== '' && nif !== '' && cc !== '' && address !== '') {

            if (!nif.match(/^[0-9]{9}$/g)){
                this.setState({
                    message: '',
                    error: 'Preencha corretamente o valor do NIF!'
                })
            }
            else if (!cc.match(/^[0-9]{8}[A-Z0-9]{4}$/g)){
                this.setState({
                    message: '',
                    error: 'Preencha corretamente o valor do CC!'
                })
            }
            else {
                
                fetchApi(
                    'post','/secretary/register_student',
                    {
                        name: name,
                        email: email,
                        password: password,
                        birth: birth,
                        nif: nif,
                        cc: cc,
                        address: address
                    },  {},
                    this.successHandler, this.errorHandler
                );
            }

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
            message: 'Aluno registado com sucesso',
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

    render() {

        return (
            <Container>

                <Grid centered style={{marginBottom: "65px"}}>
                    
                    <Grid.Column width={16}>

                        <Breadcrumb size='large'>
                            <Breadcrumb.Section
                                style={{color: 'grey'}}
                                onClick={() => this.props.history.push(Routes.HOME)}
                            >
                                Alunos
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>Registar aluno</Breadcrumb.Section>
                        </Breadcrumb>

                    </Grid.Column>
                    <Grid.Column width={10} style={{marginTop: "30px"}}>
                        <Segment>
                            <Header 
                                className='centered' 
                                as='h1'
                            >
                                Registar aluno
                            </Header>
                            <Form>
                                <Form.Group>
                                    <Form.Field
                                        className={(this.state.error && this.state.name === '') ? "error field" : "field"}
                                        width={11}
                                        control={Input}
                                        label='Nome'
                                        placeholder='Nome'
                                        name={"name"}
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Field
                                        className={(this.state.error && this.state.birth === '') ? "error field" : "field"}
                                        width={5}
                                        control={Input}
                                        label='Data de nascimento'
                                        placeholder='Data de nascimento'
                                        name={"birth"}
                                        type="date"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        className={(this.state.error && this.state.email === '') ? "error field" : "field"}
                                        control={Input}
                                        label='E-mail'
                                        placeholder='E-mail'
                                        name={"email"}
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Field
                                        className={(this.state.error && this.state.password === '') ? "error field" : "field"}
                                        control={Input}
                                        label='Password'
                                        placeholder='Password'
                                        name={"password"}
                                        type="password"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Field
                                    className={(this.state.error && this.state.address === '') ? "error field" : "field"}
                                    control={Input}
                                    label='Morada'
                                    placeholder='Morada'
                                    name={"address"}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Group widths='equal'>
                                    <div className={(this.state.error && this.state.nif === '') ? "error field" : "field"}>
                                        <div className="label left icon">
                                            <Popup content='Número de Identificação Fiscal' trigger={<i className="question circle blue icon" />}/>
                                            <label>NIF</label>
                                        </div>
                                        <div className="ui input">
                                            <input
                                                name={"nif"}
                                                placeholder="NIF"
                                                pattern="[0-9]{9}"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className={(this.state.error && this.state.cc === '') ? "error field" : "field"}>
                                        <div className="label left icon">
                                            <Popup content='Cartão de Cidadão' trigger={<i className="question circle blue icon" />}/>
                                            <label>CC</label>
                                        </div>
                                        <div className="ui input">
                                            <input
                                                name={"cc"}
                                                placeholder="CC"
                                                pattern="[0-9]{8}[A-Z0-9]{4}"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </Form.Group>
                                <Button 
                                        type="submit"
                                        className="ui button"
                                        onClick={this.handleSubmit.bind(this)}
                                    >
                                        REGISTAR
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

export default RegisterStudent;