import React, {Component} from 'react';
import { Container, Header, Table, Menu, Icon, Grid, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
import { fetchApi } from '../../services/api/index';


class PaymentsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            payments: [],
            categories: [],
        }
    };

    componentDidMount() {

        fetchApi(
            'get','/students',
            {},  {},
            this.successHandler, this.errorHandler
        );

        setTimeout( () => {
            this.setState({isLoading: false});
        }, 2000);
    }

    /**
     * Handle the response.
     * @param response
     */
    successHandler = (response) => {

        console.log(response.success);
        console.log(response.students);
    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

        console.log(error);
    };

    componentWillMount() {

        let payments = [
            {
                id: 1,
                date: '20/10/2018',
                paid: true,
                description: 'Inscrição',
                value: 100,
            },
            {
                id: 2,
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
                <Table.Row key={payment.id}>
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
            <Container style={{marginBottom: 100, marginTop: 50}}>

                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>Loading</Loader>
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
                                placeholder='Seleciona uma categoria'
                                selection
                                clearable
                                options={this.state.categories}
                            />
                            </Header>

                            <Header as='h3' textAlign={'left'}>
                                Inscrição a: 20/10/2018
                            </Header>
                            <Header as='h3' textAlign={'left'}>Validade até:</Header>
                            <Header as='h3' textAlign={'left'}>Aulas teóricas realizadas:</Header>
                            <Header as='h3' textAlign={'left'}>Aulas práticas realizadas:</Header>
                            <Header as='h3' textAlign={'left'}>Instrutor atual:</Header>
                            <Header as='h3' textAlign={'left'}>Registo de exames:</Header>
                        </Container>
                    </Grid.Column>
                    <Grid.Column width={8} style={{marginTop:50}}>
                        <Table fluid="true" striped stackable padded='very' verticalAlign='bottom'>
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