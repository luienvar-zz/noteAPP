import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

//Componentes
import Loader from './Loader';
import Note from './Note';

//Componentes Material-UI
import {List} from 'material-ui/List';

class NoteList extends Component {
  
  render() {

    if (this.props.data.loading) {
      return (<Loader/>)
    }
    return (
      <List>
        {this.props.data.allNotes.map(note => (
          <Note key={note.id} note={note}/>
        ))}
      </List>
    )
  }
}

export const ALL_NOTES = gql`
query AllNotesQuery($id: ID) {
  allNotes(
      filter: {user:{id:$id}}        
      orderBy: updatedAt_DESC) {
    id
    title
    description
    updatedAt
    createdAt
  }
}`

export default graphql(ALL_NOTES,{
  options: (props) => ({
    variables: { 
      id : props.user.id 
    }
  })
})(NoteList);
