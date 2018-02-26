import React, { Component } from 'react';

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      classes: 0,
      semesterMean: 0,
      fail: 0,
    };
  }

  setSemesterMean(event) {
    this.setState({ semesterMean: event.target.value });
  }

  setClasses(event) {
    this.setState({ classes: event.target.value });
  }

  setFail(event) {
    this.setState({ fail: event.target.value });
  }

  sendForm(event) {
    event.preventDefault();

    this.setState({
      year: this.calculateYear()
    });
  }

  calculateYear() {
    const classesBySemester = this.state.classes / this.state.semesterMean;
    const timeToGratuate = classesBySemester * (this.state.fail / 100 + 1);
    const today = new Date();
    const semesters = timeToGratuate * 6;
    today.setMonth(today.getMonth() + semesters);
    return today.getFullYear();
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form
          className="pure-form-aligned"
          onSubmit={this.sendForm.bind(this)}
          method="post"
        >
          <div className="pure-control-group">
            <br />
            <br />
            <label htmlFor="classes">Matérias faltando</label>
            <input
              id="classes"
              min="0"
              max="100"
              type="number"
              name="classes"
              onChange={this.setClasses.bind(this)}
              value={this.state.classes}
            />
          </div>
          <div className="pure-control-group">
            <label htmlFor="semesterMean">
              Numero médio de matérias por semestre
            </label>
            <input
              id="semesterMean"
              min="0"
              max="30"
              type="number"
              name="semesterMean"
              onChange={this.setSemesterMean.bind(this)}
              value={this.state.semesterMean}
            />
          </div>
          <div className="pure-control-group">
            <label htmlFor="fail">
              Chance média de reprovação p/ matéria(0%~100%)
            </label>
            <input
              id="fail"
              min="0"
              max="100"
              type="number"
              name="fail"
              onChange={this.setfail.bind(this)}
              value={this.state.fail}
            />
          </div>
          <div className="pure-control-group">
            <label />
            <button type="submit" className="pure-button pure-button-primary">
              Enviar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
