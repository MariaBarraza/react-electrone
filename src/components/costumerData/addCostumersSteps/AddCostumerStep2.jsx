import React, {Component, Fragment} from "react";
import { Segment, FormInput, Form, Divider, Button, ButtonContent, Icon, Image, FormGroup } from 'semantic-ui-react';
import isNullOrEmpty  from 'check-null-or-empty';
import { withRouter } from "react-router-dom";
import AddCostumerStepBar from "./AddCostumerStepsBar";
import logorp from "../../../logorp.png";
import logoest from "../../../logoest.png";

class AddCostumerStep2 extends Component {


    state = {
        estafetaAccount: '',
        estafetaPassword: '',
        redpackAccount: '',
        redpackPassword: '',
    }

    handleRedPackAccount = e => this.setState({redpackAccount: e.target.value});
    handleRedPackPassword = e => this.setState({redpackPassword: e.target.value});
    handleEstafetaccount = e => this.setState({estafetaAccount: e.target.value});
    handleEstafetaPassword = e => this.setState({estafetaPassword: e.target.value});

    buttonAvailable = ()=> {
        const {
            estafetaAccount, 
            estafetaPassword,
            redpackAccount, 
            redpackPassword
        } = this.state;
        
        return (isNullOrEmpty(estafetaAccount) || isNullOrEmpty(estafetaPassword)) & 
        (isNullOrEmpty(redpackAccount) || isNullOrEmpty(redpackPassword));
    }

    nextStepClick = ()=> {

        const { basicInfo } = this.props.history.location.state;
        //const basicInfo = state;
        this.props.history.push({
            pathname: '/addCostumerConfirm', 
            state: {packageInfo: this.state, basicInfo}
        });
    }

    render = ()=> (
        <Fragment>
            <AddCostumerStepBar step1={true}/>
            <Form>
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
            </Form>
            <Divider hidden/>
            <FormGroup inline>
            <Button basic size='medium' color='grey' animated='fade' onClick={this.backStep}>
                    <Button.Content visible>Regresar</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow left' />
                    </Button.Content>
                </Button>
            <Button disabled={this.buttonAvailable()} basic size='medium' color='grey' animated='fade' onClick={this.nextStepClick}>
                <ButtonContent visible>Continuar</ButtonContent>
                <ButtonContent hidden>
                    <Icon name='arrow right' />
                </ButtonContent>
            </Button>
            </FormGroup>
        </Fragment>
    );
}

export default withRouter(AddCostumerStep2);