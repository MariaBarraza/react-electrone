import React, { Component } from "react";
import { Step, StepGroup } from 'semantic-ui-react';

export default class AddCostumerStepBar extends Component {

    state = {
        step1: this.props.step1 ? this.props.step1 : false,
        step2: this.props.step2 ? this.props.step2 : false,
        step3: this.props.step3 ? this.props.step3 : false
    }

    render = ()=> (
        <StepGroup size='mini' ordered widths={3}>
            <Step completed={this.state.step1}
            title= 'Datos personales'
            description= 'Llena los datos basicos del usuario'/>
            <Step completed={this.state.step2}
            title= 'Datos de paquetería'
            description= 'Agrega tus dates de cuentas de paquería para envios'/>
            <Step completed={this.state.step3}
            title= 'Confirmación de los datos'/>
        </StepGroup>
    );
}