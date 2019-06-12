import React from 'react';
import PropTypes from 'prop-types';
import {Form, Popup} from 'semantic-ui-react';

const regex = new RegExp("^[a-zA-Z0-9 ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ]+$");

export class StudentFilter extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            filter: '',
            filterValid: true,
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event, {name, value}) {

        if (value !== '' && !regex.test(value)) {
            this.setState({[name]: value, filterValid: false});
        } else {
            this.setState({[name]: value, filterValid: true});
            this.props.onSubmitFilter(value);
        }
    }

    render() {
        const { filter } = this.state;
        let popupMessage = '';
        if (!this.state.filterValid) {
            popupMessage = 'Caracter inválido.';
        } else if (this.props.totalCount === 0) {
            popupMessage = 'Nenhum resultado encontrado.'
        }

        return (
            <Form.Field style={{marginTop: '10px'}}>
                <Popup
                    trigger={<Form.Input
                        placeholder='Procurar...'
                        name='filter'
                        value={filter}
                        error={!this.state.filterValid}
                        onChange={this.handleOnChange}
                        icon='search'
                        loading={this.props.isSearching}
                    />}
                    content={popupMessage}
                    on='click'
                    open={!this.state.filterValid || this.props.totalCount === 0}
                    position='right center'
                />
            </Form.Field>
        )
    }
}

StudentFilter.propTypes = {
    onSubmitFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    totalCount: PropTypes.number.isRequired,
    isSearching: PropTypes.bool.isRequired
};