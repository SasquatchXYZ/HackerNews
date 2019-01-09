import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {

    const user = {
      name: 'Dalton',
      emotion: 'Enjoy!'
    };

    const welcomeMessage = `Welcome ${user.name} to the Road to Learn React ${user.emotion}`;

    return (
      <div className="App">
        <h2>{ welcomeMessage }</h2>
      </div>
    );
  }
}

export default App;
