import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MarkLessonHeader} from "./MarkLessonHeader";
import {Container, Dimmer, Loader} from "semantic-ui-react";
import {fetchApi} from "../../services/api";
import Authentication from "../../services/Authentication";

//const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

class SelectDay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoadingWorkingDays: true,
            isLoadingInstructorLessons: true,
            isLoadingText: 'A carregar...'
        }
    }

    componentDidMount() {

        this.fetchInstructorWorkingDays();
        //this.fetchInstructorLessons();
    }

    /**
     * Fetching all working days of current instructor.
     */
    fetchInstructorWorkingDays = () => {

        fetchApi(
            'get',
            `/instructor/working_days?instructorID=${this.props.instructor.id}`,
            {}, {},
            this.successHandlerWorkingDays, this.errorHandlerWorkingDays
        );
    };
    successHandlerWorkingDays = (response) => {

        console.log(response.data);
        this.setState({
            isLoadingWorkingDays: false
        });
    };
    errorHandlerWorkingDays = (error) => {

        if(error.response && error.response.status && error.response.status === 401) {
            Authentication.clearData();
            window.location.reload();
            alert("As suas credenciais já não são válidas.");
        }
    };

    /**
     * Fetching all instructor lessons between given dates in milliseconds.
     */
    fetchInstructorLessons = () => {

        fetchApi(
            'get',
            '/lessons/reserved_lessons?' +
                `instructorID=${this.props.instructor.id}` +
                `&startDate=${this.props.startDate.getTime()}` +
                `&endDate=${this.props.endDate.getTime()}`,
            {}, {},
            this.successHandlerInstructorLessons, this.errorHandlerInstructorLessons
        );
    };
    successHandlerInstructorLessons = (response) => {

        console.log(response.data);
    };
    errorHandlerInstructorLessons = (error) => {

        if(error.response && error.response.status && error.response.status === 401) {
            Authentication.clearData();
            window.location.reload();
            alert("As suas credenciais já não são válidas.");
        }
    };



    /*
    async componentDidMount() {


        await this.setState({
            categoryChoosed: this.props.history.location.state.categoryChoosed,
            instructor: this.props.history.location.state.instructor,
        });

        //isLoading: false nesta função
        await this.defineWeekDays();

        //falta obter school information
        await this.slots(8, 18);

        fetchApi(
            'get', '/lessons/' +
            'reserved_lessons?instructorID=' + this.state.instructor.id + '&categoryID=' + this.state.categoryChoosed.id,
            {}, {},
            this.successFetchReservedLessons, this.errorFetchReservedLessons
        );
    }

    successFetchReservedLessons = async (response) => {
        console.log("SUCESSO");

        const reservedLessons = response.data.practicalLessons;

        //Não está bem!! porque também pode ser do próximo ano
        let year = this.state.startDate.getFullYear();

        let schedule = [];

        this.state.slots.forEach(slot => {
            let aux = [];
            let initHour = slot.split("h")[0];

            this.state.weekDays.forEach(weekDay => {

                let weekDaySplit = weekDay.split(" ");

                let weekDate = moment(weekDaySplit[1] + "/" + year + " " + initHour + ":00", "DD/MM/YYYY HH:mm")
                    .format("DD/MM/YYYY HH:mm");

                let reserved = reservedLessons.find(function (lesson) {

                    return lesson.startTime === weekDate;
                });

                let canReserve = true;
                if (reserved) canReserve = false;

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
            'get', '/instructor/working_days?instructorID=' + this.state.instructor.id,
            {}, {},
            this.successFetchWorkingDays, this.errorFetchWorkingDays
        );
    };

    successFetchWorkingDays = async (response) => {
        const workingDays = response.data.workingDays;
        console.log(workingDays);

        const schedule = this.state.schedule;

        let scheduleAux = [];

        schedule.forEach(row => {
            let aux = [];

            row.forEach(day => {

                let working = workingDays.find(function (workingDay) {

                    return workingDay.id === (day.dayId + 1);
                });

                let canReserve = working ? true : false;

                aux.push({
                    date: day.date,
                    canReserve: canReserve,
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

    defineWeekDays = () => {

        //Segunda-> 0, Terça->1 , Quarta->2 , ....
        let choosedWeekDay = this.state.startDate.getDay();
        let dateAux = new Date(this.state.startDate);

        let i = 0, weekDaysAux = [];

        while (i < weekDays.length) {

            let dayAux = i === 0 ? dateAux.getDate() : dateAux.getDate() + 1;
            dateAux.setDate(dayAux);

            let day = dateAux.getDate();
            let month = dateAux.getMonth() + 1;

            weekDaysAux.push(weekDays[choosedWeekDay] + " " + day + "/" + month);

            choosedWeekDay = (choosedWeekDay + 1) % weekDays.length;
            i++;
        }

        this.setState({
            weekDays: weekDaysAux,
        });
    };

    slots = (startTime, endTime) => {

        let length = endTime - startTime;
        let res = [];

        for (let i = startTime; i < (length + startTime); i++)
            res.push(i + 'h - ' + (i + 1) + 'h');


        this.setState({
            slots: res,
        });
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

        await this.slots(8, 18);

        fetchApi(
            'get', '/lessons/' +
            'reserved_lessons?instructorID=' + this.state.instructor.id + '&categoryID=' + this.state.categoryChoosed.id,
            {}, {},
            this.successFetchReservedLessons, this.errorFetchReservedLessons
        );
    }
    */

    render() {

        /*
        const tableInstructorSchedule = (
            <div>
                <Table textAlign={'center'} sortable celled striped stackable color={'blue'}>
                    <Table.Header>
                        <Table.Row textAlign={'center'}>
                            <Table.HeaderCell/>
                            {
                                this.state.weekDays.map((day, i) => (
                                    <Table.HeaderCell key={i}>
                                        {day}
                                    </Table.HeaderCell>
                                ))
                            }
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.slots.map((hours, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell key={index}> {hours} </Table.Cell>
                                    {
                                        this.state.schedule[index] &&
                                        this.state.schedule[index].map((day, i) => (
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
        */

        return (
            <Container>
                <Dimmer active={this.state.isLoadingWorkingDays || this.state.isLoadingInstructorLessons}>
                    <Loader>{this.state.isLoadingText}</Loader>
                </Dimmer>
                <MarkLessonHeader
                    isDisabled={this.props.isDisabled}
                    onConfirm={this.props.onConfirmDay}
                    onCancel={this.props.onCancelDay}
                />
                {
                    /*
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
                                selected={this.state.startDate}
                                onChange={this.handleChange.bind(this)}
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

                        <Label style={{marginLeft: '15px'}}
                               size={'large'}>
                            É possível escolher
                        </Label>
                    </Container>
                </Container>
                     */
                }
            </Container>
        );
    }
}


SelectDay.propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    instructor: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onConfirmDay: PropTypes.func.isRequired,
    onCancelDay: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDay);