import React, {Component, Fragment} from "react";
import { Form, List, Input, Button} from 'semantic-ui-react';
import { gql,  getApolloContext, InMemoryCache, ApolloClient} from '@apollo/client';

const GET_ALL_PERMISSIONS = gql`
    {
        permissions{
            id
            name
        }
    }
`;

const ADD_ONE_PERMISSION = gql`
    mutation($name: String!){
        addPermission(name:$name){
            id
            name
        }
    }
`;

export default class Permission extends Component{

    state = {
        permissions: [],
        permissionName: ''
    }

    static contextType = getApolloContext();

    componentDidMount = ()=> this.fetchPermissions();
    

    fetchPermissions = ()=>{
        //const { client } = this.context;
        const client = new ApolloClient({
            uri: 'http://localhost:5000/graphql',
            cache: new InMemoryCache()
          });

        client.query({ query: GET_ALL_PERMISSIONS })
        .then(response => {
            console.log(response);
            const {permissions} = response.data;
            this.setState({permissions, permissionName: ''});
        });
    }

    addNewPermission = ()=> {
        const {client} = this.context;
        client.mutate({
            mutation: ADD_ONE_PERMISSION,
            variables:{
                name: this.state.permissionName
            }
        }).then(response => console.log(response));
        this.fetchPermissions();
        
    }

    showPermissions = ()=>{
        const {permissions} = this.state;
        return (
            permissions.map(permission => (
                <List.Item key={permission.id}>
                    <List.Content>
                        <List.Header>{permission.name}</List.Header>
                    </List.Content>
                </List.Item>
                ))
        );
    }

    handlePermissionName = e => this.setState({permissionName: e.target.value});

    render = ()=> {
        return (
            <Fragment>
                <Form>
                    <Form.Field inline>
                        <Input placeholder='Permiso' onChange={this.handlePermissionName}/>
                        <Button content='Agregar' onClick={this.addNewPermission}/>
                    </Form.Field>
                </Form>
                <List selection verticalAlign='middle'>
                    {this.showPermissions()}
                </List>
            </Fragment>
        );
    }
}