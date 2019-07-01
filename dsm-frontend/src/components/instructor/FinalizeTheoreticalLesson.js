import React, {Component} from 'react';
import {
    Container, Loader, Dimmer, Breadcrumb, Icon, Card, List,
    Button, Divider, Dropdown, Pagination, Segment, Form, Table, Grid,
} from 'semantic-ui-react';

import {fetchApi} from "../../services/api";
import Routes from "../../services/Routes";

import {StudentFilter} from "../students/StudentFilter";
import _ from "lodash";
import Authentication from "../../services/Authentication";


class FinalizeTheoreticalLesson extends Component {

    constructor(props) {
        super(props);

        this.state = {

            // Loading
            isLoading : false,
            isSearching: false,
            lesson: undefined,

            allStudents: [],
            students: [],
            choosedStudents: [],
            totalCount: 0,
            query: '',

            _column: null,
            _direction: null,
            _page: 1,
            _limit: 5,


        };
    }

    async componentDidMount() {

        if(this.props.history.location.state &&
            this.props.history.location.state.lesson
        ) {
            await this.setState({
                lesson: this.props.history.location.state.lesson,
                isLoading: false
            });

            fetchApi(
                'get','/students',
                {},  {},
                this.successHandler, this.errorHandler
            );
        }
        else {
            this.props.history.push(Routes.LESSONS);
        }



    }


