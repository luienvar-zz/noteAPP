import React, { Component } from 'react';

//Componentes
import footerLogo from '../pineappleFooter.png';

export default class Footer extends Component {
  render() {
    return (
        <footer>
          <div align='center'>
            <img src={footerLogo} alt=''/>
          </div>
        </footer>
      )
  }
}
