import React, {Component} from 'react';
import {
    Container,
    Header,
    Dimmer,
    Loader,
    Grid,
    Breadcrumb,
    Segment,
    Form,
    Input,
    Popup,
    Button,
    Message,
    Icon
} from 'semantic-ui-react';
import { fetchApi } from '../../services/api/index';
import Routes from "../../services/Routes";


class StudentProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: {},
            name: '',
            birth: '',
            email: '',
            password: '',
            address: '',
            nif: '',
            cc: '',
            edit: false
        }
    }

    async componentDidMount(){

        let birth = this.props.location.state.student.birth
        let birth_aux = birth.split("/")
        let new_date = birth_aux[2] + "-" + birth_aux[1] + "-" + birth_aux[0]

        await this.setState({
            student: this.props.location.state.student,
            name: this.props.location.state.student.name,
            birth: new_date,
            email: this.props.location.state.student.email,
            address: this.props.location.state.student.address,
            nif: this.props.location.state.student.nif.toString(),
            cc: this.props.location.state.student.cc
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

        const { name, email, password, birth, nif, cc, address } = this.state;
        if(name !== '' && email !== '' && birth !== '' && nif !== '' && cc !== '' && address !== '') {

            console.log(name)
            console.log(email)
            console.log(password)
            console.log(birth)
            console.log(nif)
            console.log(cc)
            console.log(address)

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
                    'post','/secretary/update_student',
                    {
                        studentID: this.state.student.id,
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
            message: 'Dados do aluno atualizados com sucesso',
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

                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
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
                            <Breadcrumb.Section active>Perfil de {this.state.student.name}</Breadcrumb.Section>
                        </Breadcrumb>

                    </Grid.Column>
                    <Grid.Column width={10} style={{marginTop: "30px"}}>
                        <Popup content='Editar dados' trigger={
                            <Button 
                                icon 
                                color={(!this.state.edit) ? 'blue' : 'black'} 
                                onClick={() => this.setState({edit: !this.state.edit})}
                            >
                                <Icon name='edit' />
                            </Button>
                        }/>
                        <Segment>
                            <Header 
                                className='centered' 
                                as='h1'
                            >
                                Dados de {this.state.student.name}
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
                                        defaultValue={this.state.name}
                                        readOnly={!this.state.edit}
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Field
                                        className={(this.state.error && this.state.birth === '') ? "error field" : "field"}
                                        width={5}
                                        control={Input}
                                        label='Data de nascimento'
                                        placeholder='Data de nascimento'
                                        type="date"
                                        name={"birth"}
                                        defaultValue={this.state.birth}
                                        readOnly={!this.state.edit}
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
                                        defaultValue={this.state.email}
                                        readOnly={!this.state.edit}
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Field
                                        className={(this.state.error && this.state.password === '') ? "error field" : "field"}
                                        control={Input}
                                        label='Password'
                                        placeholder='Password'
                                        type="password"
                                        name={"password"}
                                        readOnly={!this.state.edit}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Field
                                    className={(this.state.error && this.state.address === '') ? "error field" : "field"}
                                    control={Input}
                                    label='Morada'
                                    placeholder='Morada'
                                    name={"address"}
                                    defaultValue={this.state.address}
                                    readOnly={!this.state.edit}
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
                                                placeholder="NIF"
                                                pattern="[0-9]{9}"
                                                name={"nif"}
                                                defaultValue={this.state.nif}
                                                readOnly={!this.state.edit}
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
                                                placeholder="CC"
                                                pattern="[0-9]{8}[A-Z0-9]{4}"
                                                name={"cc"}
                                                defaultValue={this.state.cc}
                                                readOnly={!this.state.edit}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </Form.Group>
                                <Button 
                                    disabled={!this.state.edit}
                                    type="submit"
                                    className="ui button"
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                    GUARDAR
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

export default StudentProfile;