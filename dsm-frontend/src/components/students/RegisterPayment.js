import React, {Component} from 'react';
import {
    Container,
    Header,
    Dimmer,
    Loader,
    Grid,
    Breadcrumb,
    Segment,
    Form,
    Button,
    Message,
    Input,
    Table,
    Dropdown,
} from 'semantic-ui-react';
import { fetchApi } from '../../services/api/index';
import Routes from "../../services/Routes";


class RegisterPayment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: {},
            registers: [],
            categories_options: [],
            payments: [],
            register: undefined,
            actualPaid: '',

            category: '',
            description: '',
            value: '',

            isLoading: true,
            message: '',
            error: ''
        }
    }

    async componentDidMount(){

        await this.setState({
            student: this.props.location.state.student
        })
        
        fetchApi(
            'get','/student/registers?studentID=' + this.props.location.state.student.id,
            {},  {},
            this.successFetchRegisters, this.errorHandler
        );
    }

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchRegisters = async (response) => {
        
        const data = response.data;
        
        let registers = []
        let categories_options = []

        data.registers.forEach(function(register) {
            registers.push({
                id: register.id,
                category: register.category.name,
                category_price: register.category.price,
                payments: register.payments.collection
            })

            categories_options.push({
                key: register.category.id,
                text: 'Categoria ' + register.category.name,
                value: register.id
            })
        })

        this.setState({
            registers: registers,
            categories_options: categories_options,
            isLoading: false,
        })

        if (categories_options.length > 0){
            let register = registers.filter(reg => {
                return reg.id === categories_options[0].value
            })
            let actualPaid = register[0].payments.reduce((acc, payment) => acc + payment.value, 0);

            await this.setState({
                register: register[0],
                category: categories_options[0].value,
                actualPaid: actualPaid
            })
        }

    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

        console.log(error);

    };

    handleInputChange = (event) => {

        const input = event.target;
        const value = input.value;

        this.setState({
            [input.name]: value
        });

    };

    handleSelectCategoryChange = async (event, data) => {
        let register_id = data.value

        let register = this.state.registers.filter(reg => {
            return reg.id === register_id
        })

        let actualPaid = register[0].payments.reduce((acc, payment) => acc + payment.value, 0);

        await this.setState({
            register: register[0],
            category: data.value,
            actualPaid: actualPaid
        })
    }

    handleSubmit = () => {

        const { category, description, value } = this.state;
        if(category !== '' && description !== '' && value !== '' ) {
            
            fetchApi(
                'post','/secretary/register_student_payment',
                {
                    registerID: category,
                    value: value,
                    description: description
                },  {},
                this.successHandlerP, this.errorHandlerP
            );

        } else {
            this.setState({
                message: '',
                error: 'Preencha todos os campos!'
            })
        }

    };

    /**
     * Handle the response.
     * @param response
     */
    successHandlerP = (response) => {

        this.setState({
            message: 'Pagamento registado com sucesso',
            error: ''
        });


        sleep(3000).then(() => {
            this.props.history.push(Routes.STUDENT_PROFILE, {student: this.state.student});
        });
        
    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandlerP = (error) => {

        console.log(error)

        this.setState({
            message: '',
            error: 'Ocorreu um erro. Tente novamente.'
        })
        
    };

    render() {

        const paymentsR = (this.state.register !== undefined) ?
            (this.state.register.payments.map(payment => (
                    <Table.Row key={payment.id}>
                        <Table.Cell>{payment.timestamp}</Table.Cell>
                        <Table.Cell>{payment.description} </Table.Cell>
                        <Table.Cell>{payment.value}€</Table.Cell>
                    </Table.Row>
                )
            )) : (
                <Table.Row>
                </Table.Row>
            )
        

        const tablePayments = (
            <Table sortable celled inverted fluid="true" striped stackable verticalAlign='bottom'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Data do Pagamento</Table.HeaderCell>
                        <Table.HeaderCell> Descrição </Table.HeaderCell>
                        <Table.HeaderCell>Valor</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {paymentsR}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            { (this.state.register !== undefined) ?
                                (<Header as='h3' textAlign={'right'} inverted color='grey'>
                                    Montante Pago: {this.state.actualPaid}€ / {this.state.register.category_price}€
                                </Header>) :
                                (<Header as='h3' textAlign={'right'} inverted color='grey'>
                                    Montante Pago: 0€ / 0€
                                </Header>)
                            }
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );

        return (
            <Container>

                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Grid className="ui stackable two column centered grid" style={{marginBottom: "65px"}}>
                    <Grid.Column width={16}>

                        <Breadcrumb size='large'>
                            <Breadcrumb.Section
                                style={{color: 'grey'}}
                                onClick={() => this.props.history.push(Routes.HOME)}
                            >
                                Alunos
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section
                                style={{color: 'grey'}}
                                onClick={() => this.props.history.push(Routes.STUDENT_PROFILE, {student: this.state.student})}
                            >
                                {this.state.student.name}
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>Pagamentos</Breadcrumb.Section>
                        </Breadcrumb>


                    </Grid.Column>
                    <Grid.Column width={8} style={{marginTop: "30px"}}>
                        <Segment>
                            <Header 
                                className='centered' 
                                as='h1'
                            >
                                Registar pagamento
                            </Header>
                            <Form>
                                <Form.Field
                                    className={(this.state.error && this.state.description === '') ? "error field" : "field"}
                                    control={Input}
                                    label='Descrição do pagamento'
                                    placeholder='Descrição'
                                    name={"description"}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Field
                                    className={(this.state.error && this.state.value === '') ? "error field" : "field"}
                                    control={Input}
                                    type="number"
                                    label='Valor pago'
                                    placeholder='Valor'
                                    name={"value"}
                                    onChange={this.handleInputChange}
                                />
                                <Button 
                                    disabled={this.state.description === '' || this.state.value === '' || this.state.category === ''}
                                    type="submit"
                                    className="ui button"
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                    Registar
                                </Button>
                                <Message positive hidden={!this.state.message}>
                                    <Message.Header>Sucesso</Message.Header>
                                    <p>{this.state.message}</p>
                                </Message>
                                <Message negative hidden={!this.state.error}>
                                    <Message.Header>Erro</Message.Header>
                                    <p>{this.state.error}</p>
                                </Message>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={8} style={{marginTop: "30px"}}>
                    <Segment>
                        <Header>Categoria:</Header>
                        <Dropdown
                            placeholder='Selecione a categoria'
                            fluid
                            selection
                            options={this.state.categories_options}
                            value={this.state.category}
                            name={"category"}
                            onChange={this.handleSelectCategoryChange}
                        />
                    </Segment>
                        <Message
                            hidden={this.state.register !== undefined}
                            size={'large'}
                            error
                            header={'Categoria não selecionada'}
                            content={'Tem de selecionar uma categoria.'}
                        />
                        {
                            tablePayments
                        }
                    </Grid.Column>
                </Grid>

            </Container>
        );
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default RegisterPayment;