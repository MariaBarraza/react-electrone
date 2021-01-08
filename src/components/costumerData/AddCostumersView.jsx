import React, {Component, Fragment} from "react";
import { gql,  getApolloContext } from '@apollo/client';
import { Step, Form, Button, Icon, FormGroup, Loader} from 'semantic-ui-react';
import CostumerBasicInfo from "./CostumerBasicInfo";
import CostumerPackageInfo from "./CostumerPackageInfo";
import CostumerConfirmInfo from './CostumerConfirmInfo';
import isNullOrEmpty  from 'check-null-or-empty';
import validator from 'email-validator';
import { withRouter } from "react-router-dom";
import AddCostumerStepBar from "./addCostumersSteps/AddCostumerStepsBar";

/*const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]*/

const ADD_COSTUMER = gql`
    mutation($firstName: String!, $middleName: String!, $lastName: String!,
    $secondLastName: String!, $fullName: String!, $phonNumber: String!, $email: String!){
        addCostumer(firstName: $firstName, middleName: $middleName, lastName: $lastName, 
        secondLastName: $secondLastName, fullName: $fullName, phonNumber: $phonNumber, email: $email){
            id
            firstName
            middleName
            lastName
            secondLastName
            fullName
            phonNumber
            email
        }
    }
`;


const ADD_PACKAGE = gql`
    mutation($account: String!, $password: String!, $costumerId: ID!, $parcelId: ID!){
        addPackage(account: $account, password: $password, costumerId: $costumerId, parcelId: $parcelId){
            account
            password
            costumerId
            parcel{
                name
            }
        }
    }
`;

class AddCostumerView extends Component{

    static contextType = getApolloContext();

    state = {
        stepStatus: 0,
        firstName: '',
        secondName: '',
        lastNameFirst: '',
        lastNameSecond: '',
        phone: '',
        email: '',
        estafetaAccount: '',
        estafetaPassword: '',
        redpackAccount: '',
        redpackPassword: '',
        loading: false,
        routeContext: this.props.routeContext ? this.props.routeContext : ''
    }

    moveStep = ()=> this.setState({stepStatus: this.state.stepStatus === 3 ? 3 : this.state.stepStatus + 1});

    backStep = ()=> this.setState({stepStatus: this.state.stepStatus === 0 ? 0 : this.state.stepStatus - 1});

    addNewCostumer = ()=>{
        const {firstName, secondName, lastNameFirst, lastNameSecond, phone, email} = this.state;
        const {client} = this.context;
        client.mutate({
            mutation: ADD_COSTUMER,
            variables:{
                firstName: firstName.toString(),
                middleName: secondName.toString(),
                lastName: lastNameFirst.toString(),
                secondLastName: lastNameSecond.toString(),
                fullName: `${firstName.toString()} ${secondName.toString()} ${lastNameFirst.toString()} ${lastNameSecond.toString()}`,
                phonNumber: phone.toString(),
                email: email.toString()
            }
        }).then(response => {
            this.addNewPackage(response.data.addCostumer.id);
            this.props.history.push('/');
        });
    }

    addNewPackage = costumerId =>{
        const {redpackAccount, redpackPassword, estafetaAccount, estafetaPassword} = this.state;
        const {client} = this.context;

        if(!isNullOrEmpty(redpackAccount) & !isNullOrEmpty(redpackPassword)){
            client.mutate({
                mutation: ADD_PACKAGE,
                variables:{
                    account: redpackAccount.toString(),
                    password: redpackPassword.toString(),
                    costumerId: costumerId,
                    parcelId: "5fd0760414cccc3ffc3ae38b"
                }
            }).then(response => console.log(response));
        }

        if(!isNullOrEmpty(estafetaAccount) & !isNullOrEmpty(estafetaPassword)){
            client.mutate({
                mutation: ADD_PACKAGE,
                variables:{
                    account: estafetaAccount.toString(),
                    password: estafetaPassword.toString(),
                    costumerId: costumerId,
                    parcelId: "5fd0764014cccc3ffc3ae38c"
                }
            }).then(response => console.log(response));
        }
    }

    saveCostumerData = ()=> {
        //this.setState({stepStatus: this.state.stepStatus === 3 ? 3 : this.state.stepStatus + 1});
        this.setState({loading: true});
        this.addNewCostumer();
    }

    currentForm = ()=> (
        this.state.stepStatus === 0 ? <CostumerBasicInfo costumerContext={this}/> : 
        this.state.stepStatus === 1 ? <CostumerPackageInfo costumerContext={this}/> : 
        this.state.stepStatus === 2  ? <CostumerConfirmInfo costumerContext={this}/> : 
        <CostumerConfirmInfo costumerContext={this}/>
    );
                
    step1 = ()=> (
        <Step completed={this.state.stepStatus > 0}
            title= 'Datos personales'
            description= 'Llena los datos basicos del usuario'    
        />
    );
    step2 = ()=> (
        <Step completed={this.state.stepStatus > 1}
            title= 'Datos de paquetería'
            description= 'Agrega tus dates de cuentas de paquería para envios'    
        />
    );

    //step2 = ()=> this.state.stepStatus < 2 ? this.step2Active : this.step2Completed;
    step3 = ()=> (
        <Step completed={this.state.stepStatus > 2}
            title= 'Confirmación de los datos'
        />
    );

    moveStepButton = ()=>{
        const {stepStatus, email, firstName, lastNameFirst, lastNameSecond, phone, secondName,
        estafetaAccount, estafetaPassword, redpackAccount, redpackPassword} = this.state;

        const result = ()=>{
            switch(stepStatus){
                case 0:
                    return !validator.validate(email)|| isNullOrEmpty(firstName) || isNullOrEmpty(secondName) || isNullOrEmpty(lastNameFirst) || isNullOrEmpty(lastNameSecond) || isNullOrEmpty(phone);
                case 1:
                    return (isNullOrEmpty(estafetaAccount) || isNullOrEmpty(estafetaPassword)) & (isNullOrEmpty(redpackAccount) || isNullOrEmpty(redpackPassword));
                default: 
                    return false;
            }
        }
        if(this.state.stepStatus < 2){
            return (
                <Button disabled={result()} basic size='medium' color='grey' animated='fade' onClick={this.moveStep}>
                    <Button.Content visible>Continuar</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            );
        }
    } 

    confirmButton = ()=>{
        if(this.state.stepStatus === 2){
            return (
                <Button basic size='medium' color='grey' animated='fade' onClick={this.saveCostumerData}>
                    <Button.Content visible>Confirmar</Button.Content>
                    <Button.Content hidden>
                        <Icon name='save outline' />
                    </Button.Content>
                </Button>
            );
        }
    } 

    goBackButton = ()=>{
        if(this.state.stepStatus > 0 && this.state.stepStatus < 3){
            return (
                <Button basic size='medium' color='grey' animated='fade' onClick={this.backStep}>
                    <Button.Content visible>Regresar</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow left' />
                    </Button.Content>
                </Button>
            );
        }
    } 

    loadingWhileSaving = ()=> {
        if(this.state.loading){
            return (
                <Loader size='massive'>Loading</Loader>
            );
        }
    }
    
    render() {
        return (
             <Fragment>
                <AddCostumerStepBar step1={true} step2={true}/>
                <Form>
                    {this.currentForm()}
                    <FormGroup inline>
                        {this.goBackButton()}
                        {this.confirmButton()}
                        {this.moveStepButton()}
                    </FormGroup>
                </Form>
             </Fragment>
        );
    }
} 

export default withRouter(AddCostumerView);