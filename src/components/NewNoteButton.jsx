import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Componentes Material-UI
import IconButton from 'material-ui/IconButton';

//Icono Material Design Icon
import FilePlus from 'mdi-material-ui/FilePlus';

export default class NewNoteButton extends Component {
  render() {
    return (
        <Link to='/createNote'><IconButton tooltip='Nueva Nota'><FilePlus color='#6E6A54'/></IconButton></Link>
    )
  }
}
