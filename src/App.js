import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

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
        {list.map(item =>
            <div key={item.objectID}>
              <span>
                <a href={ item.url }>{ item.title }</a>
              </span>
              <span>{ item.author }</span>
              <span>{ item.num_comments }</span>
              <span>{ item.points }</span>
            </div>
        )}
      </div>
    );
  }
}

export default App;
