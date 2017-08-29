import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = { pwd_strength: 0,
                    pwd: ''};

    this.handleChange = this.handleChange.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  handleChange(event){

    this.setState({pwd: event.target.value});

    fetch(`http://localhost:8080/passwords/measure/${event.target.value ? event.target.value : 'vazio'}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(pass => this.setState({pwd_strength: pass.strength}))
    .catch(err => console.log('Connection lost!'));

  }

  changeColor(){
    let x = this.state.pwd_strength;
    switch(true){
      case x<20:
      return '#e82e00';
      case x<40:
      return '#e86800';
      case x<60:
      return '#ffaa00';
      case x<80:
      return '#e9ff00';
      case x<101:
      return '#65ff00';
    }
  }
  render() {

    let color = this.changeColor();
    console.log(color);
    return (
      <div className='container row'>
        <div className="form-group campos">
          <label htmlFor="inputPassword3" 
          className="col-xs-2 col-sm-2 control-label">
              <h4>Senha</h4>
          </label>
          <div className="col-xs-10 col-sm-10">
              <input type="password"
              name='senha'
              value={this.state.pwd}
              onChange={this.handleChange}
              className="form-control" 
              id="inputPassword3" 
              placeholder="Password"/>
          </div>
        </div>
        <div className='saida'>
          <div className='col-xs-6 col-sm-6'>
            <h3>
              Pwd Strength: 
            </h3>
          </div>
          <div className='col-xs-6 col-sm-6 str' style={{backgroundColor: color}}>
            <h3>
              {this.state.pwd_strength}%
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
