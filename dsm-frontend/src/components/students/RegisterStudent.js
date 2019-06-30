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
    Message,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import { fetchApi } from '../../services/api/index';
import Routes from "../../services/Routes";


class RegisterStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories_options: [],
            instructors_options: [],

            category: '',
            instructor: '',

            name: '',
            email: '',
            password: '',
            birth: '',
            nif: '',
            cc: '',
            address: '',

            message: '',
            error: '',
            isLoading: true
        }
    
    };

    componentDidMount(){
        fetchApi(
            'get','/school/categories_and_instructors',
            {},  {},
            this.successFetchInfo, this.errorHandlerInfo
        );
    }

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchInfo = (response) => {
        
        const data = response.data;

        let categories_options = []
        let instructors_options = []
        
        data.categories.forEach(function(category) {
            categories_options.push({
                key: category.id,
                text: 'Categoria ' + category.name,
                value: category.id
            })
        })

        data.instructors.forEach(function(instructor) {
            instructors_options.push({
                key: instructor.id,
                text: instructor.name,
                value: instructor.id
            })
        })

        this.setState({
            categories_options: categories_options,
            instructors_options: instructors_options,
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

    handleSelectCategoryChange = (event, data) => {
        this.setState({
            category: data.value
        })
    }

    handleSelectInstructorChange = (event, data) => {
        this.setState({
            instructor: data.value
        })
    }

    handleSubmit = () => {

        const { name, email, password, birth, nif, cc, address, category, instructor } = this.state;
        if(name !== '' && email !== '' && password !== '' && birth !== '' && nif !== '' && cc !== '' && address !== '' && category !== '' && instructor !== '') {

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
                        address: address,
                        instructorID: instructor,
                        categoryID: category
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
            <Container style={{marginBottom: "65px"}}>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>

                <Grid centered>
                    
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
                                            <Popup
                                                header="Número de Identificação Fiscal" 
                                                content="9 dígitos"
                                                trigger={<i className="question circle blue icon" />}
                                            />
                                            <label>NIF</label>
                                        </div>
                                        <div className="ui input">
                                            <input
                                                title="9 dígitos"
                                                type="text"
                                                maxLength="9"
                                                name={"nif"}
                                                placeholder="NIF"
                                                pattern="[0-9]{9}"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className={(this.state.error && this.state.cc === '') ? "error field" : "field"}>
                                        <div className="label left icon">
                                            <Popup
                                                header="Cartão de Cidadão" 
                                                content="8 dígitos mais 4 carateres (dígitos ou letras maiúsculas)" 
                                                trigger={<i className="question circle blue icon" />}
                                            />
                                            <label>CC</label>
                                        </div>
                                        <div className="ui input">
                                            <input
                                                type="text"
                                                maxLength="12"
                                                title="8 dígitos mais 4 carateres (dígitos ou letras maiúsculas)"
                                                name={"cc"}
                                                placeholder="CC"
                                                pattern="[0-9]{8}[A-Z0-9]{4}"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Select
                                        className={(this.state.error && this.state.category === '') ? "error field" : "field"}
                                        fluid 
                                        label='Categoria'
                                        options={this.state.categories_options}
                                        placeholder='Categoria'
                                        name={"category"}
                                        onChange={this.handleSelectCategoryChange}
                                    />
                                    <Form.Select
                                        className={(this.state.error && this.state.instructor === '') ? "error field" : "field"}
                                        fluid 
                                        label='Instrutor'
                                        options={this.state.instructors_options}
                                        placeholder='Instrutor'
                                        name={"instructor"}
                                        onChange={this.handleSelectInstructorChange}
                                    />
                                </Form.Group>
                                <Button
                                    disabled={this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.birth === '' || this.state.nif === '' || this.state.cc === '' || this.state.address === '' || this.state.instructor === '' || this.state.category === ''}
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