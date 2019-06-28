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
    Form,
    Modal,
    Header
} from 'semantic-ui-react';
import _ from 'lodash';
import { fetchApi } from '../../services/api/index';
import {StudentFilter} from "./StudentFilter";
import Routes from "../../services/Routes";



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

        setTimeout(()=>{
            this.setState({isLoading: false});
        }, 1000);
    }

    /**
     * Handle the response.
     * @param response
     */
    successHandler = (response) => {

        this.setState({
            allStudents: response.data.students,
            students: response.data.students,
            totalCount: response.data.students.length
        });
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
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell collapsing>
                    <Modal 
                        trigger={<Button>Gerir</Button>} 
                        closeIcon
                        size='small'
                    >
                        <Header icon='user' content={item.name} />
                        <Modal.Content>
                            <Button
                                icon
                                labelPosition='left'
                                color='grey'
                                onClick={() => this.props.history.push(Routes.REGISTER_STUDENT_CATEGORY, {student: item})}
                            >
                                <Icon name='file alternate outline' color='yellow'/>
                                <p>Categorias</p>
                            </Button>
                            <Button
                                icon
                                labelPosition='left'
                                color='grey'
                                onClick={() => this.props.history.push(Routes.REGISTER_STUDENT_PAYMENT, {student: item})}
                            >
                                <Icon name='euro sign' color='yellow'/>
                                <p>Pagamentos</p>
                            </Button>
                            <Button
                                icon
                                labelPosition='left'
                                color='grey'
                                onClick={() => this.props.history.push(Routes.REGISTER_STUDENT_EXAM, {student: item})}
                            >
                                <Icon name='clipboard outline' color='yellow'/>
                                <p>Exames</p>
                            </Button>
                            <Button
                                icon
                                labelPosition='left'
                                color='grey'
                                onClick={() => this.props.history.push(Routes.STUDENT_PROFILE, {student: item})}
                            >
                                <Icon name='user outline' color='yellow'/>
                                <p>Perfil</p>
                            </Button>
                        </Modal.Content>
                    </Modal>
                </Table.Cell>
            </Table.Row>
        ));

        return (
            <Container style={{marginTop: '30px'}}>
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
                <Segment loading={this.state.isLoading}>
                    <Form>
                        <Form.Group widths='equal'>
                            <Button icon labelPosition='left'
                                    size='small' color='grey'
                                    style={{marginTop: '10px', marginLeft: '5px'}}
                                    onClick={() => this.props.history.push(Routes.REGISTER_STUDENT)}
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