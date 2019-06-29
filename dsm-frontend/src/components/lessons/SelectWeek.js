import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Grid, Card, Header} from "semantic-ui-react";
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
                <Grid stackable centered textAlign='center' columns={3} padded>
                    <Grid.Column textAlign='left' >
                        <Card fluid raised>
                            <Card.Content header={'Informações'} />
                            <Card.Content
                                description={
                                    'Selecione um dia e automaticamente uma semana será preenchida.'

                                }
                            />
                            <Card.Content
                                description={
                                    'Lembramos que ao confirmar a marcação da aula, tem apenas ' +
                                    '24h antes da sua realização para a cancelar.'
                                }
                            />
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid.Row style={{paddingBottom: 20}}>
                            <Grid.Column>
                                <Card fluid raised>
                                    <Card.Content header={'Categoria'} />
                                    <Card.Content>
                                        <Header as='h1' color={'blue'}>
                                            {
                                                this.props.category.name.split(' ')[1]
                                            }
                                        </Header>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Card fluid raised>
                                    <Card.Content header={'Instrutor'} />
                                    <Card.Content>
                                        <Header as='h1' color={'blue'}>
                                            {
                                                this.props.instructor.name
                                            }
                                        </Header>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column textAlign={'left'}>
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
                </Grid>
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