import React, {Component, Fragment} from "react";
import { Button, Icon, Divider, ButtonContent, FormGroup, Form, Dimmer, Loader} from "semantic-ui-react";
import logorp from "../../../logorp.png";
import logoest from "../../../logoest.png";
import isNullOrEmpty  from 'check-null-or-empty';
import { withRouter } from "react-router-dom";
import CostumerFormInfo from "../CostumerFormInfo";
import CostumerPackageCheck from "../CostumerPackageCheck";
import AddCostumerStepBar from "./AddCostumerStepsBar";
import { gql,  getApolloContext } from '@apollo/client';

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

class AddCostumerStep3 extends Component {

    static contextType = getApolloContext();

    state = {
        //costumerContext: this.props.costumerContext ? this.props.costumerContext : {},
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
        loading: true
    }

    componentDidMount = async => {
        //console.log(this.props.location);
        //this.props.history.location.state.then(res => console.log(res));

        const {packageInfo, basicInfo } = this.props.location.state;

        //console.log(packageInfo);

        this.setState({
            loading: false,
            firstName: basicInfo.firstName,
            secondName: basicInfo.secondName,
            lastNameFirst: basicInfo.lastNameFirst,
            lastNameSecond: basicInfo.lastNameSecond,
            phone: basicInfo.phone,
            email: basicInfo.email,
            estafetaAccount: packageInfo.estafetaAccount,
            estafetaPassword: packageInfo.estafetaPassword,
            redpackAccount: packageInfo.redpackAccount,
            redpackPassword: packageInfo.redpackPassword
        });
    }

    checkAccounts = ()=>{
        let accounts = [];
        const {redpackAccount, redpackPassword, estafetaAccount, estafetaPassword} = this.state;
        if(!isNullOrEmpty(this.state.redpackAccount)){
            accounts.push(<CostumerPackageCheck logo={logorp} account={redpackAccount} password={redpackPassword}/>);
        }
        if(!isNullOrEmpty(this.state.estafetaAccount)){
            accounts.push(<CostumerPackageCheck logo={logoest} account={estafetaAccount} password={estafetaPassword}/>);
        }
        return accounts;
    };

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
            this.setState({loading: false});
            this.props.history.push('/');
        });
    }

    confirm = ()=> {
        this.setState({loading: true});
        this.addNewCostumer();
    }

    backStep = ()=>{

    }

    render = ()=>  {
        const {loading, firstName, secondName, lastNameFirst, lastNameSecond, email, phone} = this.state;
        if(loading){
            return (
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
            );
        }
        return (
            <Fragment>
                <AddCostumerStepBar step1={true} step2={true}/>
                <Form>
                    <CostumerFormInfo 
                    fullName={`${firstName} ${secondName} ${lastNameFirst} ${lastNameSecond}`}
                    email={email}
                    phone={phone}
                    packages={this.checkAccounts()}/>
                </Form>
                <Divider hidden/>
                <FormGroup inline>
                    <Button basic size='medium' color='grey' animated='fade' onClick={this.backStep}>
                            <ButtonContent visible>Regresar</ButtonContent>
                            <ButtonContent hidden>
                                <Icon name='arrow left' />
                            </ButtonContent>
                        </Button>
                    <Button basic size='medium' color='grey' animated='fade' onClick={this.confirm}>
                        <ButtonContent visible>Continuar</ButtonContent>
                        <ButtonContent hidden>
                            <Icon name='arrow right' />
                        </ButtonContent>
                    </Button>
                </FormGroup>
            </Fragment>
        );
    }
    
}

export default withRouter(AddCostumerStep3);
