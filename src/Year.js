import React, {Component} from 'react';

export default class Year extends Component {
    render() {
      return (
          <div>
            <h3>{this.props.year}</h3>
            <h2>Provavelmente em {this.props.year}</h2>
  
            <h4>Em {this.year}...</h4>
            <ul>
                {this.state.wiki.map((acontecimento, i) => <li className={"row"} key={i}>{acontecimento}</li>)}
            </ul>
          </div>)
    }
}