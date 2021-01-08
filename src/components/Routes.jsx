import React, {Component, Fragment} from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Container, Button} from 'semantic-ui-react';
//import Cookies from "js-cookie";
import store from "store";



import CostumersView from './costumerData/CostumersView';
//import AddCostumersView from "./costumerData/AddCostumersView";
import CostumersListView from "./costumerData/CostumersListView";

import LoginForm from './LoginForm';
import Permissions from "./Permissions";
import CostumersSearchResults from './costumerData/CostumersSearchResults';
import CostumerInfo from './costumerData/CostumerInfo';
import AddCostumerStep1 from './costumerData/addCostumersSteps/AddCostumerStep1';
import AddCostumerStep2 from './costumerData/addCostumersSteps/AddCostumerStep2';
import AddCostumerStep3 from './costumerData/addCostumersSteps/AddCostumerStep3';

export default class Routes extends Component {

    state = {
        loged: false
    }

    logout = ()=>{
        //this.props.history.push('/');
        this.setState({loged: false});
        store.remove('session');
        console.log(store.get('session'));
    }

    usersPermission = ()=>{
        if(1 < 3){
            return <Route path="/users" component={Permissions}/>
        }
    }

    checkSession = session =>{
        console.log(session);

        if(session){
            return (
                <Fragment>
                    <Button size='small' floated='right' content='Cerrar sesión' basic style={{marginRight: '10px'}} onClick={this.logout}/>
                    {this.props.children}
                    <Container style={{width: '50%', marginTop: -80}}>
                        <Switch floated="left">
                            <Route path="/costumerslist" component={()=>(
                                <CostumersView startItem='Buscar clientes'>
                                    <CostumersListView/>
                                </CostumersView>
                            )}/>
                            <Route path="/costumersResults" component={()=>(
                                <CostumersView startItem='Buscar clientes'>
                                    <CostumersSearchResults/>
                                </CostumersView>
                            )}/>
                            <Route path="/costumer" component={()=>(
                                <CostumersView startItem='Buscar clientes'>
                                    <CostumerInfo/>
                                </CostumersView>
                            )}/>
                            <Route path="/addcostumer" component={()=>(
                                <CostumersView startItem='Registrar clientes'>
                                    <AddCostumerStep1/>
                                </CostumersView>
                            )}/>
                            <Route path="/addCostumerPackage" component={()=>(
                                <CostumersView startItem='Registrar clientes'>
                                    <AddCostumerStep2/>
                                </CostumersView>
                            )}/>
                            <Route path="/addCostumerConfirm" component={()=>(
                                <CostumersView startItem='Registrar clientes'>
                                    <AddCostumerStep3/>
                                </CostumersView>
                            )}/>
                             {/*Users */}
                            {this.usersPermission()}
                            <Route path="/" component={()=>(
                                <CostumersView startItem='Buscar clientes'>
                                    <CostumersListView/>
                                </CostumersView>
                            )}/>
                        </Switch>
                    </Container>
                </Fragment>
            );
        }else{
            return(
                <Container>
                    <Switch floated="left">
                        <Route path="/" component={()=> <LoginForm routesContext={this} />} />
                    </Switch>
                </Container>
            );
        }
    }

    render = ()=> {
        return (
            <BrowserRouter>
                {this.checkSession(store.get('session'))}
            </BrowserRouter>
        );
    }
}
