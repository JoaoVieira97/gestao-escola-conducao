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
    Table, Container, Modal,
} from 'semantic-ui-react';
import {categoryStyle} from "../../styles/styles";
import {fetchApi} from "../../services/api";
import moment from 'moment';
import Routes from "../../services/Routes";

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

            schoolStartTime: undefined,
            schoolEndTime: undefined,

            maxTimeToCancel: undefined,
            modalCancelOpen: false,

            categoryChoosedName: '',
            categoryChoosedId: -1,
            isLoading : true,
        };
    }

    componentDidMount() {

        fetchApi(
            'get','/user/school_information?schoolId=1',
            {},  {},
            this.successFetchSchoolInformation, this.errorFetchSchoolInformation
        );
    }



    /**
        -------------------- SUCESS FETCHS ---------------------------
     */

    /**
     * Handle the response fetch school information.
     * @param response
     */
    successFetchSchoolInformation = (response) => {
        const data = response.data.schoolInfo;

        this.setState({
            maxTimeToCancel: data.maxTimeToCancel,
            schoolStartTime: data.startTime,
            schoolEndTime: data.endTime,
        });

        fetchApi(
            'get','/lessons/student',
            {},  {},
            this.successFetchLessons, this.errorFetchLessons
        );
    };

    /**
     * Handle the response fetch lessons (practical and theroretical realized).
     * @param response
     */
    successFetchLessons = async (response) => {
        const data = response.data;

        await this.setState({
            theoreticalRealized : data.theoreticalLessons,
            practicalRealized : data.practicalLessons,
        });

        fetchApi(
            'get','/student/registers',
            {},  {},
            this.successFetchRegisters, this.errorFetchRegisters
        );
    };

    /**
     * Handle the response fetch registers.
     * @param response
     */
    successFetchRegisters = async (response) => {
        const data = response.data;

        //Obter a categoria de cada registo
        let categoriesRegister = data.registers.map(register => (register.category));
        let categories = categoriesRegister.map( category => {
            return {
                id: category.id,
                name: "Categoria " + category.name,
            }
        });
        categories.sort(function(c1, c2){
            if(c1.name < c2.name) { return -1; }
            if(c1.name > c2.name) { return 1; }
            return 0;
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

        await this.setState({
            allRegisters: data.registers,
            allCategories: categories,
            totalTheoreticalLessons: theoreticalLessons,
            totalPracticalLessons: practicalLessons,
            numberPracticalRealized: numberP,
            numberTheoreticalRealized: numberT,

            categoryChoosedName: categories[0].name,
            categoryChoosedId: categoryId,
        });

        fetchApi(
            'get','/student/next_practical_lessons',
            {},  {},
            this.successFetchNextPracticalLessons, this.errorFetchNextPracticalLessons
        );
    };

    /**
     * Handle the response of next practical lessons of a specific student.
     * @param response
     */
    successFetchNextPracticalLessons = async (response) => {

        const data = response.data;

        let categoryId = this.state.categoryChoosedId;

        let limit = this.state.maxTimeToCancel.split(":");
        let amount,  unit;

        if( (amount = parseInt(limit[0],10)) > 0) unit = 'hours';
        else {
            amount = parseInt(limit[1],10);
            unit= 'minutes';
        }

        let dateLimitCancel = moment().add(amount,unit).format();

        let practicalsCategoryChoosed = [];

        if(categoryId !==-1){
            data.lessons.forEach(practLesson => {

                let categories = practLesson.categories.collection;

                for (let i = 0; i < categories.length; i++) {

                    if (categories[i].id === categoryId) {
                        const practDateSplit = practLesson.startTime.split(/[/ ]/);

                        let isoPractDate = practDateSplit[2] + "-" + practDateSplit[1] + "-" +
                            practDateSplit[0] + "T" + practDateSplit[3];

                        let canCancel = moment(isoPractDate).isAfter(dateLimitCancel);

                        practicalsCategoryChoosed.push({
                            id: practLesson.id,
                            startTime: practLesson.startTime,
                            duration: practLesson.duration,
                            canCancel: canCancel,
                        });
                    }
                }
            });
        }

        practicalsCategoryChoosed.sort(function(l1, l2) {
            return new Date(l1.startTime) - new Date(l2.startTime);
        });

        await this.setState({
            allNextPracticalLessons: response.data.lessons,
            showPracticalLessons: practicalsCategoryChoosed,
        });

        //FAZER AQUI, POIS JÁ TEM O ID DA CATEGORIA E A FUNÇÃO DE DESENHAR A TABELA DE PRÓXIMAS AULAS TEÓRICAS DEPENDE DESTE FETCH
        // FAZER SEMPRE QUE MUDAR A CATEGORIA SELECIONADA (handleCategoryClicked)
        //Este fetch é o ultimo e poe o isLoading = false
        fetchApi(
            'get','/student/realized_themes?category='+this.state.categoryChoosedId,
            {},  {},
            this.successFetchRealizedThemes, this.errorFetchRealizedThemes
        );

    };

    /**
     * Handle the response of fetch realized themes.
     * @param response
     */
    successFetchRealizedThemes = (response) => {

        let themes = response.data.lessons;

        //ordenar as aulas por ordem alfabética dos temas

        themes.sort(function(l1, l2) {
            return new Date(l1.startTime) - new Date(l2.startTime);
        });

        themes.forEach( lesson => {

            lesson.themes.collection.sort(function(t1, t2){
                if(t1.name < t2.name) { return -1; }
                if(t1.name > t2.name) { return 1; }
                return 0;
            });
        });

        this.setState({
            themesRealized: themes,
            isLoading: false,
        });
    };



    /**
     -------------------- ERROR FETCHS ---------------------------
     */



    /**
     * Handle the error fetch school information.
     * @param error
     */
    errorFetchSchoolInformation = (error) => {

        console.log(error);
    };

    /**
     * Handle the error fetch lessons.
     * @param error
     */
    errorFetchLessons = (error) => {

        console.log(error);
    };

    /**
     * Handle the error fetch registers.
     * @param error
     */
    errorFetchRegisters = (error) => {

        console.log('error retrieving registers');
        console.log(error);
        this.setState({
            messageRegisters: 'Não foi possível obter os seus registos.',
            isLoading: false,
        })
    };

    /**
     * Handle the error retrieving next practical lessons.
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

    /**
     * Handle the error fetch realized themes.
     * @param error
     */
    errorFetchRealizedThemes = (error) => {

        console.log(error);
    };



    /**
     -------------------- HANDLE ACTIONS (AND FETCHES) ---------------------------
     */


    /**
     * When user change category choosed.
     * @param event
     * @param data
     */
    handleCategoryClicked = async (event, data) => {

        await this.setState({
            isLoading: true,
            tableRealizedTheoLessons: false,
            tableNextTheoLessons: false,
            messageRealizedTheoLessons: false,
            messageNextTheoLessons: false,
            categoryChoosedName: data.name,
        });

        let limit = this.state.maxTimeToCancel.split(":");
        let amount,  unit;

        if( (amount = parseInt(limit[0],10)) > 0) unit = 'hours';
        else {
            amount = parseInt(limit[1],10);
            unit= 'minutes';
        }

        let dateLimitCancel = moment().add(amount,unit).format();

        let categoryChoosed = this.state.allCategories.filter(category => (category.name === data.name));
        let categoryId = categoryChoosed ? categoryChoosed[0].id : -1 ;

        let practicalsCategoryChoosed = [];

        if(categoryId !==-1){
            this.state.allNextPracticalLessons.forEach(practLesson => {

                let categories = practLesson.categories.collection;

                for (let i = 0; i < categories.length; i++) {

                    if (categories[i].id === categoryId) {

                        const practDateSplit = practLesson.startTime.split(/[/ ]/);

                        let isoPractDate = practDateSplit[2] + "-" + practDateSplit[1] + "-" +
                            practDateSplit[0] + "T" + practDateSplit[3];

                        let canCancel = moment(isoPractDate).isAfter(dateLimitCancel);

                        practicalsCategoryChoosed.push({
                            id: practLesson.id,
                            startTime: practLesson.startTime,
                            duration: practLesson.duration,
                            canCancel: canCancel,
                        });
                    }
                }
            });
        }

        practicalsCategoryChoosed.sort(function(l1, l2) {
            return new Date(l1.startTime) - new Date(l2.startTime);
        });

        await this.setState({
            categoryChoosedId: categoryId,
            showPracticalLessons: practicalsCategoryChoosed,
        });

        fetchApi(
            'get','/student/realized_themes?category='+categoryId,
            {},  {},
            this.successFetchRealizedThemes, this.errorFetchRealizedThemes
        );

    };


    /**
     * When user select consult realized theoretical lessons.
     */
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

    /**
     * When user select consult next theoretical lessons.
     */
    handleNextTheoreticalLessons = () => {

        if(!this.state.tableNextTheoLessons){

            this.setState({
                isLoading: true,
            });

            fetchApi(
                'get','/student/next_theoretical_lessons',
                {},  {},
                this.successFetchNextTheoreticalLessons, this.errorFetchNextTheoreticalLessons
            );
        }

    };


    /**
     * Handle the success of the handle next theoretical lessons.
     * @param response
     */
    successFetchNextTheoreticalLessons = (response) => {

        const data = response.data;

        //category choosed
        let categoryId = this.state.categoryChoosedId;

        let theoreticalsCategoryChoosed = [];

        if(categoryId !==-1){
            data.theoreticalLessons.forEach(theoLesson => {

                let categories = theoLesson.categories.collection;

                for (let i = 0; i < categories.length; i++) {

                    if (categories[i].id === categoryId) {

                        let themes = theoLesson.themes.collection;
                        let showThemes = [];

                        themes.forEach( theme => {
                            let themeRealized = false;

                            for(let j=0 ; j< this.state.themesRealized.length && !themeRealized ; j++){

                                const lesson = this.state.themesRealized[j];
                                let aux = lesson.themes.collection.find(function (themeAux) {

                                    return themeAux.id === theme.id;
                                });

                                if(aux) themeRealized=true;
                            }

                            showThemes.push({
                                id: theme.id,
                                name: theme.name,
                                learned: themeRealized,
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

        theoreticalsCategoryChoosed.sort(function(l1, l2) {
            return new Date(l1.startTime) - new Date(l2.startTime);
        });

        theoreticalsCategoryChoosed.forEach( lesson => {
            lesson.themes.sort(function(t1, t2){
                if(t1.name < t2.name) { return -1; }
                if(t1.name > t2.name) { return 1; }
                return 0;
            });
        });

        this.setState({
            nextTheoreticalLessons: theoreticalsCategoryChoosed,
            tableRealizedTheoLessons: false,
            tableNextTheoLessons: theoreticalsCategoryChoosed.length > 0,

            messageRealizedTheoLessons: false,
            messageNextTheoLessons: theoreticalsCategoryChoosed.length === 0,
            isLoading: false,
        })

    };

    /**
     * Handle the error of the handle next theoretical lessons.
     * @param error
     */
    errorFetchNextTheoreticalLessons = (error) => {

        console.log(error);
    };


    /**
     * When user select cancel practical lesson.
     */
    handleLessonCancel = (lessonId) => {

        this.setState({
            isLoading: true,
            modalCancelOpen: false,
        });

        fetchApi(
            'post','/lesson/cancel_lesson',
            {
                lessonId: lessonId,
            },  {},
            this.successHandlerCanceled, this.errorHandlerCanceled
        );
    };

    /**
     * Handle the success of the handle lesson cancel.
     * @param response
     */
    successHandlerCanceled = (response) => {

        if(response.data.success){
            //refresh page -> fetch lessons
            fetchApi(
                'get','/lessons/student',
                {},  {},
                this.successFetchLessons, this.errorFetchLessons
            );
        }
        else{
            //TODO UMA MENSAGEM DE ERRO APARECER
            console.log("ERRO AO CANCELAR AULA!!");
        }
    };

    /**
     * Handle the error of the handle lesson cancel.
     * @param error
     */
    errorHandlerCanceled = (error) => {

        //TODO UMA MENSAGEM DE ERRO APARECER
        console.log(error);
    };



    render() {
        const { categoryChoosedName, allCategories, showPracticalLessons } = this.state;

        let categories;
        categories = (
            allCategories.map( category => {
                return (
                    <Menu.Item
                        key={category.id}
                        name={category.name}
                        active={categoryChoosedName === category.name}
                        onClick={this.handleCategoryClicked}
                    >
                    </Menu.Item>
                )
            })
        );

        const nextPracticalLessons = (
            <div className={"ui fluid card grey"}>
                <Card.Content>
                    <Card.Header>
                        <Button floated='right'
                                color={'black'}
                                onClick={() => this.props.history.push({
                                    pathname: Routes.NEW_LESSON,
                                    data: this.state.categoryChoosedName,
                                })}
                        > MARCAR AULA
                        </Button>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='grey' name='calendar' />
                        </Icon.Group>
                        Próximas aulas práticas
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <List divided>
                        {(showPracticalLessons.length > 0) ?
                            showPracticalLessons.map(lesson => (
                                <List.Item key={lesson.id} style={{marginBottom: "10px"}}>

                                    <Modal trigger={
                                            lesson.canCancel &&
                                            <Button floated='right' icon labelPosition='right'
                                                    inverted color='red' onClick={ () => this.setState({modalCancelOpen:true})}>
                                                <Icon name='times circle outline'/>
                                                Cancelar aula
                                            </Button>
                                            }
                                            size='small'
                                            open={this.state.modalCancelOpen}
                                            onClose={() => this.setState({modalCancelOpen:false})}
                                    >
                                        <Header icon='delete calendar' content='Cancelar Aula' />
                                        <Modal.Content>
                                            <p>
                                                Tem a certeza que pretende cancelar esta aula?
                                            </p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button  color='red' inverted
                                                     onClick={ () => this.setState({modalCancelOpen:false})}>
                                                <Icon name='remove' /> Não
                                            </Button>
                                            <Button color='green' inverted
                                                    onClick={ () => this.handleLessonCancel(lesson.id) }>
                                                <Icon name='checkmark' /> Sim
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>
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
                        <List.Item style={{cursor: 'pointer'}} onClick={this.handleRealizedTheoreticalLessons}>
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
                        <List.Item  style={{cursor: 'pointer'}} onClick={this.handleNextTheoreticalLessons}>
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
            this.state.themesRealized.map(lesson => {
                return (
                    <Table.Body key={lesson.id}>
                        <Table.Row key={lesson.id + " " + lesson.themes.collection[0].id}>
                            <Table.Cell rowSpan={lesson.themes.collection.length}>
                                {(lesson.startTime.split(" "))[0] + " " +
                                (lesson.startTime.split(" "))[1].replace(":","h")+"min"}
                            </Table.Cell>
                            <Table.Cell> {lesson.themes.collection[0].name} </Table.Cell>
                        </Table.Row>
                        {
                            lesson.themes.collection.slice(1,lesson.themes.collection.length).map( theme =>
                                <Table.Row key={lesson.id + " " + theme.id}>
                                    <Table.Cell>{theme.name} </Table.Cell>
                                </Table.Row>
                            )
                        }
                    </Table.Body>
                )
            }));

        const tableThemesRealized = (
            <div>
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
                    {themes}
                </Table>
            </div>
            );

        const nextTheoLessons = (
            this.state.nextTheoreticalLessons.map(theoLesson => (
                <Table.Body key={theoLesson.id}>
                    <Table.Row key={theoLesson.id + " " + theoLesson.themes[0].id}>
                        <Table.Cell rowSpan={theoLesson.themes.length}>
                            {(theoLesson.startTime.split(" "))[0] + " " +
                            (theoLesson.startTime.split(" "))[1].replace(":","h")+"min"}
                        </Table.Cell>
                        <Table.Cell>{theoLesson.themes[0].name}</Table.Cell>
                        <Table.Cell>
                            {
                                theoLesson.themes[0].learned ?  <Icon color='green' name='checkmark' size='large' /> :
                                    <Icon color='red' name='times' size='large' />
                            }
                        </Table.Cell>
                    </Table.Row>
                    {
                        theoLesson.themes.slice(1,theoLesson.themes.length).map( theme =>
                            <Table.Row key={theoLesson.id + " " + theme.id}>
                                <Table.Cell>{theme.name} </Table.Cell>
                                <Table.Cell>
                                    {
                                        theme.learned ?  <Icon color='green' name='checkmark' size='large' /> :
                                            <Icon color='red' name='times' size='large' />
                                    }
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            )));

        const tableNextTheoreticalLessons = (
            <div>
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
                    {nextTheoLessons}
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
                                        this.state.messageNextTheoLessons &&
                                            <Message
                                                //onDismiss
                                                size={'large'}
                                                error
                                                header={'Registo de aulas teóricas'}
                                                content={'Não há registo de aulas teóricas futuras.'}
                                            />
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