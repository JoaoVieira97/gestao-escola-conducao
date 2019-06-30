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
import Authentication from "../../services/Authentication";


class StudentProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: {},
            name: '',
            birth: '',
            email: '',
            address: '',
            nif: '',
            cc: '',
            edit: false,
            manage: false,

            userType: '',
        }
    }

    async componentDidMount(){

        const userType = Authentication.getUserType();

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
            cc: this.props.location.state.student.cc,

            userType: userType
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

        const { name, email, birth, nif, cc, address } = this.state;
        if(name !== '' && email !== '' && birth !== '' && nif !== '' && cc !== '' && address !== '') {

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
    
    render() {

        const buttonsHeader = this.state.userType === 'ROLE_SECRETARY' ?
            (
                <React.Fragment>
                    <Button
                        style={{marginBottom: '3px'}}
                        icon='edit'
                        content='Clique para editar'
                        color={(!this.state.edit) ? 'blue' : 'black'}
                        onClick={() => this.setState({edit: !this.state.edit})}
                    />
                    <Button
                        style={{marginBottom: '3px'}}
                        icon='calendar'
                        content='Marcar Aula'
                        color={'green'}
                        //onClick={() => this.setState({edit: !this.state.edit})}
                    />
                    <Button
                        style={{marginBottom: '3px'}}
                        color={(!this.state.manage) ? 'orange' : 'black'}
                        icon='student'
                        content='Gerir'
                        onClick={() => this.setState({manage: !this.state.manage})}
                    />
                </React.Fragment>
            ) :
            (
                <React.Fragment>
                    <Button
                        style={{marginBottom: '3px'}}
                        icon='calendar'
                        content='Marcar Aula'
                        color={'green'}
                        //onClick={() => this.setState({edit: !this.state.edit})}
                    />
                </React.Fragment>
            );


        return (
            <Container style={{marginBottom: "65px"}}>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Breadcrumb size='large'>
                    { this.state.userType === 'ROLE_SECRETARY' ?
                        <Breadcrumb.Section
                            style={{color: 'grey'}}
                            onClick={() => this.props.history.push(Routes.HOME)}
                        >
                            Alunos
                        </Breadcrumb.Section>
                        :
                        <Breadcrumb.Section
                            style={{color: 'grey'}}
                            onClick={() => this.props.history.push(Routes.STUDENTS)}
                        >
                            Alunos
                        </Breadcrumb.Section>
                    }
                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section active>{this.state.student.name}</Breadcrumb.Section>
                </Breadcrumb>
                <Container style={{marginTop: "30px"}}>
                    {buttonsHeader}
                    <Segment
                        className="ui center aligned"
                        color="orange"
                        hidden={!this.state.manage}
                    >
                        <Button
                            style={{marginBottom: '3px'}}
                            icon
                            labelPosition='left'
                            onClick={() => this.props.history.push(Routes.REGISTER_STUDENT_CATEGORY, {student: this.state.student})}
                        >
                            <Icon name='file alternate outline' color='orange'/>
                            <p>Categorias</p>
                        </Button>
                        <Button
                            style={{marginBottom: '3px'}}
                            icon
                            labelPosition='left'
                            onClick={() => this.props.history.push(Routes.REGISTER_STUDENT_PAYMENT, {student: this.state.student})}
                        >
                            <Icon name='euro sign' color='orange'/>
                            <p>Pagamentos</p>
                        </Button>
                        <Button
                            style={{marginBottom: '3px'}}
                            icon
                            labelPosition='left'
                            onClick={() => this.props.history.push(Routes.STUDENT_NEXT_PRACTICAL_LESSONS, {student: this.state.student})}
                        >
                            <Icon name='clock outline' color='orange'/>
                            <p>Próximas aulas</p>
                        </Button>
                        <Button
                            style={{marginBottom: '3px'}}
                            icon
                            labelPosition='left'
                            onClick={() => this.props.history.push(Routes.REGISTER_STUDENT_EXAM, {student: this.state.student})}
                        >
                            <Icon name='clipboard outline' color='orange'/>
                            <p>Exames</p>
                        </Button>
                        <Button
                            style={{marginBottom: '3px'}}
                            icon
                            labelPosition='left'
                            onClick={() => this.props.history.push(Routes.REGISTER_STUDENT_ANNOUNCEMENT, {student: this.state.student})}
                        >
                            <Icon name='bell outline' color='orange'/>
                            <p>Enviar aviso</p>
                        </Button>
                    </Segment>
                </Container>
                <Container style={{marginTop: "15px"}}>
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
                            { this.state.userType === 'ROLE_SECRETARY' &&
                            <Button
                                disabled={!this.state.edit}
                                type="submit"
                                className="ui button"
                                onClick={this.handleSubmit.bind(this)}
                            >
                                GUARDAR
                            </Button>
                            }
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
                </Container>
            </Container>
        );
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default StudentProfile;