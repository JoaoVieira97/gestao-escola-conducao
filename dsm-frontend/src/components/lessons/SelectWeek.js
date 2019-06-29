import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Grid, Card, Icon} from "semantic-ui-react";
import {MarkLessonHeader} from "./MarkLessonHeader";
import DatePicker from "react-datepicker";


class SelectWeek extends Component {

    render() {
        return (
            <Container>
                <MarkLessonHeader
                    step={this.props.step}
                    isDisabled={this.props.isDisabled}
                    onConfirm={this.props.onConfirmWeek}
                    onCancel={this.props.onCancelWeek}
                />
                <div className="ui stackable three column centered grid">
                    <Grid.Column textAlign={'center'}>
                        <Card fluid color='blue'>
                            <Card.Content header={this.props.category.name} />
                            <Card.Content
                                description={
                                    'Selecione um dia e automaticamente uma semana será preenchida.'
                                }
                            />
                            <Card.Content extra>
                                <Icon name='user' />
                                {this.props.instructor.name}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column textAlign={'center'}>
                        <DatePicker
                            inline
                            selected={this.props.startDate}
                            selectsStart
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                            showMonthDropdown
                            showDisabledMonthNavigation
                            //locale={pt}
                            dateFormat={"dd/MM/yyyy"}
                            minDate={new Date()}
                            onChange={this.props.onChange}
                        />
                    </Grid.Column>
                </div>
            </Container>
        );
    }
}


SelectWeek.propTypes = {
    step: PropTypes.string.isRequired,
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    instructor: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onConfirmWeek: PropTypes.func.isRequired,
    onCancelWeek: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectWeek);