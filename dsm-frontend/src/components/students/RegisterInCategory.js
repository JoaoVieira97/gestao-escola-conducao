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
    Button,
    Message,
    Card,
    Icon,
    List
} from 'semantic-ui-react';
import { fetchApi } from '../../services/api/index';
import Routes from "../../services/Routes";
import moment from 'moment';
import Authentication from "../../services/Authentication";


class RegisterInCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: {},
            categories: [],
            categories_options: [],
            instructors_options: [],

            category: '',
            instructor: '',

            error: '',
            message: '',
            isLoading: true
        }
    }

    async componentDidMount() {

        await this.setState({
            student: this.props.location.state.student
        })

        fetchApi(
            'get','/student/registers?studentID=' + this.props.location.state.student.id,
            {},  {},
            this.successCategories, this.errorCategories
        );

        fetchApi(
            'get','/school/categories_and_instructors',
            {},  {},
            this.successFetchInfo, this.errorHandler
        );
    }

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successCategories = (response) => {
        
        const data = response.data;
        let categories = []

        data.registers.forEach(function(register){

            let date = register.initialDate.split("/");
            let dateLimit = moment(date[2]+'-'+date[1]+'-'+date[0]).add(2,'years').format('DD/MM/YYYY');

            categories.push({
                //id: register.id,
                name: 'Categoria ' + register.category.name,
                initial_date: register.initialDate,
                end_date: dateLimit,
                instructor: register.instructor.name
            })
        })

        this.setState({
            categories: categories
        })
    }

    errorCategories = (error) => {
        if(error.response && error.response.status && error.response.status === 400) {
            this.setState({
                isLoading: false,
                message: '',
                error: 'Ocorreu um erro. Tente novamente.'
            })
        }
        else if(error.response && error.response.status && error.response.status === 401) {
            Authentication.clearData();
            window.location.reload();
            alert("As suas credenciais já não são válidas.");
        }
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
        if(error.response && error.response.status && error.response.status === 400) {
            this.setState({
                isLoading: false,
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

        const { category, instructor } = this.state;
        if(category !== '' && instructor !== '') {
            
            fetchApi(
                'post','/secretary/register_student_in_category',
                {
                    studentID: this.state.student.id,
                    instructorID: instructor,
                    categoryID: category
                },  {},
                this.successHandlerC, this.errorHandlerC
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
    successHandlerC = (response) => {

        let category = this.state.categories_options.filter(cat => {
            return cat.key === this.state.category
        })

        let instructor = this.state.instructors_options.filter(inst => {
            return inst.key === this.state.instructor
        })

        let today = new Date();
        let dateLimit = moment(today).add(2,'years').format('DD/MM/YYYY');
        let initialDate = moment(today).format('DD/MM/YYYY');

        let categories = this.state.categories
        categories.push({
            name: category[0].text,
            initial_date: initialDate,
            end_date: dateLimit,
            instructor: instructor[0].text
        })

        this.setState({
            categories: categories,
            message: 'Aluno registado com sucesso na categoria pretendida',
            error: ''
        });
        
    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandlerC = (error) => {

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

        const categories = (
            <div className={"ui fluid card orange"}>
                <Card.Content>
                    <Card.Header>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='orange' name='car' />
                        </Icon.Group>
                        Categorias de {this.state.student.name}
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <List divided>
                        {(this.state.categories.length > 0) ?
                            this.state.categories.map(c => (
                                <List.Item key={this.state.categories.indexOf(c)} style={{marginBottom: "10px"}}>
                                    <Icon name='file alternate outline' color='grey'/>
                                    <List.Content>
                                        <List.Header>{c.name}</List.Header>
                                        <List.Description style={{marginTop: "3px"}}>
                                            Inscrição a: {c.initial_date}
                                        </List.Description>
                                        <List.Description style={{marginTop: "3px"}}>
                                            Validade até: {c.end_date}
                                        </List.Description>
                                        <List.Description style={{marginTop: "3px"}}>
                                            Instrutor: {c.instructor}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            )) :
                            <Header as='h4' color='grey'>Não se encontra registado em nenhuma categoria</Header>
                        }                   
                    </List>
                </Card.Content>
            </div>
        );
        
        return (
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
                            <Breadcrumb.Section active>Categorias</Breadcrumb.Section>
                        </Breadcrumb>

                    </Grid.Column>
                    <Grid.Column width={8} style={{marginTop: "30px"}}>
                        <Segment color='orange'>
                            <Header 
                                className='centered' 
                                as='h3'
                            >
                                Registar em categoria
                            </Header>
                            <Form>
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
                                <Button 
                                    disabled={this.state.instructor === '' || this.state.category === ''}
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
                            categories
                        }
                    </Grid.Column>
                </Grid>

            </Container>
        );
    }
}

export default RegisterInCategory;