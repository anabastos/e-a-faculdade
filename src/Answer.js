import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import {
  FacebookButton,
  FacebookCount,
  TwitterButton,
  TwitterCount,
} from 'react-social';
import FormErrorHandler from './FormErrorHandler';
import List from './List';

export default class Answer extends Component {
  constructor() {
    super();
    this.state = {
      wiki: [],
      year: '',
    };
  }

  componentWillMount() {
    this.getYearData('2018');
  }

  getYearData(year) {
    const headers = new Headers();
    return fetch(
      `https://pt.wikipedia.org/w/api.php?action=query&titles=${year}&prop=revisions&rvprop=content&format=json`,
      { method: 'GET', headers: headers, mode: 'cors' }
    )
      .then((response) => {
        if (response.status !== 200) {
          console.error(`Status Code: ${response.status}`);
        }
        if (response.status === 400) {
          new FormErrorHandler().showErrors(response.responseJSON);
        }

        return response.json().then(data =>
          this.setState((prevState) => {
            return {
              ...prevState,
              wiki: this.listResponseData(data),
              year,
            };
          })
        );
      })
      .catch(err => console.error('Fetch error: ', err));
  }

  listResponseData(data) {
    return Object.values(data.query.pages)[0]
      .revisions[0]['*'].split('==')[2]
      .replace(/[[\]&]+/g, '')
      .replace('mdash', '-')
      .split('* ')
      .slice(1);
  }

  render() {
    const url = 'https://anabastos.github.io';
    const appId = '123';
    return (
      <div>
        <h3>{this.state.year}</h3>
        <h2>Provavelmente em {this.state.year}</h2>

        <h4>Em {this.state.year}...</h4>
        <List wiki={this.state.wiki} />

        <Link to="/">Refazer teste!</Link>

        <FacebookButton url={url} appId={appId}>
          <FacebookCount url={url} /> {' Share ' + url}
        </FacebookButton>

        <TwitterButton url={url} appId={appId}>
          <TwitterCount url={url} /> {' Share ' + url}
        </TwitterButton>
      </div>
    );
  }
}
