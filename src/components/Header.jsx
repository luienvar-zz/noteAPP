import React, { Component } from 'react';

//Componentes
import LogoutButton from './LogoutButton';
import NewNoteButton from './NewNoteButton';

//Componentes Material-UI
import Avatar from 'material-ui/Avatar';
import {Toolbar,ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';

const style = {
  toolbar : {
    backgroundColor: '#F1E8B8',
  },
  title : {
    fontWeight: 'bold',  
    margin: 10,
    color: '#6E6A54',
  }

}

export default class Header extends Component {

  render() {
    return (
      <Toolbar style={style.toolbar}>
          <ToolbarGroup>
            <Avatar src={this.props.user.picture} alt='profile pic'/>
            <ToolbarTitle text={this.props.user.name} style={style.title}/>
          </ToolbarGroup>
          <ToolbarGroup>
            <NewNoteButton/>
            <LogoutButton/>
          </ToolbarGroup>
      </Toolbar>
    )
  }
}
