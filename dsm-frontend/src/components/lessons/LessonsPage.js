import React, {Component} from 'react';
import {
    Header,
    Icon,
    Menu,
    Card,
    Grid,
    List,
    Loader,
    Dimmer,
    Message,
    Button,
    Table,
} from 'semantic-ui-react';
import {categoryStyle} from "../../styles/styles";
import {fetchApi} from "../../services/api";

class LessonsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allRegisters: [],
            allCategories: [],
            allNextPracticalLessons:[],
            showPracticalLessons:[],
            messageLesson: 'Sem aulas marcadas.',
            messageRegisters:'Sem registos efetuados',
            //messageRegistersError: false,
            _activeItem: '',
            _activeItemId: -1,

            themesRealized: [],

            tableRealizedTheoLessons: false,
            tableNextTheoLessons: false,

            isLoading : true,
        };
    }

    componentDidMount() {

        fetchApi(
            'get','/student/registers?id=1', //TODO Find userID
            {},  {},
            this.successFetchRegisters, this.errorFetchRegisters
        );

    }

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchRegisters = (response) => {
        const data = response.data;

        //key -> registers.id
        let categoriesRegister = data.registers.map(register => (register.category));

        let categories = categoriesRegister.map( category => {
            return {
                id: category.id,
                name: "Categoria " + category.name,
            }
        });

        this.setState({
            allRegisters: data.registers,
            allCategories: categories,
            _activeItem: categories[0].name,
            _activeItemId: categories[0].id,
        });

        fetchApi(
            'get','/student/next_practical_lessons?id=1',
            {},  {},
            this.successFetchNextPracticalLessons, this.errorFetchNextPracticalLessons
        )

    };

    /**
     * Handle the response of next practical lessons of a specific student.
     * @param response
     */
    successFetchNextPracticalLessons = (response) => {

        const data = response.data;

        let categoryChoosed = this.state.allCategories[0];
        let categoryId = categoryChoosed ? categoryChoosed.id : -1 ;
        let practicalsCategoryChoosed = [];

        if(categoryId !==-1){
             data.lessons.forEach(practLesson => {

                 let categories = practLesson.categories.collection;

                 for (let i = 0; i < categories.length; i++) {

                     if (categories[i].id === categoryId) {
                         practicalsCategoryChoosed.push({
                             id: practLesson.id,
                             startTime: practLesson.startTime,
                             duration: practLesson.duration,
                         });
                     }
                 }
             });
        }

        this.setState({
            allNextPracticalLessons: response.data.lessons,
            showPracticalLessons: practicalsCategoryChoosed,
            isLoading: false,
        });
    };

    /**
     * Handle the error.
     * @param error
     */
    errorFetchRegisters = (error) => {

        console.log('error retrieving registers');
        console.log(error);
        this.setState({
            //messageRegistersError: true,
            messageRegisters: 'Não foi possível obter os seus registos.',
            isLoading: false,
        })

        /*
        // bad request
        if(error.response.status === 400) {
            this.setState({
                loginError: true,
                loginErrorMessage: 'As credenciais que introduziu estão erradas.'
            });
        }
        // invalid API access token
        else {
            this.setState({
                loginError: true,
                loginErrorMessage: 'Ocorreu um erro ao estabelecer conexão com o servidor principal.'
            });
        }*/
    };

    /**
     * Handle the error retrieving next student events.
     * @param error
     */
    errorFetchNextPracticalLessons = (error) => {

        console.log('error retrieving next lessons');
        console.log(error);
        this.setState({
            messageLesson: 'Não foi possível obter as suas próximas aulas marcadas.',
            isLoading: false,
        })

    };

    handleItemClick = (event, data) => {

        this.setState({
            tableRealizedTheoLessons: false,
            tableNextTheoLessons: false,
            _activeItem: data.name,
            isLoading: true,
        });

        let categoryChoosed = this.state.allCategories.filter(category => (category.name === data.name));
        let categoryId = categoryChoosed ? categoryChoosed[0].id : -1 ;

        let practicalsCategoryChoosed = [];

        if(categoryId !==-1){
            this.state.allNextPracticalLessons.forEach(practLesson => {

                let categories = practLesson.categories.collection;

                for (let i = 0; i < categories.length; i++) {

                    if (categories[i].id === categoryId) {
                        practicalsCategoryChoosed.push({
                            id: practLesson.id,
                            startTime: practLesson.startTime,
                            duration: practLesson.duration,
                        });
                    }
                }
            });
        }

        this.setState({
            _activeItemId: categoryId,
            showPracticalLessons: practicalsCategoryChoosed,
            isLoading: false,
        });
    };

    handleRealizedTheoreticalLessons = () => {

        if(!this.state.tableRealizedTheoLessons){

            this.setState({
                isLoading: true,
            });

            fetchApi(
                'get','/student/realized_themes?id=1&category='+this.state._activeItemId, //TODO Find userID
                {},  {},
                this.successFetchRealizedThemes, this.errorFetchRegisters
            );
        }
    };

    successFetchRealizedThemes = (response) => {

        const themes = response.data.themes;

        this.setState({
            themesRealized: themes,
            tableRealizedTheoLessons: true,
            tableNextTheoLessons: false,
            isLoading: false,
        });
    };

    handleNextTheoreticalLessons = () => {

    };


    render() {
        const { _activeItem, allCategories } = this.state;

        let categories;
        categories = (
            allCategories.map( category => {
                return (
                    <Menu.Item
                        key={category.id}
                        name={category.name}
                        active={_activeItem === category.name}
                        onClick={this.handleItemClick}
                    >
                    </Menu.Item>
                )
            })
        );

        const next_lessons = this.state.showPracticalLessons;
        next_lessons.sort(function(e1, e2) {
            return new Date(e1.startTime) - new Date(e2.startTime);
        });

        const nextPracticalLessons = (
            <div className={"ui fluid card grey"}>
                <Card.Content>
                    <Card.Header>
                        <Button floated='right'> MARCAR AULA </Button>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='grey' name='calendar' />
                        </Icon.Group>
                        Próximas aulas práticas
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <List divided>
                        {(next_lessons.length > 0) ?
                            next_lessons.map(lesson => (
                                <List.Item key={lesson.id} style={{marginBottom: "10px"}}>
                                    <Icon name='calendar outline' />
                                    <List.Content>
                                        <List.Header>Aula Prática</List.Header>
                                        <List.Description style={{marginTop: "3px"}}>
                                            <b>Início:</b> {" "+ lesson.startTime.split(" ")[0]} às
                                            {" " + lesson.startTime.split(" ")[1].replace(":","h")+"min"}
                                        </List.Description>
                                        <List.Description style={{marginTop: "3px"}}>
                                            <b>Duração:</b> {lesson.duration +" min"}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            )) :
                            <Header as='h4' color='grey'>{this.state.messageLesson}</Header>
                        }
                    </List>
                </Card.Content>
            </div>
        );

        const theoLessons = (
            <div className={"ui fluid card grey"}>
                <Card.Content>
                    <Card.Header>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='grey' name='calendar' />
                        </Icon.Group>
                        Aulas Teóricas
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <List animated divided relaxed={'very'} verticalAlign='middle'>
                        <List.Item >
                            <Icon size='large' name='clipboard check' />
                            <List.Content>
                                <List.Header>Aulas Realizadas: 1/28 </List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item onClick={this.handleRealizedTheoreticalLessons}>
                            <List.Content floated='right'>
                                <Icon color='grey' size='large' name='angle right'/>
                            </List.Content>
                            <Icon size='large' name='tasks' />
                            <List.Content >
                                <List.Header>Consultar Aulas Realizadas </List.Header>
                                <List.Description style={{marginTop: "3px"}}>
                                    Consultar temas em que esteve presente.
                                </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item onClick={this.handleNextTheoreticalLessons}>
                            <List.Content floated='right'>
                                <Icon color='grey' size='large' name='angle right'/>
                            </List.Content>
                            <Icon size='large' name='calendar outline' />
                            <List.Content >
                                <List.Header>Consultar Próximas Aulas </List.Header>
                                <List.Description style={{marginTop: "3px"}}>
                                    Consultar data e temas das próximas aulas.
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
            </div>
        );


        const themes = (
            this.state.themesRealized.map(theme => (
                    <Table.Row key={theme.id}>
                        <Table.Cell>23/06/2019 11h00min</Table.Cell>
                        <Table.Cell>{theme.name} </Table.Cell>
                    </Table.Row>
                )
            ));

        const tableThemesRealized = (
            <div style={{marginRight:'10px'}}>
                <Table textAlign={'center'} inverted sortable celled striped stackable>
                    <Table.Header>
                        <Table.Row textAlign={'center'}>
                            <Table.HeaderCell
                                //collapsing
                                //sorted={_column === 'date' ? _direction : null}
                                //onClick={this.handleSort('date')}
                            >Data da Aula
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                //collapsing
                            >Tema
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {themes}
                    </Table.Body>
                </Table>
            </div>
            );



        let renderCategories = allCategories.length > 0 ?
            (
                <div>
                    <div style={categoryStyle}>
                        <Menu pointing secondary >
                            {categories}
                        </Menu>
                    </div>
                    <Grid columns={2} stackable>
                        <Grid.Column width={8} >
                            {nextPracticalLessons}
                            {theoLessons}
                        </Grid.Column>
                        <Grid.Column width={8} >
                            {
                                this.state.tableRealizedTheoLessons ?
                                    tableThemesRealized :
                                    <div>

                                    </div>

                            }
                        </Grid.Column>
                    </Grid>
                </div>
            ) :
            (
                <div>
                    <Message
                        size={'big'}
                        error
                        header={'Erro ao obter registos'}
                        content={this.state.messageRegisters}
                    />
                </div>
            );

        return (
            <div>
                <Dimmer inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                {renderCategories}
            </div>
        )
    }
}

export default LessonsPage;