import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    wishlist: [
      {
        id: "0",
        name: "madewell sweater",
        link: "optional",
        size: "small",
        notes: "please!",
      },
    ]
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <table>
          <thead>
            <tr>
              <th>Thing</th>
              <th>Size</th>
              <th>Notes:</th>
            </tr>
          </thead>
          <tbody>
            {this.state.wishlist.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
