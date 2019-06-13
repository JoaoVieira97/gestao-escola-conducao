import React, {Component} from 'react';
import { Container, Header, Table, Menu, Icon, Grid, Dropdown } from 'semantic-ui-react';
import {fetchApi} from "../../services/api";


class PaymentsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            allRegisters: [],
            payments: [],
            allCategories: [],
            categoryChoosed: {
                key: 'A',
                text: 'A',
                value: 'A',
            },
            dateSubscription: '',
            dateLimit: '',
            theoreticalLessons: 0,
            practicalLessons: 0,
            nameInstructor: '',
        }
    };

    componentDidMount() {

        fetchApi(
            'get','/student/registers?id=1', //TODO Find userID
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

        if (response.success) {
            //key -> registers.id

            let categoriesRegister = response.registers.map(register => (register.category));

            let categories = categoriesRegister.map( category => {
                return {
                    key: "Categoria " + category.id + category.name,
                    value: "Categoria " + category.name,
                    text: "Categoria " + category.name,
                }
            });

            //VALORES PARA A CATEGORIA INICIAL
            let dateSubscription = response.registers[0].initialDate;
            let dateLimit = '20/10/2019';
            let theoreticalLessons = categoriesRegister[0].theoreticalLessons;
            let practicalLessons = categoriesRegister[0].practicalLessons;
            let nameInstructor = response.registers[0].instructor.firstName + " " + response.registers[0].instructor.lastName;

            //collection ou iterator??
            let payments = response.registers[0].payments.collection.map( payment => {

                return {
                    id: payment.id,
                    value: payment.value,
                    timestamp: payment.timestamp,
                }
            });

            this.setState({
                allRegisters: response.registers,
                allCategories: categories,
                categoryChoosed: categories[0],
                dateSubscription: dateSubscription,
                dateLimit: dateLimit,
                theoreticalLessons: theoreticalLessons,
                practicalLessons: practicalLessons,
                nameInstructor: nameInstructor,
                payments: payments,
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
                                //defaultValue={this.state.categoryChoosed.value} NAO ESTÁ A DAR??
                                //onChange={this.handleChange}
                            />
                            </Header>

                            <Header as='h3' textAlign={'left'}>
                                Inscrição a: {this.state.dateSubscription}
                            </Header>
                            <Header as='h3' textAlign={'left'}>Validade até: {this.state.dateLimit}</Header>
                            <Header as='h3' textAlign={'left'}>Aulas teóricas realizadas: x / {this.state.theoreticalLessons}</Header>
                            <Header as='h3' textAlign={'left'}>Aulas práticas realizadas: y / {this.state.practicalLessons}</Header>
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
                                        <Header as='h3' textAlign={'right'}>Valor: 100€ / 500 €</Header>
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