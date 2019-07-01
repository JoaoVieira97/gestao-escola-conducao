import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MarkLessonHeader} from "./MarkLessonHeader";
import {Card, Container, Dimmer, Grid, Loader, Message, Header} from "semantic-ui-react";



class ConfirmNewLesson extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isLoadingText: 'A carregar...',
        }
    };

    render() {

        return (
            <Container>
                <Dimmer
                    inverted
                    active={this.state.isLoading}
                >
                    <Loader>{this.state.isLoadingText}</Loader>
                </Dimmer>
                <MarkLessonHeader
                    step={this.props.step}
                    isDisabled={this.props.isDisabled}
                    onConfirm={this.props.onSubmit}
                    onCancel={this.props.onCancel}
                />
                <Message warning>
                    <Message.Header>
                        {'Antes de confirmar a marcação'}
                    </Message.Header>
                    <p>
                        {
                            'As aulas registadas serão armazenadas de forma permanente.' +
                            ' Caso pretenda cancelar a aula, tem até 24h antes da' +
                            ' realização da aula. Depois deste período deverá ' +
                            ' comparecer à aula ou esta será marcada ' +
                            ' como efetuada.'
                        }
                    </p>
                </Message>
                <Grid stackable centered columns={3}>
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
                    { this.props.userType === 'ROLE_STUDENT' &&
                        <Grid.Column>
                            <Card fluid raised>
                                <Card.Content header={'Instrutor'}/>
                                <Card.Content>
                                    <Header as='h1' color={'blue'}>
                                        {
                                            this.props.instructor.name
                                        }
                                    </Header>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    }
                    <Grid.Column>
                        <Card fluid raised>
                            <Card.Content header={'Dia'} />
                            <Card.Content>
                                <Header as='h1' color={'blue'}>
                                    {
                                        this.props.selectedDay.split(' ')[0] +
                                        ' às ' + this.props.selectedDay.split(' ')[1] + 'h'
                                    }
                                </Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

ConfirmNewLesson.propTypes = {
    step: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    selectedDay: PropTypes.string.isRequired,
    instructor: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmNewLesson);