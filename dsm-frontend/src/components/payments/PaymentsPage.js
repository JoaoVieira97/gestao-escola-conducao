import React, {Component} from 'react';
import {Container, Header, Table, Icon, Grid, Dropdown, Loader, Dimmer, Pagination} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";
import moment from 'moment';


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
            _limit: 5,
            _page: 1,
        }
    };

    async componentDidMount() {

        await fetchApi(
            'get','/student/information?id=1', //TODO Find userID
            {},  {},
            this.successFetchInformation, this.errorHandler
        );

        /*setTimeout(()=>{

            fetchApi(
                'get','/student/registers?id=1', //TODO Find userID
                {},  {},
                this.successFetchRegisters, this.errorHandler
            );

        }, 2000);*/


        await fetchApi(
            'get','/student/registers?id=1', //TODO Find userID
            {},  {},
            this.successFetchRegisters, this.errorHandler
        );

        /*
        setTimeout(()=>{

            fetchApi(
                'get','/lessons/student?id=1', //TODO Find userID
                {},  {},
                this.successFetchLessons, this.errorHandler
            );

        }, 2000);*/


        await fetchApi(
            'get','/lessons/student?id=1', //TODO Find userID
            {},  {},
            this.successFetchLessons, this.errorHandler
        );

        /*
        setTimeout(()=>{
            this.setState({isLoading: false});
        }, 1000); */
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

        //Verify sucess on other way
        if (data.success) {
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

        }
    };


    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchLessons = (response) => {
        const data = response.data;

        //Verify sucess on other way
        if (data.success) {
            this.setState({
                theoreticalRealized : data.theoreticalLessons,
                practicalRealized : data.practicalLessons,
            });
        }

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
            let dateLimit = moment(dateSubscription).add(2,'years').format('YYYY-MM-DD');
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
            });

        }

    };

    render() {

        const payments = (
            this.state.payments.map(payment => (
                    <Table.Row key={payment.id}>
                        <Table.Cell>{payment.timestamp}</Table.Cell>
                        <Table.Cell>{payment.description} </Table.Cell>
                        <Table.Cell>{payment.value}€</Table.Cell>
                    </Table.Row>
                )
            ));

        return (
            <Container>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Grid columns={2} stackable>
                    <Grid.Column width={8} >
                        <Container textAlign={'center'}>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='user circle' size='massive'/>
                                <Header.Content>{this.state.nameUser}</Header.Content>
                            </Header>
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

                            <Header as='h3' textAlign={'left'}>
                                Inscrição a: {this.state.dateSubscription}
                            </Header>
                            <Header as='h3' textAlign={'left'}>Validade até: {this.state.dateLimit}</Header>
                            <Header as='h3' textAlign={'left'}>Aulas teóricas realizadas: {this.state.numberTheoreticalRealized} / {this.state.totalTheoreticalLessons}</Header>
                            <Header as='h3' textAlign={'left'}>Aulas práticas realizadas: {this.state.numberPracticalRealized} / {this.state.totalPracticalLessons}</Header>
                            <Header as='h3' textAlign={'left'}>Instrutor atual: {this.state.nameInstructor}</Header>
                            <Header as='h3' textAlign={'left'}>Registo de exames:
                                {
                                    this.state.exams ? this.state.exams.map( exam =>
                                        ( exam.description + ' em ' + exam.startTime + "\n")  ) : 'Não há registo de exames.'
                                }
                            </Header>
                        </Container>
                    </Grid.Column>
                    <Grid.Column width={8} style={{marginTop:50}}>
                        <Table inverted fluid="true" striped stackable padded='very' verticalAlign='bottom'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Data Pagamento</Table.HeaderCell>
                                    <Table.HeaderCell>Descrição</Table.HeaderCell>
                                    <Table.HeaderCell>Valor</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {payments}
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
                                            //onPageChange={this.onChangePage.bind(this)}
                                        />
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default PaymentsPage;