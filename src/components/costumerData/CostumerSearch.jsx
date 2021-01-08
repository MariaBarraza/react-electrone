import React, {Component } from "react";
import { Search, Icon, Container, Button, Divider, ButtonContent, ListItem, ListContent, Image, List} from 'semantic-ui-react';
import { gql,  getApolloContext, InMemoryCache, ApolloClient} from '@apollo/client';
import { withRouter } from "react-router-dom";

const GET_COSTUMERS_OPTIONS = gql`
          query($fullName: String){
            costumersSearch(fullName: $fullName){
              id
              firstName
              middleName
              lastName
              secondLastName,
              fullName
            }
          }
        `;

class CostumerSearch extends Component {

    state = {
        results: [],
        value: '',
        list: this.props.list ? this.props.list : '',
        costumers: []
    }
    
    static contextType = getApolloContext();

    catchName = (e, { value }) => {

        this.setState({value: value});
        console.log(this.state.value);
    
        const client = new ApolloClient({
          uri: 'http://localhost:5000/graphql',
          cache: new InMemoryCache()
        });
        

        client.query({ query: GET_COSTUMERS_OPTIONS , variables: {
          fullName: value
        }}).then(res => {
          //console.log(res.data.costumersSearch);
          this.setState({results: res.data.costumersSearch.map(costumer => {
            const {fullName, id} = costumer;
            return ({title: fullName, id: id});
          })})
        });
      }

      handleResultSelect = (e, data)=> {
        console.log(data.result.id);
        this.props.history.push({pathname: '/costumer', state: {id: data.result.id}});
      }

      clickSearch = ()=>{

        const {results, value} = this.state;
        this.props.history.push({pathname: '/costumersResults', state: {results, value}});
      }
    

    render = ()=> (
        <Container textAlign='center'>
            <div style={{paddingTop: window.innerHeight / 4 }}>
            <Search
            fluid
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.catchName}
            results={this.state.results}
            //value={value}
            size='massive'
            placeholder='nombre...'
            />
            <Divider hidden/>
            <Button basic size='large' color='grey' animated='fade' onClick={this.clickSearch}>
                <ButtonContent visible>Buscar clientes</ButtonContent>
                <Button.Content hidden>
                <Icon name='table'/>
                </Button.Content>
            </Button>
            </div>
        </Container>
    );
}

export default withRouter(CostumerSearch);