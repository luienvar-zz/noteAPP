import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

//Componentes Material-UI
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const style = {
  toolbar : {
    backgroundColor: '#F1E8B8',
  },
  title : {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  paper : {
    margin: 20,
  },
  paperTitle : {
    backgroundColor: '#4AC435',
  },
  textfield : {
    margin: 20,
  },
  subheader: {
    display: 'flex',
    justifyContent: 'space-around',
    fontStyle: 'italic',
  }
};

class Note extends Component {

  _deleteNote = async () => { 
    const id = this.props.note.id;
    await this.props.DeleteNoteMutation({variables: {id}});
    window.location.reload();
  }

  render() {
    const dateCreado = new Date(this.props.note.createdAt);
    const separarDesdeC = dateCreado.toString().indexOf("G");
    const localDateCreado = dateCreado.toString().slice(0, separarDesdeC);
    const dateUpdate = new Date(this.props.note.updatedAt);
    const separarDesdeU = dateUpdate.toString().indexOf("G");    
    const localDateUpdate = dateUpdate.toString().slice(0, separarDesdeU);
    return (
      <Paper style={style.paper} zDepth={4}>
      <Toolbar style={style.paperTitle}>
          <ToolbarTitle text={this.props.note.title} style={style.title}/>
          <ToolbarGroup>
            <Link to= {{
              pathname: '/updateNote', 
              state : { note: this.props.note
            }}}>
              <IconButton tooltip="Editar Nota">
                <FontIcon className='material-icons' color='#FFFFFF' hoverColor='#05668D'>border_color</FontIcon>
              </IconButton>
            </Link>
            <IconButton tooltip="Eliminar Nota" onClick={this._deleteNote}>
              <FontIcon className='material-icons' color='#FFFFFF' hoverColor='#CE0000'>delete_sweep</FontIcon>
            </IconButton>
          </ToolbarGroup>
      </Toolbar>
      <Subheader style={style.subheader}>
        <div>Modificado el {localDateUpdate}</div>
        <div>Creado el {localDateCreado}</div>
      </Subheader>
      <Divider/>
      <div style={style.textfield}>
        {this.props.note.description}
      </div>   
      <Divider/>     
      </Paper>
    )
  }
}

const DELETE_NOTE = gql`
mutation DeleteNote ($id: ID!) {
  deleteNote(id: $id) {
    id
    title
  }
}
`

export default graphql(DELETE_NOTE,{name: 'DeleteNoteMutation'})(Note);
