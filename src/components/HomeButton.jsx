// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Componentes Material-UI
import IconButton from 'material-ui/IconButton';

//Icono de Material Design Icon
import ReactIcon from 'mdi-material-ui/React';

export default class HomeButton extends Component {

  render() {
    return (
      <Link to='/'>
        <IconButton tooltip='Home'>
          <ReactIcon color='#6E6A54'/>
        </IconButton>
      </Link>
    )
  }
}