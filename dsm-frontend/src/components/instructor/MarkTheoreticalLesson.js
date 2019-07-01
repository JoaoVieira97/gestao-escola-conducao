import React, {Component} from 'react';
import {
    Container, Loader, Dimmer, Breadcrumb, Icon, Card, List,
    Button, Divider, Dropdown, Pagination, Segment, Form, Table, Header, Grid, Message, Input
} from 'semantic-ui-react';

import {fetchApi} from "../../services/api";
import Routes from "../../services/Routes";

import {StudentFilter} from "../students/StudentFilter";
import _ from "lodash";
import Authentication from "../../services/Authentication";

import moment from 'moment'

class MarkTheoreticalLesson extends Component {

    constructor(props) {
        super(props);

        this.state = {

            // Loading
            isLoading : false,

            categories_options: [],
            categoriesChoosed: [],

            themes_options: [],
            themesChoosed: [],
            error: '',
            message:'',
            date:'',

        };
    }

    async componentDidMount() {

        //fetch categories
        fetchApi(
            'get','/school/categories_and_instructors',
            {},  {},
            this.successFetchCategories, this.errorHandler
        );

        //fetch themes
        fetchApi(
            'get','/school/all_themes',
            {},  {},
            this.successFetchThemes, this.errorHandler
        );
    }


    /**
     * Handle the response fetch catgories.
     * @param response
     */
    successFetchCategories = (response) => {

        const data = response.data;

        let categories_options = [];

        data.categories.forEach(function(category) {
            categories_options.push({
                key: category.id,
                text: 'Categoria ' + category.name,
                value: category.id
            })
        });

        this.setState({
            categories_options: categories_options,
            isLoading: false,
        })

    };

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchThemes = (response) => {

        const data = response.data;

        let themes_options = [];

        data.themes.forEach(function(theme) {
            themes_options.push({
                key: theme.id,
                text: theme.name,
                value: theme.id
            })
        });

        this.setState({
            themes_options: themes_options,
            isLoading: false,
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

    handleChangeDate = async (event) => {

        const input = event.target;
        const value = input.value;

        await this.setState({
            [input.name]: value
        });

    };

    handleSelectCategoryChange = (event, data) => {

        let categoriesChoosed = this.state.categoriesChoosed;
        categoriesChoosed.push(data.value);

        //escolher sempre a ultima posição, que é um array!
        this.setState({
            categoriesChoosed : categoriesChoosed,
        });

        console.log(this.state.categoriesChoosed);
    };

    handleSelectThemeChange = (event, data) => {

        let themesChoosed = this.state.themesChoosed;
        themesChoosed.push(data.value);

        //escolher sempre a ultima posição, que é um array!
        this.setState({
            themesChoosed : themesChoosed,
        });

        console.log(this.state.themesChoosed);
    };

    handleSubmit = () => {

        const { categoriesChoosed, themesChoosed , date} = this.state;
        if(categoriesChoosed.length > 0 && categoriesChoosed.length > 0 && date!=='') {


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
            message: 'Aula teórica registada com sucesso',
            error: ''
        });

    };

    render() {

        return (
            <Container style={{marginTop: 30, marginBottom:'10%'}}>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Breadcrumb size='large'>
                    <Breadcrumb.Section
                        style={{color: 'grey'}}
                        onClick={() => this.props.history.push(Routes.LESSONS)}
                    >
                        Minhas Aulas
                    </Breadcrumb.Section>

                    <Breadcrumb.Divider icon='right angle' />
                    <Breadcrumb.Section active>{'Marcar Aula Teórica'}</Breadcrumb.Section>
                </Breadcrumb>
                <Segment color='orange'>
                    <Header
                        className='centered'
                        as='h3'
                    >
                        Marcar Aula Teórica
                    </Header>
                    <Form>
                        <Form.Select
                            className={(this.state.error && this.state.categoriesChoosed.length === 0) ? "error field" : "field"}
                            search
                            selection
                            fluid
                            multiple
                            allowAdditions
                            label='Categorias'
                            options={this.state.categories_options}
                            placeholder='Categorias'
                            name={"category"}
                            onAddItem={this.handleSelectCategoryChange}
                            onChange={this.handleSelectCategoryChange}
                        />
                        <Form.Select
                            className={(this.state.error && this.state.themesChoosed.length === 0) ? "error field" : "field"}
                            search
                            selection
                            fluid
                            multiple
                            allowAdditions
                            label='Temas'
                            options={this.state.themes_options}
                            placeholder='Temas'
                            name={"themes"}
                            onAddItem={this.handleSelectThemeChange}
                            onChange={this.handleSelectThemeChange}
                        />
                        <Form.Field
                            className={(this.state.error && this.state.date === '') ? "error field" : "field"}
                            control={Input}
                            label='Data da aula'
                            placeholder='Data da aula'
                            name={"date"}
                            type="datetime-local"
                            onChange={this.handleChangeDate}
                        />
                        <Button
                            disabled={
                                this.state.categoriesChoosed.length === 0
                                ||
                                (this.state.categoriesChoosed &&
                                    this.state.categoriesChoosed[this.state.categoriesChoosed.length -1].length === 0)
                                ||
                                this.state.themesChoosed.length === 0
                                ||
                                (this.state.themesChoosed &&
                                    this.state.themesChoosed[this.state.themesChoosed.length -1].length === 0)
                                ||
                                this.state.date==='' }
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
            </Container>
        )
    }
}

export default MarkTheoreticalLesson;