import React, {Component, Fragment} from "react";
import {Form, Input, Segment, Image, FormInput} from 'semantic-ui-react';
import logorp from "../../logorp.png";
import logoest from "../../logoest.png";

export default class CostumerPackageInfo extends Component{

    state = {
        costumerContext: this.props.costumerContext ? this.props.costumerContext : {}
    }

    handleRedPackAccount = e => this.state.costumerContext.setState({redpackAccount: e.target.value});
    handleRedPackPassword = e => this.state.costumerContext.setState({redpackPassword: e.target.value});
    handleEstafetaccount = e => this.state.costumerContext.setState({estafetaAccount: e.target.value});
    handleEstafetaPassword = e => this.state.costumerContext.setState({estafetaPassword: e.target.value});

    render = ()=> {
        return (
            <Fragment>
                <Segment raised>
                    <Image src={logorp} size='tiny' spaced />
                    <FormInput
                        required
                        label="Cuenta"
                        fluid
                        type="text"
                        name="redpack"
                        onChange={this.handleRedPackAccount}
                    />
                    <FormInput
                    id='form-input-control-error-email'
                    label='Contraseña'                
                    required
                    onChange={this.handleRedPackPassword}
                    />
                </Segment>
                <Segment raised>
                    <Image src={logoest} size='tiny' spaced />
                    <FormInput
                        required
                        label="Cuenta"
                        fluid
                        type="text"
                        name="redpack"
                        onChange={this.handleEstafetaccount}
                    />
                    <FormInput
                    label='Contraseña'                
                    required
                    onChange={this.handleEstafetaPassword}
                    />
                </Segment>
            </Fragment>
        );
    }
}