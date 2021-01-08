import { Button, Icon } from 'semantic-ui-react';
import React, { Component} from "react";

export default class NextButton extends Component {

    state = {
        disabled: this.props.disabled ? this.props.disabled : true,
        onclick: this.props.onClick ? this.props.onClick : ''
    }

    render = ()=> (
        <Button disabled={this.state.disabled} basic size='medium' color='grey' animated='fade' onClick={this.state.onclick}>
            <Button.Content visible>Continuar</Button.Content>
            <Button.Content hidden>
                <Icon name='arrow right' />
            </Button.Content>
        </Button>
    );
}
