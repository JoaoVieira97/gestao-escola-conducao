import React, {Component} from 'react';
import {
    Header,
    Container,
    Dimmer,
    Loader,
    Step,
    Icon, Breadcrumb, Grid,
} from 'semantic-ui-react';
import Routes from "../../services/Routes";


class MarkLesson extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    };


    render() {

        const {data} = this.props.location;

        return (
            <Container textAlign='center' style={{marginBottom:100}}>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                <Grid centered style={{marginBottom: "65px"}}>
                    <Grid.Column width={16}>

                        <Breadcrumb size='large'>
                            <Breadcrumb.Section
                                style={{color: 'grey'}}
                                onClick={() => this.props.history.push(Routes.LESSONS)}
                            >
                                Aulas
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>Marcar Aula - {data} </Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right arrow' />
                            <Breadcrumb.Section active>Escolher semana</Breadcrumb.Section>
                        </Breadcrumb>
                    </Grid.Column>
                </Grid>
                <Header as='h1'> Marcar aula </Header>

                <Step.Group size='small'>
                    <Step active >
                        <Icon name='calendar outline' />
                        <Step.Content>
                            <Step.Title>Escolher semana</Step.Title>
                            <Step.Description>Escolha a semana pretendida para marcar aula prática.</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step disabled link>
                        <Icon name='calendar alternate' />
                        <Step.Content>
                            <Step.Title>Escolher dia</Step.Title>
                            <Step.Description>Escolha o dia pretendido para marcar aula prática.</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step disabled link>
                        <Icon name='calendar check' />
                        <Step.Content>
                            <Step.Title>Horários disponíveis</Step.Title>
                            <Step.Description>Selecionar horário disponível para marcar aula prática.</Step.Description>
                        </Step.Content>
                    </Step>
                </Step.Group>
            </Container>
        );
    }
}

export default MarkLesson;