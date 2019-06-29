import React, {Component} from 'react';
import {
    Icon,
    Card,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import ReactAnimatedWeather from 'react-animated-weather';
import moment from 'moment';
import localization from 'moment/locale/pt'
import {fetchApi} from "../../services/api";
import Authentication from "../../services/Authentication";


const defaults = {
    icon: 'CLEAR_DAY',
    color: 'goldenrod',
    size: 100,
    animate: true
};


export default class GenericWeather extends Component {

    constructor(props) {
        super(props);

        this.state = {

            isLoading: true,

            local: 'BRAGA',
            today: moment().locale("pt", localization).format('LL'),
            todayMax: 0,
            todayMin: 0,
            todayIcon: defaults.icon,
            updatedDate: '',
            color: defaults.color
        }
    }

    componentDidMount() {

        fetchApi(
            'get','/weather',
            {},  {},
            this.successHandler, this.errorHandler
        );
    }

    successHandler = (response) => {

        this.setState({
            updatedDate: moment(response.data.dataUpdate).format('LT')
        });

        const today = response.data.data[0];

        // https://www.ipma.pt/bin/file.data/weathertypes.json
        // https://github.com/divyanshu013/react-animated-weather
        let icon = this.state.todayIcon;
        let color = this.state.color;
        const type = today.idWeatherType;
        if(type === 1)
            icon = 'CLEAR_DAY';
        else if(type === 2)
            icon = 'PARTLY_CLOUDY_DAY';
        else if(type >= 3 && type <= 5)
            icon = 'CLOUDY';
        else if(type >= 6 && type <= 15)
            icon = 'RAIN';
        else if((type >= 16 && type <= 17) || type === 26)
            icon = 'FOG';
        else if(type === 18)
            icon = 'SNOW';
        else if(type >= 20 && type <= 21)
            icon = 'SLEET';

        const hr = (new Date()).getHours();
        if(!(hr >= 6 && hr <= 19)) {
            color = '#2a528d';
        }

        this.setState({
            isLoading: false,
            todayIcon: icon,
            todayMax: today.tMax,
            todayMin: today.tMin,
            color: color
        });
    };

    errorHandler = (error) => {

        if(error.response && error.response.status && error.response.status === 401) {
           Authentication.clearData();
           window.location.reload();
           alert("As suas credenciais já não são válidas.");
        }
    };


    render() {
        return (
            <Card color='grey'>
                <Dimmer active={this.state.isLoading} inverted>
                    <Loader inverted content='A carregar' />
                </Dimmer>
                <div style={{
                    padding: 20,
                    backgroundColor: '#ededed',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <ReactAnimatedWeather
                        icon={this.state.todayIcon}
                        color={this.state.color}
                        size={defaults.size}
                        animate={defaults.animate}
                    />
                </div>
                <Card.Content>
                    <Card.Header>BRAGA</Card.Header>
                    <Card.Meta>
                        <span className='date'>{this.state.today}</span>
                    </Card.Meta>
                    <Card.Description>
                        {
                            'Última atualização às ' + this.state.updatedDate +'h'
                        }
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon
                        size={'large'}
                        name={'thermometer three quarters'}
                    />
                    <b
                        style={{color: this.state.color}}
                    >
                        {this.state.todayMax + "/"}
                    </b>
                    {this.state.todayMin + ' ºC'}<i>{' (max/min)'}</i>
                </Card.Content>
            </Card>
        );
    }
}