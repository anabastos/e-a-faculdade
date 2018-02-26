import React, { Component } from 'react';
export default class customInput extends Component{

    render() {
        return(
          <div className="pure-control-group">
            <label htmlFor="{this.props.id}">{this.props.label}</label>
            <input id={this.props.id} type={this.props.type} name="nome" value={this.props.id} onChange={this.setNome}/>
          </div>
        )
    }

}
