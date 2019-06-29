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
    Table, Label
} from 'semantic-ui-react';

import Routes from "../../services/Routes";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'


import "../../styles/styles.css"
import {fetchApi} from "../../services/api";

const weekDays = [ 'Domingo', 'Segunda', 'Terça' , 'Quarta', 'Quinta', 'Sexta', 'Sábado'];



class MarkLesson extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            categoryChoosed: {},
            stepId: 1,
            startDate: new Date(),
            weekDays: [],
            instructor: {},
            slots : [],
            schedule: [],

        }
    };

     async componentDidMount() {

        await this.setState({
            categoryChoosed: this.props.history.location.state.categoryChoosed,
            instructor : this.props.history.location.state.instructor,
        });

        //isLoading: false nesta função
        await this.defineWeekDays();

        //falta obter school information
        await this.slots(8,18);

        fetchApi(
            'get','/lessons/' +
            'reserved_lessons?instructorID='+this.state.instructor.id+'&categoryID='+this.state.categoryChoosed.id,
            {},  {},
            this.successFetchReservedLessons, this.errorFetchReservedLessons
        );
    }


    successFetchReservedLessons = async(response) => {
        console.log("SUCESSO");

        const reservedLessons = response.data.practicalLessons;

        //Não está bem!! porque também pode ser do próximo ano
        let year = this.state.startDate.getFullYear();

        let schedule = [];

        this.state.slots.forEach( slot =>{
            let aux = [];
            let initHour = slot.split("h")[0];

            this.state.weekDays.forEach( weekDay => {

                let weekDaySplit = weekDay.split(" ");

                let weekDate = moment(weekDaySplit[1] + "/" + year + " " + initHour + ":00", "DD/MM/YYYY HH:mm")
                            .format("DD/MM/YYYY HH:mm");

                let reserved = reservedLessons.find(function (lesson) {

                    return lesson.startTime === weekDate;
                });

                let canReserve = true;
                if(reserved) canReserve = false;

                let dayId = weekDays.indexOf(weekDaySplit[0]);

                aux.push({
                    date: weekDate,
                    canReserve: canReserve,
                    dayId: dayId,
                });

            });

            schedule.push(aux);
        });

        await this.setState({
            schedule: schedule,
        });


        fetchApi(
            'get','/instructor/working_days?instructorID='+this.state.instructor.id,
            {},  {},
            this.successFetchWorkingDays, this.errorFetchWorkingDays
        );
    };

    successFetchWorkingDays = async (response) => {
        const workingDays = response.data.workingDays;
        console.log(workingDays);

        const schedule = this.state.schedule;

        let scheduleAux = [];

        schedule.forEach( row => {
            let aux = [];

            row.forEach( day => {

                let working = workingDays.find(function (workingDay) {

                    return workingDay.id === (day.dayId + 1);
                });

                let canReserve = working ? true : false;

                aux.push({
                    date: day.date,
                    canReserve : canReserve,
                    dayId: day.dayId,
                });
            });

            scheduleAux.push(aux);
        });

        await this.setState({
            schedule: scheduleAux,
            isLoading: false,
        });
    };

    errorFetchWorkingDays = (error) => {
        console.log("ERRO2");
        console.log(error);
    };

    errorFetchReservedLessons = (error) => {
        console.log("ERRO");
        console.log(error);
    };

    /**
     * Define the week days to show in table to student mark lesson.
     */
    defineWeekDays = () => {

        //Segunda-> 0, Terça->1 , Quarta->2 , ....
        let choosedWeekDay = this.state.startDate.getDay();
        let dateAux = new Date(this.state.startDate);

        let i=0, weekDaysAux = [];

        while (i < weekDays.length) {

            let dayAux = i===0 ?  dateAux.getDate() : dateAux.getDate() + 1;
            dateAux.setDate(dayAux);

            let day = dateAux.getDate();
            let month = dateAux.getMonth()+1;

            weekDaysAux.push(weekDays[choosedWeekDay] + " " + day + "/" + month);

            choosedWeekDay = (choosedWeekDay + 1) % weekDays.length;
            i++;
        }

        this.setState({
            weekDays: weekDaysAux,
        });
    };

    /**
        Define how many slots the instructor have.
     */
    slots = (startTime, endTime) => {

        let length = endTime - startTime;
        let res = [];

        for(let i=startTime ; i < (length + startTime) ; i++)
            res.push(i + 'h - ' + (i + 1) + 'h');


        this.setState({
            slots : res,
        });
    };

    handleClickStep = (idStep) => {
    };

    handleClickCell = (day) => {
        this.props.history.push({
            pathname: Routes.CONFIRM_NEW_LESSON,
            state: {
                categoryChoosed: this.state.categoryChoosed,
                instructor: this.state.instructor,
                date: day.date,
            }
        });
    };


    async handleChange(date) {

        await this.setState({
            isLoading: true,
            startDate: date,
        });

        await this.defineWeekDays();

        await this.slots(8,18);

        fetchApi(
            'get','/lessons/' +
            'reserved_lessons?instructorID='+this.state.instructor.id+'&categoryID='+this.state.categoryChoosed.id,
            {},  {},
            this.successFetchReservedLessons, this.errorFetchReservedLessons
        );
    }

    render() {
        //let slots = this.slots(8,18);

        const tableInstructorSchedule = (
            <div>
                <Table textAlign={'center'} sortable celled striped stackable>
                    <Table.Header>
                        <Table.Row textAlign={'center'}>
                            <Table.HeaderCell />
                            {
                                this.state.weekDays.map( (day, i) => (
                                    <Table.HeaderCell key={i}>
                                        {day}
                                    </Table.HeaderCell>
                                ))
                            }
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.slots.map( (hours,index) => (
                                <Table.Row key={index} >
                                    <Table.Cell key={index}> {hours} </Table.Cell>
                                    {
                                        this.state.schedule[index] &&
                                        this.state.schedule[index].map( (day, i) => (
                                            day.canReserve ?
                                            <Table.Cell key={i}
                                                        className={"tableHourAvailable"}
                                                        selectable
                                                        onClick={() => this.handleClickCell(day)}
                                            /> :
                                            <Table.Cell key={i}
                                                        className={"tableHourUnavailable"}
                                            />

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
                            <Breadcrumb.Section active>Marcar Aula </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right arrow' />
                            <Breadcrumb.Section active>Escolher semana</Breadcrumb.Section>
                        </Breadcrumb>
                    </Grid.Column>
                </Grid>
                <Container>
                    <Header as='h1'> Marcar aula </Header>
                    <Container textAlign={'left'}>
                        <Form size='large'>
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
                        <Container textAlign={'center'} style={{marginTop: '5px',}}>
                             <Label color={'grey'}
                                    size={'large'}>
                                 Não é possível escolher
                             </Label>

                            <Label style={{ marginLeft: '15px'}}
                                   size={'large'}>
                                É possível escolher
                            </Label>
                        </Container>
                    </Container>
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