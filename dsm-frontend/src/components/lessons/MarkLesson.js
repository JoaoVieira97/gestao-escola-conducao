import React, {Component} from 'react';


import {
    Header,
    Container,
    Dimmer,
    Loader,
    Step,
    Icon,
    Breadcrumb,
    Grid,
    Form,
    Table
} from 'semantic-ui-react';

import Routes from "../../services/Routes";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const weekDays = ['Segunda', 'Terça' , 'Quarta', 'Quinta', 'Sexta', 'Sábado' , 'Domingo'];


class MarkLesson extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            categoryChoosed: {},
            stepId: 1,
            startDate: ''

        }
    };

    async componentDidMount() {
        await this.setState({
            categoryChoosed: this.props.history.location.state.categoryChoosed,
            startDate: new Date(),
        });

        //console.log(this.state.startDate);
    }


    /**
        Define how many slots the instructor have.
     */
    slots(startTime, endTime){

        let length = endTime - startTime;
        let res = [];

        for(let i=startTime ; i < (length + startTime) ; i++)
            res.push(i + 'h - ' + (i + 1) + 'h');

        return res;
    }

    handleClickStep = (idStep) => {
    };


    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        let slots = this.slots(8,18);

        const tableInstructorSchedule = (
            <div>
                <Table textAlign={'center'} sortable celled striped stackable>
                    <Table.Header>
                        <Table.Row textAlign={'center'}>
                            <Table.HeaderCell />
                            {
                                weekDays.map( (day, i) => (
                                    <Table.HeaderCell key={i}>
                                        {day}
                                    </Table.HeaderCell>
                                ))
                            }
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            slots.map( (hours,index) => (
                                <Table.Row key={index} >
                                    <Table.Cell key={index}> {hours} </Table.Cell>
                                    {
                                        weekDays.map( (day, i) => (
                                            <Table.Cell key={i} selectable style={{color:'#0cff43'}}>
                                                <a href='new'/>
                                            </Table.Cell>
                                        ))
                                    }
                                </Table.Row>

                            ))
                        }
                    </Table.Body>
                </Table>
            </div>
        );

        return (
            <Container textAlign='center' style={{marginBottom:100}}>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Grid centered style={{marginBottom: "20px"}}>
                    <Grid.Column width={16}>

                        <Breadcrumb size='large'>
                            <Breadcrumb.Section
                                style={{color: 'grey'}}
                                onClick={() => this.props.history.push(Routes.LESSONS)}
                            >
                                Aulas
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>Marcar Aula - {this.state.categoryChoosed.name} </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right arrow' />
                            <Breadcrumb.Section active>Escolher semana</Breadcrumb.Section>
                        </Breadcrumb>
                    </Grid.Column>
                </Grid>
                <Container>
                    <Header as='h1'> Marcar aula </Header>
                    <Form size='large' floated='left'>
                        <Form.Field
                            //className={(this.state.error && this.state.data === '') ? "error field" : "field"}
                            //control={Input}
                            //label='Data da aula'
                            //placeholder='Data da aula'
                            //name={"data"}
                            //type="datetime-local"
                            //onChange={this.handleInputChange}
                            //control={DatePicker}
                            //selected={this.state.startDate}
                            //onChange={this.handleChange.bind(this)}
                            //dateFormat="Pp"
                        >
                            <label>Data da aula</label>
                            <DatePicker
                                selected={ this.state.startDate }
                                onChange={ this.handleChange.bind(this)}
                                name="startDate"
                                dateFormat="dd/MM/yyyy"
                            />
                        </Form.Field>
                    </Form>
                    {tableInstructorSchedule}
                </Container>
                <Container style={{marginTop:'25%'}}>
                    <Step.Group size='mini' stackable={'tablet'}>
                        <Step active onClick={() => this.handleClickStep(1)}>
                            <Icon name='calendar outline' />
                            <Step.Content>
                                <Step.Title>Escolher semana</Step.Title>
                                <Step.Description>Escolha a semana pretendida para marcar aula prática.</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step disabled onClick={() => this.handleClickStep(2)}>
                            <Icon name='calendar alternate' />
                            <Step.Content>
                                <Step.Title>Escolher dia</Step.Title>
                                <Step.Description>Escolha o dia pretendido para marcar aula prática.</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step disabled onClick={() => this.handleClickStep(3)}>
                            <Icon name='calendar check' />
                            <Step.Content>
                                <Step.Title>Horários disponíveis</Step.Title>
                                <Step.Description>Selecionar horário disponível para marcar aula prática.</Step.Description>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Container>
            </Container>
        );
    }
}

export default MarkLesson;