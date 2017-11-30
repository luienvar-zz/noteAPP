// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

//Componentes
import App from './components/App';
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';


const httpLink = new createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cjaenns632k920104c5ywy6pb' });

const middlewareLink = setContext(() => ({
  headers: { 
    authorization: `Bearer ${localStorage.getItem('graphcoolToken')}` || null,
  }
}));

// use with apollo-client
const hlink = middlewareLink.concat(httpLink);
const client = new ApolloClient({
	link: hlink,
	cache: new InMemoryCache()
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={App} />
				<Route exact path='/createNote' component={CreateNote} />
				<Route exact path='/updateNote' component={UpdateNote} />
			</Switch>
		</BrowserRouter>
	</ApolloProvider>
	, document.getElementById('root')
);
registerServiceWorker();
