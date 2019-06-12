import React, {Component} from 'react';
import {
    Container,
    Dimmer,
    Loader,
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
            _limit: 10,

            isSearching: false,
            isLoading: true
        }
    };

    componentDidMount() {

        fetchApi(
            'get','/students',
            {},  {},
            this.successHandler, this.errorHandler
        );

        this.setState({
            isLoading: false
        });
    }

    /**
     * Handle the response.
     * @param response
     */
    successHandler = (response) => {

        if (response.success) {

            this.setState({
                allStudents: response.students,
                students: response.students,
                totalCount: response.students.length
            });
        }
    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

        console.log(error);
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

    onSubmitFilter(filter) {
        if (filter !== this.state.query) {
            this.setState({ query: filter, _page: 1, loading: true });
        }
    }

    onChangePage(event, data) {
        const {activePage} = data;
        if (activePage !== this.state._page) {
            this.setState({ _page: activePage });
        }
    }

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
            {key: '0', value: 10, text: '10'},
            {key: '1', value: 25, text: '25'},
            {key: '2', value: 50, text: '50'}
        ];

        const studentsRows = _.map(students, item => (
            <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.firstName + ' ' + item.lastName}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
            </Table.Row>
        ));

        return (
            <Container style={{marginTop: '30px'}}>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Statistic.Group size={'tiny'} widths={'two'}>
                    <Statistic >
                        <Statistic.Value>
                            <Icon name='user' />
                            100
                        </Statistic.Value>
                        <Statistic.Label>Alunos</Statistic.Label>
                    </Statistic>
                    <Statistic >
                        <Statistic.Value>
                            <Icon name='check' />
                            {this.state.totalCount}
                        </Statistic.Value>
                        <Statistic.Label>Ativos</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <Segment>
                    <Form>
                        <Form.Group widths='equal'>
                            <Button icon labelPosition='left'
                                    size='small' color='grey'
                                    style={{marginTop: '10px', marginLeft: '5px'}}
                            >
                                <Icon name='user' />
                                <p>Adicionar</p>
                            </Button>
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
                            //onChange={this.onChangeLimit.bind(this)}
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
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {studentsRows}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>
                                    <Pagination
                                        firstItem={null}
                                        lastItem={null}
                                        pointing
                                        secondary
                                        totalPages={Math.ceil(this.state.totalCount / this.state._limit)}
                                        activePage={this.state._page}
                                        onPageChange={this.onChangePage.bind(this)}
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