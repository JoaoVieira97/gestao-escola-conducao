import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Button} from "semantic-ui-react";

export class MarkLessonHeader extends Component {


    render() {
        return (
            <Container textAlign={'right'} style={{paddingBottom: 20}}>
                <Button.Group>
                    <Button onClick={this.props.onCancel}>
                        Cancelar
                    </Button>
                    <Button.Or text={'ou'} />
                    <Button positive onClick={this.props.onConfirm} disabled={this.props.isDisabled}>
                        Confirmar
                    </Button>
                </Button.Group>
            </Container>
        );
    }
}


MarkLessonHeader.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
