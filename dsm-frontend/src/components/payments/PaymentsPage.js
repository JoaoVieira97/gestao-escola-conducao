import React, {Component} from 'react';
import {Container, Header, Table, Menu, Icon, Grid, Dropdown, Loader, Dimmer} from 'semantic-ui-react';
import {fetchApi} from "../../services/api";


class PaymentsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
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
        }
    };

    componentDidMount() {

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

        /*
        setTimeout(()=>{
            this.setState({isLoading: false});
        }, 1000); */
    }

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

            /*
            //VALORES PARA A CATEGORIA INICIAL
            let dateSubscription = data.registers[0].initialDate;
            let dateLimit = '20/10/2019';
            let theoreticalLessons = categoriesRegister[0].theoreticalLessons;
            let practicalLessons = categoriesRegister[0].practicalLessons;
            let nameInstructor = data.registers[0].instructor.firstName + " " + data.registers[0].instructor.lastName;

            //collection ou iterator??
            let payments = data.registers[0].payments.collection.map( payment => {

                return {
                    id: payment.id,
                    value: payment.value,
                    timestamp: payment.timestamp,
                }
            });*/

            this.setState({
                allRegisters: data.registers,
                allCategories: categories,
            });

        }
    };


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
    };

    handleChange = (event, data) => {

        if(data.value){

            let categoryChoosed = this.state.allCategories.filter(category => (category.value === data.value));
            let categoryId = categoryChoosed[0].key;

            let registerChoosed = this.state.allRegisters.filter(register => (register.category.id === categoryId));

            let dateSubscription = registerChoosed[0].initialDate;
            let dateLimit = '20/10/2019';
            let theoreticalLessons = registerChoosed[0].category.theoreticalLessons;
            let practicalLessons = registerChoosed[0].category.practicalLessons;
            let nameInstructor = registerChoosed[0].instructor.name;

            //collection ou iterator??
            let payments = registerChoosed[0].payments.collection.map( payment => {
                return {
                    id: payment.id,
                    value: payment.value,
                    timestamp: payment.timestamp,
                }
            });

            let actualPaid = payments.reduce( (acc, payment) => acc + payment.value, 0);

            let categoriesPracticalRealized = this.state.practicalRealized.map( practLesson => (
                practLesson.categories.collection));

            let practicalRealized = categoriesPracticalRealized.map( category => (
               category.filter( cat => (cat.id === categoryId))));

            let categoriesTheoreticalRealized = this.state.theoreticalRealized.map( theoLesson => (
                theoLesson.categories.collection));

            let theoreticalRealized = categoriesTheoreticalRealized.map( category =>
                    (category.filter( cat => (cat.id === categoryId))));

            this.setState({
                //categoryChoosed: registerChoosed[0].category,
                dateSubscription: dateSubscription,
                dateLimit: dateLimit,
                totalTheoreticalLessons: theoreticalLessons,
                totalPracticalLessons: practicalLessons,
                nameInstructor: nameInstructor,
                payments: payments,
                numberPracticalRealized: practicalRealized.length,
                numberTheoreticalRealized: theoreticalRealized.length,
                actualPaid: actualPaid,
            });
        }
        else{
            this.setState({
                //categoryChoosed: registerChoosed[0].category,
                dateSubscription: '',
                dateLimit: '',
                totalTheoreticalLessons: 0,
                numberPracticalRealized: 0,
                numberTheoreticalRealized: 0,
                totalPracticalLessons: 0,
                nameInstructor: '',
                payments: [],
                actualPaid: 0,
            });

        }

    };

    render() {

        const payments = (
            this.state.payments.map(payment => (
                <Table.Row key={payment.id}>
                    <Table.Cell>{payment.timestamp}</Table.Cell>
                    <Table.Cell> ... </Table.Cell>
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
                                <Header.Content>Nome Utilizador</Header.Content>
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
                            <Header as='h3' textAlign={'left'}>Registo de exames: ... </Header>
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
                                        <Header as='h3' textAlign={'right'}>Valor: {this.state.actualPaid}€ / 500 €</Header>
                                    </Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='4'>
                                        <Menu floated='right' pagination>
                                            <Menu.Item as='a' icon>
                                                <Icon name='chevron left' />
                                            </Menu.Item>
                                            <Menu.Item as='a'>1</Menu.Item>
                                            <Menu.Item as='a'>2</Menu.Item>
                                            <Menu.Item as='a' icon>
                                                <Icon name='chevron right' />
                                            </Menu.Item>
                                        </Menu>
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