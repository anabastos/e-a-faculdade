import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import CustomInput from './components/customInput';
import Answer from './Answer';


class App extends Component {
  constructor() {
    super()
    
    this.state = {
      classes: 0,
      semesterMean: 0,
      repetition: 0,
      year: '',
      wiki: []
    }
  }

  sendForm(event){
    event.preventDefault();
    const semesters = ( this.state.classes / this.state.semesterMean ) * ( this.state.repetition / 100 + 1)
    const today = new Date();
    today.setMonth(today.getMonth() + semesters * 6)
    this.getYearData(today.getFullYear())
    this.setState({year : today.getFullYear()})
  }

  setSemesterMean(event){
    this.setState({semesterMean : event.target.value});
  }

  setClasses(event){
    this.setState({classes : event.target.value});
  }

  setRepetition(event){
    this.setState({repetition : event.target.value});
  }

  getYearData(year) {
    var myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '*');

    const options = {
      method: 'GET',
      mode: 'cors',
      headers: myHeaders
    }

    fetch(`https://pt.wikipedia.org/w/api.php?action=query&titles=${year}&prop=revisions&rvprop=content&format=json`,
    options)
    .then(response => {
      if (response.status !== 200) {
        console.error('Status Code: ' + response.status);
        return;
      }
      response.json()
        .then(data => {
          const content = Object.values(data.query.pages)[0].revisions[0]['*'].split("==")[2].replace(/[\[\]&]+/g, '').replace('mdash', '-').split('* ').slice(1)
          this.setState(Object.assign(this.state, {wiki: content}))
          console.log(this.state)
        })
    }).catch(err => console.error('Fetch error: ', err))
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="main">
          <div className="header">
            <h2>E a faculdade?</h2>
            <h1>Quando voce se forma?</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form-aligned" onSubmit={this.sendForm.bind(this)} method="post">
                <div className="pure-control-group">
                  <label htmlFor="classes">Matérias faltando</label>
                  <input id="classes" min="0" max="100" type="number" name="classes" onChange={this.setClasses.bind(this)} value={this.state.classes} />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="semesterMean">Numero médio de matérias por semestre</label>
                  <input id="semesterMean" min="0" max="20" type="number" name="semesterMean" onChange={this.setSemesterMean.bind(this)} value={this.state.semesterMean} />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="repetition">Chance média de reprovação p/ matéria</label>
                  <input id="repetition" min="0" max="100" type="number" name="repetition" onChange={this.setRepetition.bind(this)} value={this.state.repetition}/>
                </div>
                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Enviar</button>
                </div>
              </form>

            </div>
            <Answer year={this.state.year} wiki={this.state.wiki} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
