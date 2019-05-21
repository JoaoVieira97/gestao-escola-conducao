import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react';
import {footerStyle} from "../styles/styles";


class Footer extends Component {

    render() {

        return (
            <footer style={footerStyle}>
                <div className="ui three column grid">
                    <div className="three wide column" style={{marginTop: "20px"}}>
                        <Icon name='envelope' size='big' color={'grey'}/>
                    </div>
                    <div className="ten wide column" style={{marginTop: "10px"}}>
                        <h3 className="ui header">
                            Driving School Management
                            <div className="sub header" style={{marginTop: "5px"}}>
                                Aplicação Web para a gestão de uma escola de condução.
                            </div>
                        </h3>
                    </div>
                    <div className="three wide column" style={{marginTop: "20px"}}>
                        <a href="https://github.com/JoaoVieira97/gestao-escola-conducao">
                            <Icon name='github' size='big' color={'grey'}/>
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;