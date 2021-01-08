import React, {Component } from "react";
import { Search, Icon, Container, Button, Divider, ButtonContent, ListItem, ListContent, Image, List} from 'semantic-ui-react';
import { gql,  getApolloContext, InMemoryCache, ApolloClient} from '@apollo/client';
import isNullOrEmpty  from 'check-null-or-empty';
import { withRouter } from "react-router-dom";

const GET_ALL_COSTUMERS = gql`
  {
    costumers{
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

const GET_COSTUMERS_OPTIONS = gql`
    query($fullName: String){
        costumersSearch(fullName: $fullName){
            id
            firstName
            middleName
            lastName
            secondLastName
            fullName
        }
    }
`;

class CostumerSearchResults extends Component {

    static contextType = getApolloContext();

    state = {
        results: []
    }

    componentDidMount = () => {
        const {results, value} = this.props.history.location.state;
        const client = new ApolloClient({
            uri: 'http://localhost:5000/graphql',
            cache: new InMemoryCache()
        });

        if(isNullOrEmpty(value)){
            client.query({
                query: GET_ALL_COSTUMERS
            }).then(res => {
                this.setState({results: res.data.costumers});
                console.log(this.state.results);
            });
        }else{
            client.query({
                query: GET_COSTUMERS_OPTIONS,
                variables: {
                    fullName: value
                }
            }).then(res => {
                this.setState({results: res.data.costumersSearch});
                console.log(this.state.results);
            });
        }
        
    }

    selectCostumer = (id) => {
        console.log(id);
        this.props.history.push({pathname: '/costumer', state: {id}});
    }

    costumerListSearch = ()=>{
        return this.state.results.map(item =>{
          return (
            <ListItem key={item.id} onClick={()=>this.selectCostumer(item.id)}>
                <Image avatar src="https://censur.es/wp-content/uploads/2019/03/default-avatar.png"/>
                <ListContent>
                    <List.Header>{item.fullName}</List.Header>
                </ListContent>
            </ListItem>
          );
      });
      }

    render = ()=> (
        <List selection  animated divided verticalAlign='middle'>
            {this.costumerListSearch()}
        </List>
    );
}

export default withRouter(CostumerSearchResults);