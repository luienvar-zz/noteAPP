// @flow

/*global FB*/

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//Componentes
import NoteList from './NoteList';
import Header from './Header';
import Loader from './Loader';
import Login from './Login';
import Footer from './Footer';

//Theme default de material
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  _isLoggedIn = () => {
    return this.props.data.loggedInUser && this.props.data.loggedInUser.id !== '';
  }

  renderLoggedIn() {
    return (
      <MuiThemeProvider>
        <div>
          <Header user={this.props.data.loggedInUser}/>
          <NoteList />
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }

  renderLoggedOut() {
    return (
      <MuiThemeProvider>
        <Login/>
      </MuiThemeProvider>
    )
  }

  render () {
    if (this.props.data.loading) {
      return (<Loader/>)
    }
  
    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
    
  }
}

const LOGGED_IN_USER = gql`
query LoggedInUser {
  loggedInUser {
    id
    email
    name
    picture
  }
}
`

export default graphql(LOGGED_IN_USER, { options: { fetchPolicy: 'network-only'}})(App)