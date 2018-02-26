import React, { Component } from 'react';

import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="layout">

        <div id="main">
          <div className="header">
            <h2>E a faculdade?</h2>
            <h1>Quando voce se forma?</h1>
          </div>
          <div className="content" id="content">
              <div id="main">
                {this.props.children}
              </div>  
          </div>
        </div>
      </div>
    );
  }
}

export default App;