import React, {Component} from 'react';
import {
    Container,
    Header,
    Table,
    Icon,
    Grid,
    Dropdown,
    Loader,
    Dimmer,
    Pagination,
    List,
    Label,
    Card, Message
} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";
import moment from 'moment';
import _ from "lodash";



class PaymentsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            nameUser: '',
            emailUser: '',
            exams: [],
            allRegisters: [],
            payments: [],
            allCategories: [],
            categoryChoosed: {},
            dateSubscription: '',
            dateLimit: '',
            totalTheoreticalLessons: 0,
            theoreticalRealized: [],
            numberTheoreticalRealized: 0,
            totalPracticalLessons: 0,
            practicalRealized: [],
            numberPracticalRealized: 0,
            nameInstructor: '',
            actualPaid: 0,
            totalPrice: 0,

            messageCategoryNotSelected: true,

            _column: null,
            _direction: null,
            _limit: 5,
            _page: 1,
        }
    };

    componentDidMount() {

        fetchApi(
            'get','/student/information?id=1', //TODO Find userID
            {},  {},
            this.successFetchInformation, this.errorHandler
        );


        fetchApi(
            'get','/student/registers?id=1', //TODO Find userID
            {},  {},
            this.successFetchRegisters, this.errorHandler
        );

        fetchApi(
            'get','/lessons/student?id=1', //TODO Find userID
            {},  {},
            this.successFetchLessons, this.errorHandler
        );

    }

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchInformation = (response) => {
        const data = response.data;

        this.setState({
            nameUser: data.name,
            emailUser: data.email,
            exams: data.exams,
        });
    };

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchRegisters = (response) => {
        const data = response.data;

        //key -> registers.id
        let categoriesRegister = data.registers.map(register => (register.category));

        let categories = categoriesRegister.map( category => {
            return {
                key: category.id,
                value: "Categoria " + category.name,
                text: "Categoria " + category.name,
            }
        });

        this.setState({
            allRegisters: data.registers,
            allCategories: categories,
        });

    };


    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchLessons = (response) => {
        const data = response.data;

        this.setState({
            theoreticalRealized : data.theoreticalLessons,
            practicalRealized : data.practicalLessons,
        });

        //stop loading
        setTimeout(()=>{
            this.setState({isLoading: false});
        }, 1000);
    };


    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

        console.log(error);

        /*
        // bad request
        if(error.response.status === 400) {
            this.setState({
                loginError: true,
                loginErrorMessage: 'As credenciais que introduziu estão erradas.'
            });
        }
        // invalid API access token
        else {
            this.setState({
                loginError: true,
                loginErrorMessage: 'Ocorreu um erro ao estabelecer conexão com o servidor principal.'
            });
        }*/
    };

    handleChange = (event, data) => {

        if(data.value){

            let categoryChoosed = this.state.allCategories.filter(category => (category.value === data.value));
            let categoryId = categoryChoosed[0].key;

            let registerChoosed = this.state.allRegisters.filter(register => (register.category.id === categoryId));

            let dateSubscription = registerChoosed[0].initialDate;

            let date = dateSubscription.split("/");
            let dateLimit = moment(date[2]+'-'+date[1]+'-'+date[0]).add(2,'years').format('DD/MM/YYYY');
            let theoreticalLessons = registerChoosed[0].category.theoreticalLessons;
            let practicalLessons = registerChoosed[0].category.practicalLessons;
            let totalPrice = registerChoosed[0].category.price;
            let nameInstructor = registerChoosed[0].instructor.name;

            //collection ou iterator??
            let payments = registerChoosed[0].payments.collection.map( payment => {
                return {
                    id: payment.id,
                    value: payment.value,
                    description: payment.description,
                    timestamp: payment.timestamp,
                }
            });

            let actualPaid = payments.reduce( (acc, payment) => acc + payment.value, 0);

            let categoriesPracticalRealized = this.state.practicalRealized.map( practLesson => (
                practLesson.categories.collection));

            let practicalRealized = categoriesPracticalRealized.map( category => (
                category.filter( cat => (cat.id === categoryId))));

            let numberP = practicalRealized.reduce( (acc, array) => acc + array.length, 0);

            let categoriesTheoreticalRealized = this.state.theoreticalRealized.map( theoLesson => (
                theoLesson.categories.collection));

            let theoreticalRealized = categoriesTheoreticalRealized.map( category =>
                (category.filter( cat => (cat.id === categoryId))));

            let numberT = theoreticalRealized.reduce( (acc, array) => acc + array.length, 0);

            this.setState({
                //categoryChoosed: registerChoosed[0].category,
                dateSubscription: dateSubscription,
                dateLimit: dateLimit,
                totalTheoreticalLessons: theoreticalLessons,
                totalPracticalLessons: practicalLessons,
                numberPracticalRealized: numberP,
                numberTheoreticalRealized: numberT,
                nameInstructor: nameInstructor,
                payments: payments,
                actualPaid: actualPaid,
                totalPrice: totalPrice,
                messageCategoryNotSelected: false,
            });
        }
        else{
            this.setState({
                //categoryChoosed: registerChoosed[0].category,
                dateSubscription: '',
                dateLimit: '',
                totalTheoreticalLessons: 0,
                totalPracticalLessons: 0,
                numberPracticalRealized: 0,
                numberTheoreticalRealized: 0,
                nameInstructor: '',
                payments: [],
                actualPaid: 0,
                totalPrice: 0,
                messageCategoryNotSelected: true,
            });

        }

    };

    onChangePage(event, data) {
        const {activePage} = data;
        if (activePage !== this.state._page) {
            this.setState({ _page: activePage });
        }
    }

    handleSort = clickedColumn => () => {

        const { _column, payments, _direction } = this.state;

        if (_column !== clickedColumn) {

            this.setState({
                _column: clickedColumn,
                _direction: 'ascending',
                payments: _.sortBy(payments, [clickedColumn]),
            });
        }
        else {
            this.setState({
                payments: payments.reverse(),
                _direction: _direction === 'ascending' ? 'descending' : 'ascending',
            });
        }
    };

    handleDismiss = () => {
        this.setState({ messageCategoryNotSelected: false })

    };

    render() {

        const { payments, _column, _direction , _limit, _page } = this.state;

        const paymentsPage = payments.slice( (_page - 1) * _limit , _page * _limit);

        const paymentsR = (
            paymentsPage.map(payment => (
                    <Table.Row key={payment.id}>
                        <Table.Cell>{payment.timestamp}</Table.Cell>
                        <Table.Cell>{payment.description} </Table.Cell>
                        <Table.Cell>{payment.value}€</Table.Cell>
                    </Table.Row>
                )
            ));

        const exams = (
            this.state.exams.length>0 ? this.state.exams.map( exam =>
                    <List.Item key={exam.id}>
                        <Icon size='large' name='clipboard' />
                        <List.Content>
                            <List.Header>{exam.description}</List.Header>
                            <List.Description style={{marginTop: "3px"}}>
                                <b>Data:</b> {" "+ (exam.startTime.split(" "))[0]}
                            </List.Description>
                            <List.Description style={{marginTop: "3px"}}>
                                <b> Início: </b> {" "+ (exam.startTime.split(" "))[1].replace(':',"h")+'min'}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                 ) :
                <List.Item>
                    <List.Header>Não há registo de exames.</List.Header>
                </List.Item>
        );

        const cardExams = (
            <div className={"ui fluid card grey"}>
                <Card.Content>
                    <Card.Header>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='grey' name='calendar' />
                        </Icon.Group>
                        Registo de Exames
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <List animated divided relaxed={'very'} verticalAlign='middle'>
                        {exams}
                    </List>
                </Card.Content>
            </div>
        );


        const tablePayments = (
            <Table  sortable celled inverted fluid="true" striped stackable verticalAlign='bottom'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            collapsing
                            sorted={_column === 'date' ? _direction : null}
                            onClick={this.handleSort('date')}>Data do Pagamento
                        </Table.HeaderCell>
                        <Table.HeaderCell> Descrição </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={_column === 'value' ? _direction : null}
                            onClick={this.handleSort('value')}>Valor
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {paymentsR}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Header as='h3' textAlign={'right'} inverted color='grey'>Montante Pago: {this.state.actualPaid}€
                                / {this.state.totalPrice}€</Header>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Pagination
                                firstItem={null}
                                lastItem={null}
                                pointing
                                secondary
                                inverted
                                floated='right'
                                totalPages={Math.ceil(this.state.payments.length / this.state._limit)}
                                activePage={this.state._page}
                                onPageChange={this.onChangePage.bind(this)}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );

        return (
            <Container style={{marginBottom:100}}>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Grid columns={2} stackable>
                    <Grid.Column width={8} >
                        <Container textAlign={'left'}>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='user circle' size='massive'/>
                                <Header.Content>{this.state.nameUser}</Header.Content>
                            </Header>
                            <div style={{ width: '100%',
                                marginTop: 10,
                                marginBottom: 10,
                                padding: 15,
                                borderRadius: 7,
                                backgroundColor: '#fff',
                                // shadow
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                                elevation: 3}}
                            >
                                <Header as='h3' textAlign='left'>
                                    Categoria: <Dropdown
                                    placeholder="Selecione uma categoria"
                                    selection
                                    clearable
                                    options={this.state.allCategories}
                                    //defaultValue={this.state.categoryChoosed.value}
                                    onChange={this.handleChange}

                                />
                                </Header>
                            </div>
                            <div style={{ width: '100%',
                                            marginTop: 10,
                                            marginBottom: 10,
                                            padding: 15,
                                            borderRadius: 7,
                                            backgroundColor: '#fff',
                                            // shadow
                                             shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.22,
                                            shadowRadius: 2.22,
                                            elevation: 3}}
                            >
                                <Header as='h3' textAlign={'left'}>
                                    Inscrição a: <Label color={'black'}
                                                        size={'large'}> {this.state.dateSubscription} </Label>
                                </Header>
                                <Header as='h3' >Validade até: <Label color={'black'}
                                                                      size={'large'}> {this.state.dateLimit} </Label>

                                </Header>
                                <Header as='h3' >Aulas teóricas realizadas:
                                    <Label color={'black'}
                                           size={'large'}>
                                        {this.state.numberTheoreticalRealized} / {this.state.totalTheoreticalLessons}
                                    </Label>
                                </Header>
                                <Header as='h3' >Aulas práticas realizadas:
                                    <Label color={'black'}
                                           size={'large'}>
                                        {this.state.numberPracticalRealized} / {this.state.totalPracticalLessons}
                                    </Label>
                                </Header>
                                <Header as='h3' >Instrutor atual: <Label color={'black'}
                                                                         size={'large'}>
                                                                    {this.state.nameInstructor} </Label>
                                </Header>
                            </div>

                            {cardExams}

                        </Container>
                    </Grid.Column>
                    <Grid.Column width={8} style={{marginTop:'120px'}}>
                        {
                            this.state.messageCategoryNotSelected ?
                                <div>
                                    <Message
                                        onDismiss={this.handleDismiss}
                                        size={'large'}
                                        error
                                        header={'Categoria não selecionada'}
                                        content={'Tem de selecionar uma categoria para verificar os respetivos pagamentos.'}
                                    />
                                    {tablePayments}
                                </div>
                                :
                                <div>
                                    {tablePayments}
                                </div>
                        }
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default PaymentsPage;