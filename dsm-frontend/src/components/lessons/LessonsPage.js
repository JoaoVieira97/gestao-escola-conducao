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
    Table, Container,
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

            nextTheoreticalLessons:[],
            themesRealized: [],

            theoreticalRealized : [],
            numberTheoreticalRealized: 0,
            totalTheoreticalLessons: 0,

            practicalRealized : [],
            numberPracticalRealized: 0,
            totalPracticalLessons: 0,

            tableRealizedTheoLessons: false,
            messageRealizedTheoLessons: false,

            tableNextTheoLessons: false,
            messageNextTheoLessons: false,


            _activeItem: '',
            _activeItemId: -1,
            isLoading : true,
        };
    }

    componentDidMount() {

        fetchApi(
            'get','/lessons/student?id=1', //TODO Find userID
            {},  {},
            this.successFetchLessons, this.errorFetchLessons
        );

    }

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchLessons = (response) => {
        const data = response.data;

        //SERVLET FINISH!!
        this.setState({
            theoreticalRealized : data.theoreticalLessons,
            practicalRealized : data.practicalLessons,
        });

        fetchApi(
            'get','/student/registers?id=1', //TODO Find userID
            {},  {},
            this.successFetchRegisters, this.errorFetchRegisters
        );
    };



    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchRegisters = (response) => {
        const data = response.data;

        //Obter a categoria de cada registo
        let categoriesRegister = data.registers.map(register => (register.category));

        let categories = categoriesRegister.map( category => {
            return {
                id: category.id,
                name: "Categoria " + category.name,
            }
        });

        //Category choosed -> A default é a primeira
        let categoryId = categories[0].id;

        //Register Choosed (aceder à posição 0, pois é o resultado é um array)
        let registerChoosed = data.registers.filter(register => (register.category.id === categoryId));

        //Obter o nº total de aulas teóricas do registo escolhido
        let theoreticalLessons = registerChoosed[0].category.theoreticalLessons;

        //Obter o nº total de aulas práticas do registo escolhido
        let practicalLessons = registerChoosed[0].category.practicalLessons;

        //Obter as categorias das aulas práticas realizadas
        let categoriesPracticalRealized = this.state.practicalRealized.map( practLesson => (
            practLesson.categories.collection));

        //Filtrar as categorias das práticas realizadas pela categoria (registo) escolhida -> Resultado: array[array,array,...]
        let practicalRealized = categoriesPracticalRealized.map( category => (
            category.filter( cat => (cat.id === categoryId))));

        //Obter o nº de práticas realizadas, isto é, somar o length de cada array dentro do array practicalRealized
        let numberP = practicalRealized.reduce( (acc, array) => acc + array.length, 0);

        //Obter as categorias das aulas teóricas realizadas
        let categoriesTheoreticalRealized = this.state.theoreticalRealized.map( theoLesson => (
            theoLesson.categories.collection));

        //Filtrar as categorias das teóricas realizadas pela categoria (registo) escolhida -> Resultado: array[array,array,...]
        let theoreticalRealized = categoriesTheoreticalRealized.map( category =>
            (category.filter( cat => (cat.id === categoryId))));

        //Obter o nº de teóricas realizadas, isto é, somar o length de cada array dentro do array theoreticalRealized
        let numberT = theoreticalRealized.reduce( (acc, array) => acc + array.length, 0);

        this.setState({
            allRegisters: data.registers,
            allCategories: categories,
            totalTheoreticalLessons: theoreticalLessons,
            totalPracticalLessons: practicalLessons,
            numberPracticalRealized: numberP,
            numberTheoreticalRealized: numberT,

            _activeItem: categories[0].name,
            _activeItemId: categoryId,
        });

        fetchApi(
            'get','/student/next_practical_lessons?id=1',
            {},  {},
            this.successFetchNextPracticalLessons, this.errorFetchNextPracticalLessons
        );
    };

    /**
     * Handle the response of next practical lessons of a specific student.
     * @param response
     */
    successFetchNextPracticalLessons = (response) => {

        const data = response.data;

        let categoryId = this.state._activeItemId;
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
        });

        //FAZER AQUI, POIS JÁ TEM O ID DA CATEGORIA E FAZER SEMPRE QUE MUDAR A CATEGORIA SELECIONADA (handleItemClick)
        //Este fetch é o ultimo e poe o isLoading = false
        fetchApi(
            'get','/student/realized_themes?id=1&category='+this.state._activeItemId, //TODO Find userID
            {},  {},
            this.successFetchRealizedThemes, this.errorFetchRealizedThemes
        );

    };

    /**
     * Handle the error.
     * @param error
     */
    errorFetchLessons = (error) => {

        console.log(error);

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
            isLoading: true,
            tableRealizedTheoLessons: false,
            tableNextTheoLessons: false,
            messageRealizedTheoLessons: false,
            messageNextTheoLessons: false,
            _activeItem: data.name,
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
        });

        fetchApi(
            'get','/student/realized_themes?id=1&category='+categoryId, //TODO Find userID
            {},  {},
            this.successFetchRealizedThemes, this.errorFetchRealizedThemes
        );

    };

    handleRealizedTheoreticalLessons = () => {

        if(!this.state.tableRealizedTheoLessons){

            this.setState({
                //isLoading: true,
                tableRealizedTheoLessons: this.state.themesRealized.length > 0,
                tableNextTheoLessons: false,
                messageRealizedTheoLessons: this.state.themesRealized === 0,
                messageNextTheoLessons: false,
            });

        }
    };

    successFetchRealizedThemes = (response) => {

        const themes = response.data.themes;

        this.setState({
            themesRealized: themes,
            isLoading: false,
        });
    };

    errorFetchRealizedThemes = (error) => {

        console.log(error);
    };

    handleNextTheoreticalLessons = () => {

        if(!this.state.tableNextTheoLessons){

            this.setState({
                isLoading: true,
            });

            fetchApi(
                'get','/student/next_theoretical_lessons?id=1', //TODO Find userID
                {},  {},
                this.successFetchNextTheoreticalLessons, this.errorFetchNextTheoreticalLessons
            );
        }

    };

    successFetchNextTheoreticalLessons = (response) => {

        const data = response.data;
        console.log(data);

        //category choosed
        let categoryId = this.state._activeItemId;

        let theoreticalsCategoryChoosed = [];

        if(categoryId !==-1){
            data.theoreticalLessons.forEach(theoLesson => {

                let categories = theoLesson.categories.collection;

                for (let i = 0; i < categories.length; i++) {

                    if (categories[i].id === categoryId) {

                        let themes = theoLesson.themes.collection;
                        let showThemes = [];

                        themes.forEach( theme => {

                            let themeRealized = this.state.themesRealized.find(function(element) {
                                return element.id === theme.id;
                            });

                            let learned = themeRealized ? true : false;
                            if(themeRealized) learned = true;

                            showThemes.push({
                                id: theme.id,
                                name: theme.name,
                                learned: learned,
                            });
                        });


                        theoreticalsCategoryChoosed.push({
                            id: theoLesson.id,
                            startTime: theoLesson.startTime,
                            duration: theoLesson.duration,
                            themes: showThemes,
                        });
                    }
                }
            });
        }

        this.setState({
            nextTheoreticalLessons: theoreticalsCategoryChoosed,
            tableRealizedTheoLessons: false,
            tableNextTheoLessons: theoreticalsCategoryChoosed.length > 0,

            messageRealizedTheoLessons: false,
            messageNextTheoLessons: theoreticalsCategoryChoosed.length === 0,
            isLoading: false,
        })

    };

    errorFetchNextTheoreticalLessons = (error) => {

        console.log(error);
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
                        <Button floated='right' color={'black'}> MARCAR AULA </Button>
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
                                    <Button floated='right' icon labelPosition='right' inverted color='red'>
                                        <Icon name='times circle outline'/>
                                        Cancelar aula
                                    </Button>
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
                                <List.Header>Aulas Realizadas:
                                    {" " + this.state.numberTheoreticalRealized} / {this.state.totalTheoreticalLessons}  </List.Header>
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
                <Table textAlign={'center'} inverted sortable celled striped stackable structured>
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


/*
        const themesNextLessons = (
            this.state.themesRealized.map(theme => (
                    <Table.Row key={theme.id}>
                        <Table.Cell>23/06/2019 11h00min</Table.Cell>
                        <Table.Cell>{theme.name} </Table.Cell>
                    </Table.Row>
                )
            ));
            */

        const nextTheoLessons = (
            this.state.nextTheoreticalLessons.map(theoLesson => (
                theoLesson.themes.map( theme => (
                    <Table.Row key={theoLesson.id + " " + theme.id}>
                        <Table.Cell>
                            {(theoLesson.startTime.split(" "))[0] + " " +
                            (theoLesson.startTime.split(" "))[1].replace(":","h")+"min"}
                        </Table.Cell>
                        <Table.Cell>{theme.name}</Table.Cell>
                        <Table.Cell>
                            {
                                theme.learned ?  <Icon color='green' name='checkmark' size='large' /> :
                                    <Icon color='red' name='times' size='large' />
                            }
                        </Table.Cell>
                    </Table.Row>
                    )))));

        const tableNextTheoreticalLessons = (
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
                            <Table.HeaderCell
                                //collapsing
                            >Já dado?
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {nextTheoLessons}
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
                    <Container>
                        <Grid columns={2} stackable>
                            <Grid.Column width={8} >
                                {nextPracticalLessons}
                                {theoLessons}
                            </Grid.Column>
                            <Grid.Column width={8} >
                                {
                                    this.state.tableRealizedTheoLessons  ?
                                        tableThemesRealized :
                                    this.state.tableNextTheoLessons ?
                                        tableNextTheoreticalLessons :
                                    this.state.messageRealizedTheoLessons ?
                                            <Message
                                                //onDismiss
                                                size={'large'}
                                                error
                                                header={'Registo de aulas teóricas'}
                                                content={'Não compareceu a nenhuma aula teórica.'}
                                            /> :
                                        this.state.messageNextTheoLessons ?
                                            <Message
                                                //onDismiss
                                                size={'large'}
                                                error
                                                header={'Registo de aulas teóricas'}
                                                content={'Não há registo de aulas teóricas futuras.'}
                                            /> :
                                            <div> </div>

                                }
                            </Grid.Column>
                        </Grid>
                    </Container>
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
                <Dimmer page inverted active={this.state.isLoading}>
                    <Loader>A carregar</Loader>
                </Dimmer>
                {renderCategories}
            </div>
        )
    }
}

export default LessonsPage;