import React, { Component } from 'react';

export default class Answer extends Component {
    render() {
        return(
            <div>
            <h2>Voce se forma em {this.props.year}</h2>
              <h4>Em {this.props.year}...</h4>
              <ul>
              {this.props.wiki.map(acontecimento => {
                      return (<li>{acontecimento}</li>)})
              }
              </ul>
            </div>
      );
    }
}