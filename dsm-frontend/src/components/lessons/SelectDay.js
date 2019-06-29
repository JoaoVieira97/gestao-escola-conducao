import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MarkLessonHeader} from "./MarkLessonHeader";
import {Container, Dimmer, Loader, Table} from "semantic-ui-react";
import {fetchApi} from "../../services/api";
import Authentication from "../../services/Authentication";
import moment from "moment";


const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];


class SelectDay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isLoadingWorkingDays: true,
            isLoadingInstructorLessons: true,
            isLoadingText: 'A carregar...',

            workingDays: [],
            practicalLessons: [],

            matrix: [],

            minHour: 9,
            maxHour: 18,
        }
    }

    async componentDidMount() {

        await this.defineMatrix();
        this.fetchInstructorWorkingDays();
    }

    /**
     * Define the week days to show in table to student mark lesson.
     */
    defineMatrix = async () => {

        const weekDayNumber = this.props.startDate.getDay();
        let auxMatrix = [];
        let current = 0;
        let i = weekDayNumber;

        do {
            auxMatrix.push({
                name: weekDays[i],
                disabled: false,
                hours: this.createHours(current)
            });

            current++;
            i++;
            i = i % weekDays.length;
        } while (i !== weekDayNumber);

        await this.setState({
            isLoading: false,
            matrix: auxMatrix,
        });
    };

    /**
     * Define hours of day, starting from 9 to 18.
     */
    createHours = (current) => {

        const currentDate = moment(this.props.startDate)
            .add(current, 'day')
            .toISOString().split('T');

        const auxDate = currentDate[0].split('-');
        const date = auxDate[2] + '/' + auxDate[1] + '/' + auxDate[0];

        let hours = {};
        for (let i = this.state.minHour; i <= this.state.maxHour; i++) {

            let hour;
            if(i < 10) {
                hour = '0' + i + ':00';
            }
            else {
                hour = i + ':00';
            }

            hours[date + ' ' + hour] = {
                disabled: false
            };
        }
        return hours;
    };

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

        if(response.status === 200 && response.data) {

            const matrix = this.state.matrix;
            const workingDaysRaw = response.data.workingDays;


            for (let i = 0; i < matrix.length; i++) {

                const aux = workingDaysRaw.find(item => item.name === matrix[i].name);
                if(aux) {
                    matrix[i].disabled = true;
                }
            }

            this.setState({
                matrix: matrix
            });

            this.fetchInstructorLessons();
        }

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

        if(response.status === 200 && response.data) {

            let matrix = this.state.matrix;
            const practicalLessons = response.data.practicalLessons;

            for (let i = 0; i < matrix.length; i++) {

                const dayHours = Object.keys(matrix[i].hours);
                const aux = practicalLessons.find(item => dayHours.includes(item.startTime));

                if(aux) {

                    const lessonStartTime = aux.startTime;
                    matrix[i].hours[lessonStartTime] = {
                        disabled: true,
                        ...aux
                    }
                }
            }

            this.setState({matrix: matrix});
            this.checkIfUserAsSelected();
        }

        this.setState({
            isLoadingInstructorLessons: false
        });
    };
    errorHandlerInstructorLessons = (error) => {

        if(error.response && error.response.status && error.response.status === 401) {
            Authentication.clearData();
            window.location.reload();
            alert("As suas credenciais já não são válidas.");
        }
    };

    checkIfUserAsSelected = () => {

        if(this.props.selectedDay !== undefined) {
            this.onSelectDay(this.props.selectedDay);
        }
    };

    onSelectDay = (day) => {



        if(this.props.selectedDay !== undefined) {
            this.props.onRemoveDay();
            this.props.onSelectDay(day);
        }
    };

    render() {

        let hours = [];
        for (let i = this.state.minHour; i <= this.state.maxHour; i++) {
            if(i<10)
                hours.push('0'+i+':00h');
            else
                hours.push(i+ ':00h');
        }

        return (
            <Container>
                <Dimmer
                    inverted
                    active={this.state.isLoadingWorkingDays ||
                        this.state.isLoadingInstructorLessons ||
                        this.state.isLoading
                    }
                >
                    <Loader>{this.state.isLoadingText}</Loader>
                </Dimmer>
                <MarkLessonHeader
                    step={this.props.step}
                    isDisabled={this.props.isDisabled}
                    onConfirm={this.props.onConfirmDay}
                    onCancel={this.props.onCancelDay}
                />
                <Table textAlign={'center'} celled striped stackable color={'blue'}>
                    <Table.Header>
                        <Table.Row textAlign={'center'}>
                            <Table.HeaderCell />
                            {
                                this.state.matrix.map(item => {

                                    let hourKey = Object.keys(item.hours)[0];

                                    return (
                                        <Table.HeaderCell
                                            key={item.name}
                                            disabled={item.disabled}
                                            selectable={false}
                                        >
                                            <React.Fragment>
                                                {item.name}
                                            </React.Fragment>
                                            <p>
                                                <i style={{color: '#838383', fontWeight: '500'}}>
                                                    {hourKey.slice(0,10)}
                                                </i>
                                            </p>
                                        </Table.HeaderCell>
                                    )
                                })
                            }
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            hours.map((item, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{item}</Table.Cell>
                                    {
                                        this.state.matrix.map(day => {

                                            let hourKey = Object.keys(day.hours)[index];
                                            let hourObject = day.hours[hourKey];

                                            if(day.disabled) {
                                                return (
                                                    <Table.Cell key={hourKey} active>
                                                        {'Indisponível'}
                                                    </Table.Cell>
                                                )
                                            }
                                            else if(hourObject.disabled) {
                                                return (
                                                    <Table.Cell key={hourKey} error>
                                                        {'Marcada'}
                                                    </Table.Cell>
                                                )
                                            }


                                            return (
                                                <Table.Cell
                                                    key={hourKey}
                                                    selectable
                                                    className={"tableHourAvailable"}
                                                    onClick={() => this.onSelectDay(hourKey)}
                                                />
                                            )
                                        })
                                    }
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}


SelectDay.propTypes = {
    step: PropTypes.string.isRequired,
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    selectedDay: PropTypes.string.isRequired,
    onSelectDay: PropTypes.func.isRequired,
    onRemoveDay: PropTypes.func.isRequired,
    instructor: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onConfirmDay: PropTypes.func.isRequired,
    onCancelDay: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDay);