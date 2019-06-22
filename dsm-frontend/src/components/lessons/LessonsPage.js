import React, {Component} from 'react';
import {Header, Icon, Menu, Container, Card, Grid, List, Loader, Dimmer} from 'semantic-ui-react';
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
            activeItem: '',

            isLoading : true,
        };
    }

    async componentDidMount() {

        await fetchApi(
            'get','/student/registers?id=1', //TODO Find userID
            {},  {},
            this.successFetchRegisters, this.errorHandler
        );

        //TODO Fix this
        setTimeout(
            await fetchApi(
                'get','/student/next_practical_lessons?id=1',
                {},  {},
                this.successFetchNextPracticalLessons, this.errorHandler
            ),
            5000
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
            activeItem: categories[0].name,
        });

    };

    /**
     * Handle the response of next practical lessons of a specific student.
     * @param response
     */
    successFetchNextPracticalLessons = async (response) => {

        const data = response.data;

        let categoryChoosed = this.state.allCategories[0];
        let categoryId = categoryChoosed ? categoryChoosed.id : -1 ;
        let practicalsCategoryChoosed = [];

        console.log("olaaaaaaaa");

        if(categoryId !==-1){
            console.log(categoryId);
             data.lessons.map( practLesson => {

                 let categories = practLesson.categories.collection;

                 for (let i = 0; i < categories.length; i++) {
                     console.log(categories[i]);

                     if (categories[i].id === categoryId) {
                         console.log(categories[i].id, '===', categoryId);
                         practicalsCategoryChoosed.push({
                             id: practLesson.id,
                             description: practLesson.description,
                             startTime: practLesson.startTime,
                             duration: practLesson.duration,
                         });
                         console.log("aaaiii", practicalsCategoryChoosed[0]);
                     }
                 }
             });
        }

        console.log("olaaaaaaaa", practicalsCategoryChoosed);

        await this.setState({
            allNextPracticalLessons: response.data.lessons,
            showPracticalLessons: practicalsCategoryChoosed,
            isLoading: false,
        });

        console.log(this.state.showPracticalLessons);

    };

    /**
     * Handle the error.
     * @param error
     */
    errorHandler = (error) => {

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

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem, allCategories } = this.state;

        let categories;
        categories = (
            allCategories.map( category => {
                return (
                    <Menu.Item
                        key={category.id}
                        name={category.name}
                        active={activeItem === category.name}
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

        const nextLessons = (
            <div className={"ui fluid card grey"}>
                <Card.Content>
                    <Card.Header>
                        <Icon.Group style={{marginRight: "8px"}}>
                            <Icon color='grey' name='calendar' />
                        </Icon.Group>
                        Próximas aulas marcadas
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <List divided>
                        {(next_lessons.length > 0) ?
                            next_lessons.map(lesson => (
                                <List.Item key={next_lessons.indexOf(lesson)} style={{marginBottom: "10px"}}>
                                    <Icon name='calendar outline' />
                                    <List.Content>
                                        {(lesson.duration) ?
                                            <List.Header>Aula Prática</List.Header> :
                                            <List.Header>{lesson.description}</List.Header>
                                        }
                                        <List.Description style={{marginTop: "3px"}}>
                                            {lesson.startTime.split(" ")[0]}
                                        </List.Description>
                                        <List.Description style={{marginTop: "3px"}}>
                                            {lesson.startTime.split(" ")[1]}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            )) :
                            <Header as='h4' color='grey'>NÃO HÁ AULAS</Header>
                        }
                    </List>
                </Card.Content>
            </div>
        );

        /*
        let renderCategoriesStyle = allCategories.length > 0 ?
            (
                <div style={categoryStyle}>
                    <Menu pointing secondary >
                        {categories}
                    </Menu>
                </div>
            ) :
            (
                <div>
                    <p> LESSONS PAGE </p>
                </div>
            );*/

        return (
            <div>
                <div style={categoryStyle}>
                    <Menu pointing secondary >
                        {categories}
                    </Menu>
                </div>
                <Grid columns={2} stackable>
                    <Grid.Column width={8} >
                        {nextLessons}
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default LessonsPage;