import React, {Component, Fragment} from "react";
import {Form, Input, Button, Icon, FormGroup, FormInput} from 'semantic-ui-react';

export default class CostumerBasicInfo extends Component {

    state = {
        costumerContext: this.props.costumerContext ? this.props.costumerContext : {}
    }

    handleFirstName = e => this.state.costumerContext.setState({firstName: e.target.value});
    handleSecondName = e => this.state.costumerContext.setState({secondName: e.target.value});
    handleLastNameFirst = e => this.state.costumerContext.setState({lastNameFirst: e.target.value});
    handleLastNameSecond = e => this.state.costumerContext.setState({lastNameSecond: e.target.value});
    handlePhone = e => this.state.costumerContext.setState({phone: e.target.value});
    handleEmail = e => this.state.costumerContext.setState({email: e.target.value});


    render = ()=> {
        return (
            <Fragment>
                <FormGroup widths='equal' >
                    <FormInput
                        id='form-input-control-first-name'
                        label='Primer nombre'
                        placeholder='Primer nombre'
                        required
                        fluid
                        onChange={this.handleFirstName}
                    />
                    <FormInput
                        id='form-input-control-first-name'
                        label='Segundo nombre'
                        placeholder='Segundo nombre'
                        required
                        fluid
                        onChange={this.handleSecondName}
                    />
                    <FormInput
                        id='form-input-control-last-name'
                        label='Apellido paterno'
                        placeholder='Apellido paterno'
                        required
                        fluid
                        onChange={this.handleLastNameFirst}
                    />
                    <FormInput
                        id='form-input-control-last-name'
                        label='Apellido materno'
                        placeholder='Apellido materno'
                        required
                        fluid
                        onChange={this.handleLastNameSecond}
                    />
                </FormGroup>
                <FormInput
                    required
                    label="Teléfono"
                    fluid
                    type="tel"
                    name="Teléfono"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    onChange={this.handlePhone}
                />
                <FormInput
                id='form-input-control-error-email'
                label='Email'
                placeholder='tucorreo@mail.com'
                required
                onChange={this.handleEmail}
                />
            </Fragment>
        );
    }
}