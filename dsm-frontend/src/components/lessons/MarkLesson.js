import React, {Component} from 'react';

import {
    Container,
    Step,
    Icon,
    Breadcrumb,
    Segment, Loader, Dimmer,
} from 'semantic-ui-react';
import moment from "moment";
import Routes from "../../services/Routes";
import "../../styles/styles.css"
import SelectDay from "./SelectDay";
import SelectWeek from "./SelectWeek";
import ConfirmNewLesson from "./ConfirmNewLesson";



class MarkLesson extends Component {

    constructor(props) {
        super(props);

        const todayRaw = new Date();
        const endDate = moment(todayRaw).add(6, 'day')
            .set({hour:23,minute:59,second:0,millisecond:0})
            .toISOString();

        this.state = {
            //all
            isLoading: true,
            isLoadingText: 'A carregar...',
            stepId: 1,
            instructor: {name: 'A carregar...'},
            category: {name: 'A carregar...'},
            isStepOneDisabled: false,

            // first step
            startDate: todayRaw,
            endDate: new Date(endDate),
            isStepTwoDisabled: true,

            // second step
            selectedDay: undefined
        }
    };

    componentDidMount() {

        if(this.props.history.location.state &&
            this.props.history.location.state.categoryChoosed &&
            this.props.history.location.state.instructor
        ) {
            this.setState({
                instructor: this.props.history.location.state.instructor,
                category: this.props.history.location.state.categoryChoosed,
                isLoading: false
            });
        }
        else {

            this.props.history.push(Routes.LESSONS);
        }
    }

    /**
     * When user press one day in the first step.
     * @param date
     */
    onChangeDate = (date) => {

        const endDate = moment(date).add(6, 'day')
            .set({hour:23,minute:59,second:0,millisecond:0})
            .toISOString();

        this.setState({
            startDate: date,
            endDate: new Date(endDate),
        });
    };

    /**
     * When user press on day in the second step.
     * @param dayString
     */
    onSelectDay = (dayString) => {

        this.setState({
            selectedDay: dayString,
            isStepTwoDisabled: false,
        })
    };

    onRemoveDay = () => {

        this.setState({
            selectedDay: undefined,
            isStepTwoDisabled: true,
        })
    };

    render() {

        const steps = [{
            id: 1,
            icon: 'calendar minus outline',
            title: 'Escolher semana',
            description: 'Escolha a semana pretendida para marcar a aula prática',
            component: (
                <SelectWeek
                    key={'1'}
                    step={'begin'}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.onChangeDate.bind(this)}
                    instructor={this.state.instructor}
                    category={this.state.category}
                    isDisabled={this.state.isStepOneDisabled}
                    onConfirmWeek={() => this.setState(state => ({stepId: state.stepId + 1}))}
                    onCancelWeek={() => this.props.history.push(Routes.LESSONS)}
                />
            )
        }, {
            id: 2,
            icon: 'calendar alternate',
            title: 'Escolher dia',
            description: 'Escolha o dia pretendido para marcar a aula prática',
            component: (
                <SelectDay
                    key={'2'}
                    step={'middle'}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    selectedDay={this.state.selectedDay}
                    onSelectDay={this.onSelectDay.bind(this)}
                    onRemoveDay={this.onRemoveDay.bind(this)}
                    instructor={this.state.instructor}
                    isDisabled={this.state.isStepTwoDisabled}
                    onConfirmDay={() => this.setState(state => ({stepId: state.stepId + 1}))}
                    onCancelDay={() => this.setState(state => ({stepId: state.stepId - 1}))}
                />
            )
        }, {
            id: 3,
            icon: 'calendar check',
            title: 'Confirmar dia',
            description: 'Confirme o dia da aula prática',
            component: <ConfirmNewLesson />
        }];

        return (
            <Container>
                <React.Fragment>
                    <Breadcrumb size='large'>
                        <Breadcrumb.Section
                            style={{color: 'grey'}}
                            onClick={() => this.props.history.push(Routes.LESSONS)}
                        >
                            Aulas
                        </Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right angle'/>
                        <Breadcrumb.Section active>Marcar Aula </Breadcrumb.Section>
                    </Breadcrumb>
                </React.Fragment>
                <Container textAlign={'center'}>
                    <div style={{marginTop: 20}}>
                        <Step.Group size={'small'} stackable={'tablet'} attached='top'>
                            {
                                steps.map(item =>
                                    <Step
                                        key={item.title}
                                        active={item.id === this.state.stepId}
                                        disabled={item.id > this.state.stepId}
                                        //onClick={() => this.setState({stepId: item.id})}
                                    >
                                        <Icon name={item.icon} />
                                        <Step.Content>
                                            <Step.Title>{item.title}</Step.Title>
                                            <Step.Description>{item.description}</Step.Description>
                                        </Step.Content>
                                    </Step>
                                )
                            }

                        </Step.Group>
                        <Segment attached>
                            <Dimmer active={this.state.isLoading}>
                                <Loader>{this.state.isLoadingText}</Loader>
                            </Dimmer>
                            {
                                steps.map(item => {
                                    if (item.id === this.state.stepId)
                                        return item.component;
                                    return null;
                                })
                            }
                        </Segment>
                    </div>
                </Container>
            </Container>
        );
    }
}

export default MarkLesson;