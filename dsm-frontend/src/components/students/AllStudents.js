import React, {Component} from 'react';
import {
    Container,
    Button,
    Icon,
    Table,
    Statistic,
    Pagination,
    Segment,
    Divider,
    Dropdown,
    Form
} from 'semantic-ui-react';
import _ from 'lodash';
import { fetchApi } from '../../services/api/index';
import {StudentFilter} from "./StudentFilter";
import Routes from "../../services/Routes";
import Authentication from "../../services/Authentication";


class AllStudents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allStudents: [],
            students: [],
            totalCount: 0,
            query: '',

            _column: null,
            _direction: null,
            _page: 1,
            _limit: 5,

            userType: '',

            isSearching: false,
            isLoading: true
        }
    };

    async componentDidMount() {

        const userType = Authentication.getUserType();

        await this.setState({
            userType : userType,
        });

        if(userType === 'ROLE_SECRETARY'){

            fetchApi(
                'get','/students',
                {},  {},
                this.successHandler, this.errorHandler
            );
        }
        else{

            //ROLE_INSTRUCTOR
            fetchApi(
                'get','/instructor/students',
                {},  {},
                this.successHandler, this.errorHandler
            );
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

        this.setState({isLoading: false});
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
                        onClick={() => this.props.history.push(Routes.STUDENT_PROFILE, {student: item})}
                    >
                        Ver perfil
                    </Button>
                </Table.Cell>
            </Table.Row>
        ));

        return (
            <Container style={{marginTop: '30px', marginBottom: '70px'}}>
                <Statistic.Group size={'small'} widths={'one'}>
                    <Statistic>
                      <Statistic.Value>
                        <Icon name='user' color='grey'/>
                        {this.state.totalCount}
                      </Statistic.Value>
                      <Statistic.Label>ALUNOS</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <Segment loading={this.state.isLoading}>
                    <Form>
                        <Form.Group widths='equal'>
                            {this.state.userType === 'ROLE_SECRETARY' &&
                                <Button icon labelPosition='left'
                                        size='small' color='grey'
                                        style={{marginTop: '10px', marginLeft: '5px'}}
                                        onClick={() => this.props.history.push(Routes.REGISTER_STUDENT)}
                                >
                                    <Icon name='user'/>
                                    <p>Adicionar</p>
                                </Button>
                            }
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
        );
    }
}

export default AllStudents;