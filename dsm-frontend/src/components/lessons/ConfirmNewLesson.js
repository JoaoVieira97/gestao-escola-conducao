import React, {Component} from 'react';


import {
    Container,
    Dimmer,
    Loader,
    Icon,
    Card,
    List, Button,
} from 'semantic-ui-react';

import Routes from "../../services/Routes";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {fetchApi} from "../../services/api";


class ConfirmNewLesson extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            categoryChoosed: {},
            instructor: {},
            date: '',
            duration: 60,

        }
    };

    async componentWillMount() {

        await this.setState({
            categoryChoosed: this.props.history.location.state.categoryChoosed,
            instructor : this.props.history.location.state.instructor,
            date: this.props.history.location.state.date,
            isLoading: false,
        });

        console.log(this.state.categoryChoosed);
        console.log(this.state.instructor);
        console.log(this.state.date);
    }

    handleConfirmNewLesson = () => {

        //Ver se este dia ainda está disponível

        //Se sim, insere e avisa sucesso

        //Se não, avisa insucesso e retrocede
    };

    render() {

        const newLesson = (
            <div className={"ui fluid card grey"} style={{marginTop:'30px'}}>
                <Card.Content>
                    <Card.Header>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='grey' name='calendar' />
                        </Icon.Group>
                        Marcar Aula Prática
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <List divided>
                        <List.Item>
                            <Icon name='calendar outline' />
                            <List.Content>
                                <List.Header>Aula Prática</List.Header>
                                <List.Description style={{marginTop: "3px"}}>
                                    <b>Categoria:</b> {" " + this.state.categoryChoosed.name}
                                </List.Description>
                                <List.Description style={{marginTop: "3px"}}>
                                    <b>Instrutor:</b> {" " + this.state.instructor.name}
                                </List.Description>
                                <List.Description style={{marginTop: "3px"}}>
                                    <b>Início:</b> {" "+ this.state.date.split(" ")[0]} às
                                    {" " + this.state.date.split(" ")[1].replace(":","h")+"min"}
                                </List.Description>
                                <List.Description style={{marginTop: "3px"}}>
                                    <b>Duração:</b> { this.state.duration+" min"}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
            </div>

        );

        return (
            <Container style={{marginBottom:100}}>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                {newLesson}
                <Container>
                    <Button floated={'right'} color='green' onClick={ () => this.handleConfirmNewLesson}> CONFIRMAR </Button>
                    <Button floated={'right'} color='grey' style={{marginRight: '10px'}}> VOLTAR </Button>
                </Container>
            </Container>
        );
    }
}

export default ConfirmNewLesson;