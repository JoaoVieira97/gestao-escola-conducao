import React, {Component} from 'react';
import { Container, Header, Table, Menu, Icon, Grid, Dropdown } from 'semantic-ui-react';

class PaymentsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            payments: [],
            categories: [],
        }
    };

    componentWillMount() {

        let payments = [
            {
                date: '20/10/2018',
                paid: true,
                description: 'Inscrição',
                value: 100,
            },
            {
                date: '20/12/2018',
                paid: false,
                description: '1ª Prestação',
                value: 80,
            },
        ];

        let categories = [
            {
                key: 'Categoria A',
                text: 'Categoria A',
                value: 'Categoria A',
            }
        ];

        this.setState({
            payments: payments,
            categories: categories
        })
    }


    render() {

        const payments = (
            this.state.payments.map(payment => (
                <Table.Row key={payment}>
                    <Table.Cell>{payment.date}</Table.Cell>
                    <Table.Cell>
                        {payment.paid === true ? <Icon name='check' color='green'/> : <Icon name='times' color='red'/> }
                    </Table.Cell>
                    <Table.Cell>{payment.description}</Table.Cell>
                    <Table.Cell>{payment.value}€</Table.Cell>
                </Table.Row>
            )
        ));

        return (
            <Container>
                <Container text={true} textAlign={'center'}>
                    <Header>PAYMENTS</Header>
                    <Header>{this.props.location.pathname}</Header>
                </Container>
                <Container >
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column width={8} >
                                <Container textAlign={'center'}>
                                    <Icon name='user circle' size='massive'/>
                                    <Header as='h1'>Nome Utilizador</Header>
                                    <Header as='h3' textAlign={'left'}>
                                        Categoria:
                                    </Header>
                                    <Dropdown
                                        placeholder='Seleciona uma categoria'
                                        selection
                                        options={this.state.categories}
                                    />
                                    <Header as='h3' textAlign={'left'}>Inscrição a:</Header>
                                    <Header as='h3' textAlign={'left'}>Validade até:</Header>
                                    <Header as='h3' textAlign={'left'}>Aulas teóricas realizadas:</Header>
                                    <Header as='h3' textAlign={'left'}>Aulas práticas realizadas:</Header>
                                    <Header as='h3' textAlign={'left'}>Instrutor atual:</Header>
                                    <Header as='h3' textAlign={'left'}>Registo de exames:</Header>
                                </Container>
                            </Grid.Column>
                            <Grid.Column width={8} >
                                <Table fluid striped size='small'>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Data Limite</Table.HeaderCell>
                                            <Table.HeaderCell>Pago?</Table.HeaderCell>
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
                                                <Menu floated='right' pagination>
                                                    <Menu.Item as='a' icon>
                                                        <Icon name='chevron left' />
                                                    </Menu.Item>
                                                    <Menu.Item as='a'>1</Menu.Item>
                                                    <Menu.Item as='a'>2</Menu.Item>
                                                    <Menu.Item as='a'>3</Menu.Item>
                                                    <Menu.Item as='a'>4</Menu.Item>
                                                    <Menu.Item as='a' icon>
                                                        <Icon name='chevron right' />
                                                    </Menu.Item>
                                                </Menu>
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Footer>
                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Container>
        );
    }
}

export default PaymentsPage;