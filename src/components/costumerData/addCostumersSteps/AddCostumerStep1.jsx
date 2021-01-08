import React, {Component, Fragment} from "react";
import { Form, FormGroup, FormInput, Divider, Button, ButtonContent, Icon } from 'semantic-ui-react';
import isNullOrEmpty  from 'check-null-or-empty';
import validator from 'email-validator';
import { withRouter } from "react-router-dom";
import NextButton from "./NextButton";
import AddCostumerStepBar from "./AddCostumerStepsBar";

class AddCostumerStep1 extends Component {


    state = {
        firstName: '',
        secondName: '',
        lastNameFirst: '',
        lastNameSecond: '',
        phone: '',
        email: ''
    }

    handleFirstName = e => this.setState({firstName: e.target.value, disabled: true});
    handleSecondName = e => this.setState({secondName: e.target.value});
    handleLastNameFirst = e => this.setState({lastNameFirst: e.target.value});
    handleLastNameSecond = e => this.setState({lastNameSecond: e.target.value});
    handlePhone = e => this.setState({phone: e.target.value});
    handleEmail = e => this.setState({email: e.target.value});

    buttonAvailable = ()=> {
        const {
            firstName, 
            secondName,
            lastNameFirst, 
            lastNameSecond, 
            phone, 
            email
        } = this.state;
        
        return !validator.validate(email) || 
        isNullOrEmpty(firstName) || 
        isNullOrEmpty(secondName) || 
        isNullOrEmpty(lastNameFirst) || 
        isNullOrEmpty(lastNameSecond) || 
        isNullOrEmpty(phone);
    }

    nextStepClick = ()=> {
        /*const {
            firstName, 
            secondName,
            lastNameFirst, 
            lastNameSecond, 
            phone, 
            email
        } = this.state;*/
        this.props.history.push({
            pathname: '/addCostumerPackage', 
            state: {basicInfo: this.state}
        });
    }

    render = ()=> (
        <Fragment>
            <AddCostumerStepBar/>
            <Form>
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
            </Form>
            <Divider hidden/>
            {console.log(this.buttonAvailable())}
            <Button disabled={this.buttonAvailable()} basic size='medium' color='grey' animated='fade' onClick={this.nextStepClick}>
                <ButtonContent visible>Continuar</ButtonContent>
                <ButtonContent hidden>
                    <Icon name='arrow right' />
                </ButtonContent>
            </Button>
        </Fragment>
    );
}

export default withRouter(AddCostumerStep1);