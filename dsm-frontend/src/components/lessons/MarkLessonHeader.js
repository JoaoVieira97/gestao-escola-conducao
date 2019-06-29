import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Button} from "semantic-ui-react";

export class MarkLessonHeader extends Component {


    render() {
        return (
            <Container textAlign={'right'} style={{paddingBottom: 20}}>
                <Button.Group>
                    <Button onClick={this.props.onCancel}>
                        {
                            this.props.step === 'begin' ?
                                'Cancelar' : 'Voltar'
                        }
                    </Button>
                    <Button.Or text={'ou'} />
                    <Button positive onClick={this.props.onConfirm} disabled={this.props.isDisabled}>
                        {
                            this.props.step === 'end' ?
                                'Confimar' : 'Avançar'
                        }
                    </Button>
                </Button.Group>
            </Container>
        );
    }
}


MarkLessonHeader.propTypes = {
    step: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
