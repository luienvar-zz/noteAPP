// @flow

import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { ALL_NOTES } from './NoteList'

//Componentes
import LogoutButton from './LogoutButton';
import HomeButton from './HomeButton';
import Loader from './Loader';
import Footer from './Footer';

//Componentes Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {Toolbar,ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  toolbar : {
    backgroundColor: '#F1E8B8',
  },
  title : {
    fontWeight: 'bold',  
    margin: 10,
    color:'#6E6A54',
  },
  paper : {
    margin: 20,
  },
  paperTitle : {
    backgroundColor: '#4AC435',
  },
  textfield : {
    margin: 20,
  }
};

class CreateNote extends Component {

  state = {
    description: '',
    title: '',
  }; 

  _isLoggedIn = () => {
    const loggedInUser = this.props.data.loggedInUser;
    if (!loggedInUser) {
      console.warn('Only logged in users can create new posts');
      window.location.href ='/';
      window.location.reload();
      this.props.history.push('/');
      return false;
    }
    return true;
  }

  _handleNote = async () => {
    
    const loggedInUser = this.props.data.loggedInUser;
    if (!loggedInUser) {
      console.warn('Only logged in users can create new posts');
      this.props.history.push('/');
      return;
    }
  
    const { description, title } = this.state;
    const authorId = loggedInUser.id;

    await this.props.CreateNoteMutation({
      variables: { description, title, authorId},
      update: (store, {data: { createNote}}) => {
        const data = store.readQuery({ query: ALL_NOTES})
        data.allNotes.splice(0,0,createNote)
        store.writeQuery({
          query: ALL_NOTES,
          data
        })
      }
    });
    this.props.history.push('/');
  }
      
  renderCreateNote(){
    return (
      <MuiThemeProvider>
        <div>
        <Toolbar style={style.toolbar}>
          <ToolbarGroup>
            <Avatar src={this.props.data.loggedInUser.picture} alt='profile pic'/>
            <ToolbarTitle text={this.props.data.loggedInUser.name} style={style.title}/>
          </ToolbarGroup>
          <ToolbarGroup>
            <HomeButton/>
            <LogoutButton/>
          </ToolbarGroup>
        </Toolbar>
        <Paper style={style.paper} zDepth={4}>
          <Toolbar style={style.paperTitle}>
              <ToolbarTitle text='Nueva Nota' style={{color:'#FFFFFF'}}/>
          </Toolbar>
          <Divider />
          <div style={style.textfield}>
          <TextField
              fullWidth={true}
              underlineFocusStyle={{borderColor:'#EA6A2A'}}
              floatingLabelText='Titulo de Nota'
              floatingLabelStyle={{color:'#EA6A2A'}}
              floatingLabelFocusStyle={{color:'#EA6A2A'}}
              value={this.state.title}
              onChange={(e) => this.setState({title: e.target.value})}
          />
          <Divider />
          <TextField
              fullWidth={true}  
              underlineFocusStyle={{borderColor:'#EA6A2A'}} 
              multiLine={true} 
              rows={5}
              floatingLabelText='Que deseas anotar?'
              floatingLabelStyle={{color:'#EA6A2A'}}
              floatingLabelFocusStyle={{color:'#EA6A2A'}}
              value={this.state.description} 
              onChange={(e) => this.setState({description: e.target.value})}
          />
          </div>        
          <RaisedButton 
              backgroundColor='#FFD83F' 
              disabledBackgroundColor='#FF6666' 
              labelColor='#FFFFFF' 
              disabledLabelColor='#FFFFFF' 
              label="Guardar Nota" 
              fullWidth={true} 
              onClick={this._handleNote} 
              disabled={!this.state.title || !this.state.description}
          />
        </Paper>
        <Footer/>
        </div>
      </MuiThemeProvider>
    )
  }

  render() {

    if (this.props.data.loading) {
      return (<Loader/>)
    }
    if (this._isLoggedIn())
    {
      return this.renderCreateNote()
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

const CREATE_NOTE = gql`
mutation CreateNote ($description: String!, $title: String!, $authorId: ID!) {
  createNote(description: $description, title: $title, userId: $authorId) {
    id
    title
    description
  }
}
`

export default compose(
  graphql(LOGGED_IN_USER, {fetchPolicy: 'network-only'}),
  graphql(CREATE_NOTE,{name: 'CreateNoteMutation'}),
)(withRouter(CreateNote));
