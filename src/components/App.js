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

const FB_API_ID = 'v2.11';
const FB_APP_ID = '145592762756569';

class App extends Component {

  componentDidMount() {
    this._InitializefbSDK();
  }

  _InitializefbSDK = () => {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : FB_APP_ID,
        cookie     : true,
        version    : FB_API_ID
      });
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

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