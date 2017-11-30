// @flow

/*global FB*/

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//Componentes Material-UI
import RaisedButton from 'material-ui/RaisedButton';

//Icono de Material Design Icon
import FacebookIcon from 'mdi-material-ui/Facebook';

class LoginButton extends Component {

  _handleFBlogin = () => {
    FB.login(response => {
      this._facebookCallback(response)
    }, {scope: 'public_profile,email'})
  }

  _facebookCallback = async facebookResponse => {
    if (facebookResponse.status === 'connected') {
      console.log(facebookResponse)            
      const facebookToken = facebookResponse.authResponse.accessToken;
      const graphcoolResponse = await this.props.authenticateUserMutation({variables: { facebookToken }});
      const graphcoolToken = graphcoolResponse.data.authenticateUser.token;
      localStorage.setItem('graphcoolToken', graphcoolToken);
      window.location.reload();
    } else {
      console.warn(`User did not authorize the Facebook application.`);
    }
  }

  render() {
    return (
      <RaisedButton
        target="_blank"
        label="Continuar con Facebook"
        onClick={this._handleFBlogin}
        backgroundColor='#4267B2'
        labelColor='#FFFFFF'
        icon={<FacebookIcon/>}
      />
    )
  }
}

const AUTHENTICATE_FACEBOOK_USER = gql`
mutation AuthenticateUserMutation($facebookToken: String!) {
  authenticateUser(facebookToken: $facebookToken) {
    token
  }
}
`
export default  graphql(AUTHENTICATE_FACEBOOK_USER, { name: 'authenticateUserMutation' })(LoginButton)

