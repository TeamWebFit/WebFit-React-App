import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'; //optional import
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//Apollo
import { ApolloProvider, createNetworkInterface } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants/constants'

// Cookies
import {CookiesProvider} from 'react-cookie';

const httpLink = createHttpLink({
  uri: 'https://server.webfit.app/graphql'
})


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <CookiesProvider>
        <App />
    </CookiesProvider>
  </ApolloProvider>,
  document.getElementById('root'));
registerServiceWorker();
