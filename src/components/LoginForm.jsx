import React, {Component} from 'react';
import { gql,  getApolloContext} from '@apollo/client';
import { Button, Form, Grid, Header, Icon} from 'semantic-ui-react';
import validator from 'email-validator';
import passwordValidator from "password-validator";
//import Cookies from 'js-cookie';
import jwt from "jsonwebtoken";
//import createFile  from 'create-file';
//import write from 'write';
//import electron from 'electron';
import store from "store";


//import electron, {Session} from "electron";

//const {Cookies} = remote;

sessionStorage.setItem('session', {user:'', exp: 0, loged: false});



const passwordValidatorSchema = new passwordValidator();

passwordValidatorSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);

const LOGIN = gql`
    query($email:String!, $password:String!){
        login(email: $email, password: $password){
            token
        }
    }
    
`;

export default class LoginForm extends Component{

    static contextType = getApolloContext();

    handleEmail = e => this.setState({email: e.target.value});
    handlePassword = e => this.setState({password: e.target.value});

    emailOk = ()=> (
        <Form.Input
            fluid 
            icon='user' 
            iconPosition='left' 
            placeholder='E-mail address'
            onChange={this.handleEmail}
        />
    );

    emailError = ()=> (
        <Form.Input
            fluid 
            icon='user' 
            iconPosition='left' 
            placeholder='E-mail address'
            onChange={this.handleEmail}
            error={{
                content: 'Correo no valido',
                pointing: 'below',
            }}
        />
    );

    passwordOk = ()=> (
        <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handlePassword}
        />
    );

    passwordError = ()=> (
        <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handlePassword}
            error={{
                content: 'Password inválido',
                pointing: 'below',
            }}
        />
    );

    state = {
        email: '',
        password: '',
        emailInput: this.emailOk(),
        passwordInput: this.passwordOk(),
        routesContext: this.props.routesContext ? this.props.routesContext : {}
    }

    clickLogin = async ()=>{
        const { client } = this.context;
        const {email, password} = this.state;

        if(validator.validate(email) && passwordValidatorSchema.validate(password)){

            client.query({ 
                query: LOGIN,
                variables: {
                    email: email,
                    password: password
                } 
            }).then(res =>{
                if(res.data.login){
                    try{
                        const tokenData = jwt.verify(res.data.login.token, 'secret'); 
                        if(tokenData){
                            store.set('session', tokenData);
                            this.state.routesContext.setState({loged: true});
                        }
                    }catch(error){
                        console.log(error.message);
                    }
                }
            });

        }
    }

    render() {

        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='grey' textAlign='center'>
                        Inicio de sesión
                    </Header>
                    <Form size='large'>
                        
                        {this.state.emailInput}
                        {this.state.passwordInput}
                
                        <Button basic fluid size='massive' animated='fade' onClick={this.clickLogin}>
                            <Button.Content visible>Login</Button.Content>
                            <Button.Content hidden>
                                <Icon name='key' />
                            </Button.Content>
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}
