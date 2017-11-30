import React, { Component } from 'react';
import '../styles/login.css';

//Componentes
import LoginButton from './LoginButton';
import Logo from './Logo';

export default class Login extends Component {
  render() {
    return (
      <div className="image-wrapper">
        <div className="flex-item">
          <Logo/>
        </div>
        <div className="flex-item2">
          <h1 style={{color:'#FFFFFF',fontSize: '2em',textShadow: '2px 2px #07131F'}}>
            Ingresa y crea nuevas notas!
          </h1>
          <LoginButton/>
        </div>
      </div>
    )
    
  }
}
