import React, { Component } from 'react';
import logo from '../assets/img/pineapple-logo.svg';

const style = {
  flex: {
      display: 'flex',
      justifyContent: 'center',
      color:'#FFFFFF',
      fontFamily:'Lobster, cursive',
      fontSize: '5em',
      textShadow: '2px 2px #07131F',
  },

}

export default class Logo extends Component {
  render() {
    return (
      <div style={style.flex}>
        <div className='flex-item'>
          <img src={logo} alt='PineApple' style={{width: "50%", height: "50%"}}/>
        </div>
        <div className='flex-item'>
            Pineapple
        </div>
      </div>
    )
  }
}
