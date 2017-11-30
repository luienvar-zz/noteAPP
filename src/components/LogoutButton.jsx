// @flow

import React, { Component } from 'react';

//Componentes Material-UI
import IconButton from 'material-ui/IconButton';

//Icono Material Design Icon
import PowerSettings from 'mdi-material-ui/PowerSettings';

export default class LogoutButton extends Component {
 
  _logout = () => {
    localStorage.removeItem('graphcoolToken');
    window.location.href ='/';
    window.location.reload();
  }

  render() {
    return (
        <IconButton tooltip='Salir' onClick={this._logout}>
          <PowerSettings color='#6E6A54'/>
        </IconButton>
    )
  }
}