    /**
     * Handle the response.
     * @param response
     */
    successHandler = (response) => {

        this.setState({
            allStudents: response.data.students,
            students: response.data.students
                .slice((this.state._page - 1) * this.state._limit ,
                    (this.state._page * this.state._limit)),
            totalCount: response.data.students.length
        });

        setTimeout(
            () => this.setState({
                isLoading: false,}) , 1000);
    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {
        // bad request
        if(error.response && error.response.status && error.response.status === 400) {
            this.setState({
                isLoading: false
            })
        }
        else if(error.response && error.response.status && error.response.status === 401) {
            Authentication.clearData();
            window.location.reload();
            alert("As suas credenciais já não são válidas.");
        }
    };

    categoryNames = () => {

        let categories = this.state.lesson.categories.collection;

        let res = categories.map( category => ("Categoria " + category.name));

        return res;
    };

    themeNames = () => {

        let themes = this.state.lesson.themes.collection;

        let res = themes.map( theme => (theme.name));

        return res;
    };

    onChangeLimit(event, data) {

        const { allStudents, students, _column } = this.state;

        if (data.value !== this.state._limit) {

            if(data.value > this.state._limit) {

                this.setState({
                    isLoading: true,
                    _column: null,
                    students: _.slice(allStudents, 0, data.value),
                    _limit: data.value,
                    _page: 1
                }, () => {

                    if (_column !== null)
                        this.handleSort(_column);

                    this.setState({
                        isLoading: false
                    });
                });

            } else {
                this.setState({
                    isLoading: true,
                    students: _.slice(students, 0, data.value),
                    _limit: data.value,
                    _page: 1
                }, () => {

                    this.setState({
                        isLoading: false
                    });
                });
            }
        }
    }

    contains = (field, query) => {
        return !!field.includes(query);
    };

    onSubmitFilter(filter) {

        if (filter !== this.state.query) {
            const formatText = _.capitalize(filter);

            //Filtrar os AllStudents ou só os da própria página?
            const students = _.filter(this.state.allStudents, student => {
                return this.contains(student.name, formatText);
            });

            this.setState({
                query: filter,
                _page: 1,
                students: students
                    .slice((this.state._page - 1) * this.state._limit ,
                        (this.state._page * this.state._limit)),
                //isSearching: true
            });
        }
        else if(filter === ''){
            this.setState({
                query: filter,
                _page: 1,
                students: this.state.allStudents
                    .slice((this.state._page - 1) * this.state._limit ,
                        (this.state._page * this.state._limit)),
                //isSearching: true
            });
        }
    }

    onChangePage = (e, data) => {
        const {activePage} = data;
        if (activePage !== this.state._page) {
            this.setState({
                _page: activePage,
                students: this.state.allStudents
                    .slice((activePage - 1) * this.state._limit , (activePage * this.state._limit)),
            });
        }
    };

    handleSort = clickedColumn => () => {

        const { _column, students, _direction } = this.state;

        if (_column !== clickedColumn) {

            this.setState({
                _column: clickedColumn,
                _direction: 'ascending',
                students: _.sortBy(students, [clickedColumn]),
            });
        }
        else {
            this.setState({
                students: students.reverse(),
                _direction: _direction === 'ascending' ? 'descending' : 'ascending',
            });
        }
    };

    handleAddUser = (student) => {

        const choosedStudents = this.state.choosedStudents;

        choosedStudents.push(student);

        this.setState({
           choosedStudents: choosedStudents,
        });

    };

    render() {

        const { students, _column, _direction } = this.state;

        const limitOptions = [
            {key: '0', value: 5, text: '5'},
            {key: '1', value: 10, text: '10'},
            {key: '2', value: 25, text: '25'},
            {key: '3', value: 50, text: '50'}
        ];

        const studentsRows = _.map(students, item => (
            <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell collapsing>
                    <Button
                        color='orange'
                        inverted
                        onClick={() => this.handleAddUser(item)}
                    >
                        Adicionar
                    </Button>
                </Table.Cell>
            </Table.Row>
        ));

        const cardLesson = (
            <Card fluid raised color={'orange'} >
                <Card.Content>
                    <Card.Header style={{color: '#f2711c'}}>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='orange' name='calendar' />
                        </Icon.Group>
                        {'Finalizar Aula Teórica'}
                    </Card.Header>
                </Card.Content>
                <Card.Content >
                    <List>
                        {this.state.lesson &&
                            <List.Item key={this.state.lesson.id} style={{marginBottom: "10px"}}>
                                <Icon name='calendar outline'/>
                                <List.Content>
                                    <List.Header>Aula Teórica</List.Header>
                                    <List.Description style={{marginTop: "3px"}}>
                                        <b>Início:</b> {" " + this.state.lesson.startTime.split(" ")[0]} às
                                        {" " + this.state.lesson.startTime.split(" ")[1].replace(":", "h") + "min"}
                                    </List.Description>
                                    <List.Description style={{marginTop: "3px"}}>
                                        <b>Duração:</b> {" " + this.state.lesson.duration + " min"}
                                    </List.Description>
                                    <List.Description style={{marginTop: "3px"}}>
                                        <b>Categorias:</b> {" " + this.categoryNames().join(', ')}
                                    </List.Description>
                                    <List.Description style={{marginTop: "3px"}}>
                                        <b>Temas:</b> {" " + this.themeNames().join(', ')}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        }
                    </List>
                </Card.Content>
            </Card>
        );

        const cardChoosedStudents = (
            <Card fluid raised color={'black'} >
                <Card.Content>
                    <Card.Header style={{color: '#0d0d0d'}}>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='black' name='clipboard check' />
                        </Icon.Group>
                        {'Alunos Presentes'}
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    {this.state.choosedStudents.length > 0 &&
                    <List divided>
                        {this.state.choosedStudents.map( student => (
                            <List.Item key={student.id} style={{marginBottom: "10px"}} verticalAlign={'middle'}>
                                <Icon name='user'/>
                                <List.Content>
                                    <List.Header>{student.name}</List.Header>
                                </List.Content>
                            </List.Item>
                        ))
                        }
                    </List>
                    }
                    <Button
                        //color='black'
                        floated={'right'}
                        disabled={!(this.state.choosedStudents.length > 0)}
                        //onClick={() => this.handleAddUser(item)}
                    >
                        FINALIZAR
                    </Button>
                </Card.Content>
            </Card>
        );

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
                    <Breadcrumb.Section active>{'Registar Presenças'}</Breadcrumb.Section>
                </Breadcrumb>
                <Container style={{marginTop: "30px"}}>
                    <Grid >
                        <Grid.Row>
                            <Grid stackable centered columns={2}>
                                <Grid.Column>
                                    {cardLesson}
                                </Grid.Column>
                                <Grid.Column>
                                    {cardChoosedStudents}
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                    </Grid>
                    <Segment loading={this.state.isLoading}>
                        <Form>
                            <Form.Group widths='equal'>
                                <StudentFilter
                                    filter={this.state.query}
                                    totalCount={this.state.totalCount}
                                    onSubmitFilter={this.onSubmitFilter.bind(this)}
                                    isSearching={this.state.isSearching}
                                />
                            </Form.Group>
                        </Form>
                        <Divider />
                        <React.Fragment>
                            {'Alunos por página: '}
                            <Dropdown
                                inline
                                style={{marginLeft: '5px'}}
                                options={limitOptions}
                                defaultValue={this.state._limit}
                                onChange={this.onChangeLimit.bind(this)}
                            />
                        </React.Fragment>
                        <Table celled selectable sortable >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell
                                        collapsing
                                        sorted={_column === 'id' ? _direction : null}
                                        onClick={this.handleSort('id')}>ID
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={_column === 'firstName' ? _direction : null}
                                        onClick={this.handleSort('firstName')}>Nome
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={_column === 'email' ? _direction : null}
                                        onClick={this.handleSort('email')}>Email
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {studentsRows}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='4'>
                                        <Pagination
                                            firstItem={null}
                                            lastItem={null}
                                            pointing
                                            secondary
                                            totalPages={Math.ceil(this.state.totalCount / this.state._limit)}
                                            activePage={this.state._page}
                                            onPageChange={this.onChangePage}
                                        />
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Segment>

                </Container>
            </Container>
        )
    }
}

export default FinalizeTheoreticalLesson;