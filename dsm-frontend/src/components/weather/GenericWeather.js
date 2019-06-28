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
            todayIcon: undefined,
            updatedDate: ''
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
        let icon;
        const type = today.idWeatherType;
        if(type === 1)
            icon = 'CLEAR_DAY';
        else if(type === 2)
            icon = 'PARTLY_CLOUDY_DAY';
        else if(type >= 3 && type <= 5)
            icon = 'CLOUDY';
        else if(type >= 6 && type <= 15)
            icon = 'RAIN';
        else if(type >= 16 && type <= 17 || type === 26)
            icon = 'FOG';
        else if(type === 18)
            icon = 'SNOW';
        else if(type >= 20 && type <= 21)
            icon = 'SLEET';

        this.setState({
            isLoading: false,
            todayIcon: icon,
            todayMax: today.tMax,
            todayMin: today.tMin
        });
    };

    errorHandler = (error) => {

        if(error.response.status === 401) {
           alert("Unauthorized")
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
                        icon={this.state.todayIcon ? this.state.todayIcon : defaults.icon}
                        color={defaults.color}
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
                    {
                        this.state.todayMax + "/" + this.state.todayMin + ' ºC'
                    }
                </Card.Content>
            </Card>
        );
    }
}
