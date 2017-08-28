import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = { pwd_strength: 'Very Weak',
                    pwd: ''};

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    return (
      <div className='container row'>
        <div className="form-group">
          <label htmlFor="inputPassword3" 
          className="col-xs-2 col-sm-2 control-label">
              Senha
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
        <div className='col-sm-12'>
          <h3>
            {this.state.pwd_strength}
          </h3>
        </div>
      </div>
    );
  }
}

export default App;
