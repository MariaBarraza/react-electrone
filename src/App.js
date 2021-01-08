import './App.css';
import React, {Component} from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

import Routes from "./components/Routes";

import MainMenu from './components/MainMenu';

//global.session = false;

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    }
  }
});

export  default class App extends Component{

  render() {
    return (
      <ApolloProvider client={client}>
        <Routes>
          <MainMenu/>
        </Routes>
      </ApolloProvider>
    );
  }
}